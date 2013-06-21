
/*
 * GET static pages.
 */

exports.about = function(req, res){
    res.render('app/pages/about', {
        title: 'About Us page'
    });
};