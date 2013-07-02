'use strict';

/*
 * GET static pages.
 */

exports.welcome = function(req, res){
    res.render('index', {});
};

exports.about = function(req, res){
    res.render('index', {});
};