# TrackMyTries Web App

Web front end for the TrackMyTries API. Track your fitness progress by recording every "Try" of one of the PRT exercises (Sit ups, Push up, Pull ups, or 1.5 mile run).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities

Make sure your system has the following foundational software installed:

* NodeJS
* MongoDB, or a Mongolab instance
* TrackMyTries API access (default is localhost:8080)
* JDK (optional, for running e2e tests)

Next, globally install bower and gulp:
```
npm install -g gulp bower
```

### Installing

Clone the repo into your projects directory:

```
git clone https://brianGammon@bitbucket.org/brianGammon/prttrackerweb.git
cd prttrackerweb


```

Next, install the dependencies and launch:

```
npm install
gulp
```

The ```npm install``` command will automatically run bower install and gulp to compile the assets.

The default ```gulp``` task will build, lint, run all unit tests. If everything passed the app will launch in the browser with BrowerSync connected.

## Running the tests

### Unit tests
Unit tests are automatically run when ```gulp``` is used to start up the development environment.


### End to end tests

The e2e tests require JDK to be installed, and are executed using Chrome, but other browsers can be configured.

```
gulp webdriverUpdate
gulp e2eTest
```
For e2e tests to run, a localhost must be started first in a separate tab using ```gulp```.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Brian Gammon** - *Initial work* - [Bitbucket](https://bitbucket.org/brianGammon)

## License

This project is licensed under the MIT License

## Acknowledgments

* Started with generator-ng-poly
