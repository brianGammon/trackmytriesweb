'use strict';
var Firebase = require('firebase'),
    fs = require('fs'),
    usersSeedData = JSON.parse(fs.readFileSync('./sample_data/users-test-data.json', 'utf8')),
    categoriesSeedData = JSON.parse(fs.readFileSync('./sample_data/categories-test-data.json', 'utf8')),
    itemsSeedData = JSON.parse(fs.readFileSync('./sample_data/items-test-data-small.json', 'utf8')),
    // async = require('async'),
    fbUrl = 'https://trackmytries.firebaseio.com/gulp',
    fbSecret = 'eCc2AHHb4tTXvVYM7ksAQaxWD6jUnyv9cBxNW1gE',
    rootRef = new Firebase(fbUrl),
    userKeyMap = {},
    categoryKeyMap = {};


module.exports = function (gulp, $, config) {
  gulp.task('login', function () {
    return rootRef.authWithCustomToken(fbSecret, function(error, authData) {
      if (error) {
        console.log('Authentication Failed!', error);
        process.exit(1);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        // rootRef.unauth();
        // done();
      }
    });
  });

  gulp.task('resetUsers', ['login'], function (done) {
    var count = 0;
    usersSeedData.forEach(function (user) {
      rootRef.removeUser({
        email: user.email,
        password: 'Password1!'
      }, function(error) {
        console.log('remove callback');

        if (error) {
          switch (error.code) {
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              break;
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              break;
            default:
              console.log("Error removing user:", error);
          }
        } else {
          console.log("User account deleted successfully!");
        }

        count += 1;
        if (count === usersSeedData.length) {
          done();
        }
      });
    });
  });

  gulp.task('resetFirebase', ['resetUsers'], function (done) {
    rootRef.set(null, function (err) {
      if (err) {
        console.log('Error resetting Firebase', err);
      }
      done();
    })
    // for each sample user
      // using async parellel process
      // look up users uid

      // remove any userItems with that UID

      // remove any userProfiles with that UID

      // call method to delete FB account using email address/UID

      // end series and loop around to next user

    // for each category in sample data
      // look up by name

      // remove node with uid
  });

  gulp.task('seedUsers', ['login', 'resetFirebase'], function (done) {
    var count = 0;
    usersSeedData.forEach(function (user) {
      rootRef.createUser({
        email: user.email,
        password: 'Password1!'
      }, function(error, userData) {
        console.log('create user callback');

        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          user.uid = userData.uid;
        }

        rootRef.child('userProfiles').child(userData.uid).set({
          email: user.email,
          name: user.name,
          provider: 'password'
        }, function (error) {
          if (error) {
            console.log('Error saving user profile', error);
          }

          count += 1;
          userKeyMap[user.email] = userData.uid;
          if (count === usersSeedData.length) {
            console.log(userKeyMap);
            done();
          }
        })        
      });
    });
  });

  gulp.task('seedCategories', ['login', 'resetFirebase'], function () {
    var count = 0;
    
    categoriesSeedData.forEach(function (category) {
      var newRef = rootRef.child('categories').push({
        description: category.description,
        goalType: category.goalType,
        name: category.name,
        valueType: category.valueType
      });
      categoryKeyMap[category.name] = newRef.key();
      console.log('New category with ID', newRef.key());
    });

    console.log(categoryKeyMap);
  });

  gulp.task('seedItems', ['login', 'seedUsers', 'seedCategories'], function (done) {
    var count = 0;
    itemsSeedData.forEach(function (item) {
      var uid = userKeyMap[item.user];
      var categoryId = categoryKeyMap[item.category];
      var valueNum;

      console.log('user id', uid);
          console.log('category', categoryId);

      if (item.valueTime) {
        valueNum = parseInt(item.valueTime.slice(0, 2), 10) * 60 +
              parseInt(item.valueTime.slice(-2), 10);
      } else {
        valueNum = item.valueNumber;
      }
      console.log('doing', item);
      var newRef = rootRef.child('userItems').child(uid).child(categoryId).push({
        itemDateTime: item.itemDateTime,
        notes: item.notes ? item.notes : null,
        valueNumber: valueNum
      }, function (error) {
        if (error) {
          console.log('user id', uid);
          console.log('category', categoryId);
          console.log(item);
          console.log('error saving item', error);
        }
      });

      console.log('created new item: ', newRef.key());
      count += 1;
      if (count === itemsSeedData.length) {
        console.log('done with all items, total count:' + count);
        done();
      }
    });
  });

  gulp.task('logout', ['seedItems'], function () {
    var authData = rootRef.getAuth();
    if (authData) {
      console.log('logging off');
      rootRef.unauth();
    }
    console.log('all done');
    process.exit(0);
  })

  gulp.task('seedData', ['seedItems', 'logout']);
};
