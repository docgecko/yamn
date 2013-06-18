# [yamn](https://github.com/docgecko/yamn) [![Build Status](https://travis-ci.org/docgecko/yamn.png?branch=master)](https://travis-ci.org/docgecko/yamn)

A boilerplace and kickstart for [Yeoman](http://yeoman.io), [AngularJS](http://angularjs.org), MongoDB & [NodeJS](http://nodejs.org) based projects.

***

## Quick Start

Install Node.js and then:

```sh
$ git clone git://github.com/docgecko/yamn
$ cd yamn
$ npm install -g yo grunt-cli bower karma express
$ npm install --save
$ bower install --save-dev
$ grunt server
```

Visit [http://localhost:9000](http://localhost:9000) to view home page and open [http://localhost:6001](http://localhost:6001) to see reload of updated less & jade files.

Happy hacking!

## Purpose

TBD

## Philosophy

TBD
## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
yamn/
  |- .tmp/
  |- client/
  |  |- app/
  |  |  |- <app logic>
  |  |- assets/
  |  |  |- <static files>
  |  |- components/
  |  |  |- <reusable angular code & external libs>
  |  |- less/
  |  |  |- main.less
  |- dist/
  |- docs/
  |- node_modules/
  |- server/
  |  |- api
  |  |  |- <route files>
  |- test/
  |  |- config/
  |  |  |- <karma config files>
  |  |- e2e/
  |  |  |- <karma scenario test files>
  |  |- lib/
  |  |  |- <angular mocks & scenario>
  |  |- unit/
  |  |  |- <angular unit test files>
  |- .bowerrc
  |- .editorconfig
  |- .gitattributes
  |- .gitignore
  |- .jshintrc
  |- .nodemonignore
  |- .travis.yml
  |- app.js
  |- bower.json
  |- Gruntfile.js
  |- LICENSE
  |- package.json
  |- README.md
```


What follows is a brief description of each entry, but all directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.
