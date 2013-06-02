
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {
        title: 'Express',
        ngApp: 'mainApp',
        ngController: 'mainCtrl',
        scriptCtrl: 'main'
    });
};