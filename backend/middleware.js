import config from "./config.js"
import jwt from "jsonwebtoken"

const {JWT_SECRET} = config; 

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.UserID){
            req.user = decoded;
            next();
        }
    }catch(err){
        return res.status(403).json({});
    }
};


  

export default authMiddleware;