# expressjs-typescript-template
[![Node.js CI](https://github.com/firmanJS/express-template-typescript/actions/workflows/nodejs.yml/badge.svg)](https://github.com/firmanJS/express-template-typescript/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/9efe57e81ceae70a7c8d/maintainability)](https://codeclimate.com/github/firmanJS/express-template-typescript/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9efe57e81ceae70a7c8d/test_coverage)](https://codeclimate.com/github/firmanJS/express-template-typescript/test_coverage)
[![made-with-nodejs](https://img.shields.io/badge/Made%20with-Nodejs-1f425f.svg)](https://nodejs.org)
[![made-with-expressjs](https://img.shields.io/badge/Made%20with-Expressjs-1f425f.svg)](https://expressjs.com/)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/firmanJS)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/firmanJS/express-template-typescript/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/firmanjs/express-template-typescript.svg)](https://github.com/firmanJS/express-template-typescript/releases)
[![Github all releases](https://img.shields.io/github/downloads/firmanjs/express-template-typescript/total.svg)](https://github.com/firmanJS/express-template-typescript/releases)
[![GitHub issues](https://img.shields.io/github/issues/firmanjs/express-template-typescript.svg)](https://github.com/firmanJS/express-template-typescript/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/firmanjs/express-template-typescript.svg)](https://github.com/firmanJS/express-template/pulls/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## How To use
you must click the button use this template
- **using template** - create name of your repository
- **rename link readme** - change link repo default `github/firmanJS/express-template` to your repo
- **codeclimate** - you must integrate repo to codeclimate don't forget set your repo is public for integrated and in github repo settings create secret key with name `CC_TEST_REPORTER_ID` and value from code climate `REPORTER ID` in [https://codeclimate.com/](https://codeclimate.com/)

or clone this repository via https : 
```bash
https://github.com/firmanJS/express-template-typescript.git
```

default branch using `commonjs` if you want version ecmascript you must checkout to branch `version/ecmascript`

## Core Stack
- **Node.js** - [http://nodejs.org/](http://nodejs.org/)
- **Typescript** - [http://nodejs.org/](https://www.typescriptlang.org/)
- **Express** - [http://expressjs.com/](http://expressjs.com/)

## Feature
1. error handling
1. clean architecture folder
1. testing with jest
1. coverage use jest
1. with docker example
1. validiation, use express-valdator
1. pagination example
1. custom message api response
1. eslint airbnb base

## Unit testing
- **jestjs** - [https://jestjs.io/](https://jestjs.io/)

## How To run

### copy environment variable

```sh
cp .env-sample .env
```

### run manualy

* via yarn or npm :

```sh
# install package
npm install or yarn install

#  running app
npm run dev or yarn dev

# running unit tetsing
npm run test or yarn test
```

* via make :

```sh
# start aplication with docker
make docker-start 

# stop docker container
make docker-stop 

# remove docker container
make docker-down 
```

### fill in the copied environment earlier

```sh
APP_PORT=2000
TZ=Asia/Jakarta
SECRET_KEY= #jwt secret key here
```

### run with docker-compose

```sh
docker-compose up --build
```

### or run with background process

```sh
docker-compose up --build -d
```
### execution npm with container docker
```sh
# install package
docker-compose exec boillerplate-typescript npm install

# running unit testing
docker-compose exec boillerplate-typescript npm run test
```

## Documentation API 
using swagger check in folder static

## Project Structure
```
.
├── .github/            * all workflows github actions
├── caprover/           * for deployment in caprover
├── coverage/           * all output coverage
├── build/              * all output build source code
├── docker/             * all dockerfile
├── src/                * all source code in here
  └── api/              * all api file here
  └── config/           * all configuration file here
  |  └── *.ts          * all configuration like database, aws etc
  <!-- └── database/         * all models schema file here
  |   └── models        * all models file
  |   └── migrations    * all migrations file
  |   └── seeders       * all seeders file
  └── middleware/       * all middleware file here, for check before next to api
  └── routes/           * all file route here
  |   └── index.js      * register all route
  └── test/             * all test file here
  |   └── index.js      * test apps
  └── utils/            * all utils file here -->
```

## Code Style Guides
* Guideline:
  * Use camelCase for variable name, naming function
  * Use UpperCase for Constant Variable
  * Use PascalCase for class name, models, interface
  * Use snake_case for file name 
  * Function name use Verb
  * Variable name use Noun