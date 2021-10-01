var express = require('express');
const passport = require('passport');

var router = express.Router();


// getting controllers for routes
const homeController = require('../controllers/usercontroller');

const emp = require("../models/employee");
// getting all the routes


router.get('/admin',function(req,res){
    emp.findByIdAndUpdate(req.query.id,{admin:true,canvote:true},function(err,emp){
        return res.redirect('back');
    })
})
// passport authentication in routes
router.get('/ratings',passport.checkAuthentication,function(req,res){
    emp.find({},function(err,empl){
        if(err){
            console.log(err)
            return;
        }
        console.log(empl);
        res.render("ratings",{
            emp:empl
        })
    })
})


router.get('/vote',function(req,res){
    emp.findByIdAndUpdate(req.query.id,{canvote:true},function(err,emp){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
})


router.get('/signout',homeController.destroySession);

router.post('/',function(req,res){

    emp.find({_id:req.user.id},function(err,userr){
        if(err){
            console.log(err);
            return;
        }
        
        var array=userr[0].liked;
        array.push(req.query.id)
        emp.findByIdAndUpdate(req.user.id,{'liked':array},function(err){
            if(err){
                console.log(err);
                return;
            }
        })
    })


    emp.find({_id:req.query.id},function(err,emp1){
        if(err){
            console.log(err)
            return;
        }
        var rating = emp1[0].rating;

        if(rating==0){
            emp.findByIdAndUpdate(req.query.id,{rating:parseInt(req.body.rate)},function(err,emp){
                if(err){
                    console.log(err);
                }
                return res.redirect('back');
            })
        }else{
            emp.findByIdAndUpdate(req.query.id,{rating:((parseInt(req.body.rate)+rating)/2).toFixed(1)},function(err,emp){
                if(err){
                    console.log(err);
                }
                return res.redirect('back');
            })
        }
    })
});


router.get('/deleteemp',function(req,res){
    emp.findByIdAndDelete(req.query.id,function(err){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('back');
    });
})

router.get('/',passport.checkAuthentication,function(req,res){
    emp.find({},function(err,emp){
        if(err){
            console.log(err)
            return;
        }
        res.render("index",{
            emp:emp
        })
    })
})
router.post('/register',function(req,res){
    emp.create({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password: req.body.password
    },function(err,newEmp){
        if(err){
            console.log(err);
            return;
        }
        res.render("signin")
    })
})

router.get('/register',function(req,res){
    res.render('register');
})

router.get('/signin',function(req,res){
    
    res.render('signin')
})


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/signin'}
),homeController.createSession)





module.exports = router;