const express = require('express');
const router = express.Router();

router.route('/register').post((req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var password=req.body.password;


    var sqlQuery ="INSERT INTO user(name,email,phone,password) VALUES(?,?,?,?)";

    db.query(sqlQuery,[name,email,phone,password],function(error,data,fields){
        if(error){
            res.send(JSON.stringify({
                success:false,
                message:error            }));
        }
        else{
            res.send(JSON.stringify({success:true,message:'register'}));
        }
    })

});

module.exports=router;