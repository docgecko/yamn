
/*
 * GET about page.
 */

exports.index = function(req, res){
    res.render('index', {
        title: 'About'
    });
};