import jwt from "./config";

const wt =require('jsonwebtoken');

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader||!authHeader.startWith('Bearer ')){
        return res.status(403).json({
            message : "Access Denied!"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = wt.verify(token,jwt);
        
        if(decoded.id){
            req.userId = decoded.id ;
            next();
        }else{
            res.status(403).json({
                message : "Access denied"
            })
        }
    }
    catch(err){
        res.status(403).json({
            message : "Access denied"
        })
    }
}

module.exports({
    auth
})