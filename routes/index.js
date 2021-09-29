var express = require('express');

var router = express.Router();

const emp = require("../models/employee");

router.get('/',function(req,res){
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
        username:req.body.username
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
            res.render("index",{
                emp:emp
            })
        })
    })
})

router.get('/register',function(req,res){
    res.render('register');
})

module.exports = router;