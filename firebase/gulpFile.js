/* eslint angular/json-functions: 0, no-process-exit: 0 */
'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    config = require('./config'),
    Firebase = require('firebase'),
    fs = require('fs'),
    usersSeedData = JSON.parse(fs.readFileSync('./sample_data/users-test-data.json', 'utf8')),
    categoriesSeedData = JSON.parse(fs.readFileSync('./sample_data/categories-test-data.json', 'utf8')),
    itemsSeedData = JSON.parse(fs.readFileSync('./sample_data/items-test-data.json', 'utf8')),
    fbUrl = config.fbUrl,
    fbSecret = config.fbSecret,
    rootRef = new Firebase(fbUrl),
    userKeyMap = {},
    categoryKeyMap = {},
    unitTestPaths = [
      'test/**/*_test.js'
    ];

gulp.task('firebaseTest', ['seedData'], function () {
  return gulp.src(unitTestPaths, {read: false})
    .pipe($.mocha({reporter: 'spec', growl: true}));
});

gulp.task('login', function () {
  console.log(fbUrl);
  console.log(fbSecret);

  return rootRef.authWithCustomToken(fbSecret, function (error) {
    if (error) {
      console.log('Authentication error');
      process.exit(1);
    }
  });
});

gulp.task('resetUsers', ['login'], function (done) {
  var count = 0;
  usersSeedData.forEach(function (user) {
    console.log('Doing... ', user);
    rootRef.removeUser({
      email: user.email,
      password: 'Password1!'
    }, function (error) {
      if (error) {
        switch (error.code) {
          case 'INVALID_USER':
            console.log('The specified user account does not exist.');
            // This is OK, no need to call the done() callback with error
            break;
          case 'INVALID_PASSWORD':
            console.log('The specified user account password is incorrect.');
            done(error);
            break;
          default:
            console.log('Error removing user:', error);
            done(error);
        }
      } else {
        console.log('User account deleted successfully!');
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
  });
});

gulp.task('seedUsers', ['login', 'resetFirebase'], function (done) {
  var count = 0;

  usersSeedData.forEach(function (user) {
    rootRef.createUser({
      email: user.email,
      password: 'Password1!'
    }, function (error, userData) {
      if (error) {
        switch (error.code) {
          case 'EMAIL_TAKEN':
            console.log('The new user account cannot be created because the email is already in use.');
            break;
          case 'INVALID_EMAIL':
            console.log('The specified email is not a valid email.');
            break;
          default:
            console.log('Error creating user:', error);
        }
        done(error);
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
        user.uid = userData.uid;
      }

      rootRef.child('userProfiles').child(userData.uid).set({
        email: user.email,
        name: user.name,
        provider: 'password'
      }, function (profileError) {
        if (profileError) {
          console.log('Error saving user profile', profileError);
          done(error);
        }

        // Map the new key to the email for lookup later
        userKeyMap[user.email] = userData.uid;

        count += 1;
        if (count === usersSeedData.length) {
          done();
        }
      });
    });
  });
});

gulp.task('seedCategories', ['login', 'resetFirebase'], function (done) {
  var count = 0;

  categoriesSeedData.forEach(function (category) {
    var newRef = rootRef.child('categories').push({
      description: category.description,
      goalType: category.goalType,
      name: category.name,
      valueType: category.valueType
    });

    newRef.then(function (data) {
      console.log('New category with ID', data.key());

      // Map the category key to the name for lookup later
      categoryKeyMap[category.name] = data.key();

      count += 1;
      if (count === categoriesSeedData.length) {
        done();
      }
    }).catch(function (error) {
      console.log('Error creating category', error);
      done(error);
    });
  });
});

gulp.task('seedItems', ['login', 'seedUsers', 'seedCategories'], function (done) {
  var count = 0;
  itemsSeedData.forEach(function (item) {
    var uid = userKeyMap[item.user],
        categoryId = categoryKeyMap[item.category],
        valueNum = 0,
        newRef,
        newItem = {};

    // For duration items, convert hh:mm:ss to elapsed seconds
    if (item.valueTime) {
      valueNum = parseInt(item.valueTime.slice(0, 2), 10) * 60 +
            parseInt(item.valueTime.slice(-2), 10);
    } else {
      valueNum = item.valueNumber;
    }

    // Map the new item properties
    newItem.itemDateTime = item.itemDateTime;
    newItem.notes = item.notes ? item.notes : null;
    newItem.valueNumber = valueNum;

    // Write the new item, bail if there's an error
    newRef = rootRef.child('userItems').child(uid).child(categoryId).push(newItem);
    newRef.then(function (data) {
      console.log('created new item: ', data.key());
      count += 1;
      if (count === itemsSeedData.length) {
        console.log('Done with all items, total count:' + count);
        done();
      }
    }).catch(function (error) {
      console.log('Error creating item:', error);
      done(error);
    });
  });
});

gulp.task('logout', ['seedItems'], function () {
  var authData = rootRef.getAuth();
  if (authData) {
    console.log('logging off');
    rootRef.unauth();
  }
  console.log('all done');
});

gulp.task('seedData', ['seedItems', 'logout']);
