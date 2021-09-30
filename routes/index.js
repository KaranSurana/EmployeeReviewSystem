var express = require('express');
const passport = require('passport');

var router = express.Router();

const homeController = require('../controllers/usercontroller');

const emp = require("../models/employee");

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
        console.log(newEmp);
        emp.find({},function(err,emp){
            if(err){
                console.log(err)
                return;
            }
            res.redirect("index",{
                emp:emp
            })
        })
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