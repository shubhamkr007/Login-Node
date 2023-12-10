var express= require('express')
var router = express.Router();

const credentials ={
    email:"admin@gamil.com",
    password: "admin"
}
router .post('/login',(req,res)=>{
    if(req.body.email == credentials.email 
        && req.body.password == credentials.password){
            req.session.user=req.body.email;
            res.redirect('/route/dashboard');
            // res.end(`Login Successfull ${req.session.user}`);
    }
    else{
        res.end('INVALID USERNAME OR PASSWORD')
    }
})

router.get('/dashboard',(req,res)=>{

    if(req.session.user){
        res.render('dashboard',{user: req.session.user});
    }
    else{
        res.send("Unauthorize User");
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(error);
            res.send("Error");
        }
        else{
            res.render('base',{title : "Express", logout : "Logout Successfull..!"})
        }
    })
})

module.exports = router;