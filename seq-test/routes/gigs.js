const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');


//get gig list
router.get('/',(req,res)=>
    Gig.findAll({
        raw:true
    })
        .then(gigs=>{
            res.render('gigs',{
                gigs,
            });
        })
        .catch(err=>console.log(err)));

//display add form
router.get('/add',(req,res)=>res.render('add'));


//add a gig
router.post('/add',(req,res)=>{
    const data={
        title: 'python dev wanted',
        technologies: 'python, django',
        budget:'4000',
        description:'3+ years exp required',
        contact_email:'mycompany@gmail.com'
    }
    let {title, technologies,budget,description,contact_email} =data;

    Gig.create({
        title:title,  //older syntax
        technologies, //es6 syntax since both are same
        budget,
        description,
        contact_email
    })
        .then(gig=>res.redirect('/gigs'))
        .catch(err=>console.log(err));
});

module.exports= router; 
