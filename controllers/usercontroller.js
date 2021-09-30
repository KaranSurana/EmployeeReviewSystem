module.exports.createSession = function(req,res){
    return res.redirect('/')
}
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/signin')
}