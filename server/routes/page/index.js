
/*
 * GET static pages.
 */

exports.about = function(req, res){
    res.render('index', {
        title: 'About Us Page'
    });
};