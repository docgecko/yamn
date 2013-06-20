
/*
 * GET static pages.
 */

exports.view = function(req, res){
    res.render('pages/about', {
        title: 'Viewing static page',
        page: req.page
    });
};