# [yamn](https://github.com/docgecko/yamn) [![Build Status](https://travis-ci.org/joshdmiller/ng-boilerplate.png?branch=master)](https://travis-ci.org/joshdmiller/ng-boilerplate)

A kickstarter for [Yeoman](http://http://yeoman.io), [AngularJS](http://angularjs.org), MongoDB & [NodeJS](http://nodejs.org) based projects.

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
  |  |- angular-bootstrap/
  |  |- bootstrap/
  |  |- placeholders/
  |- docs/
  |- node_modules/
  |- server/
  |  |- api
  |  |  |- <route files>
  |- test
  |  |- lib/
  |  |  |- <angular mocks & scenario>
  |  |- spec/
  |  |- runner.html
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```


What follows is a brief description of each entry, but all directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.
