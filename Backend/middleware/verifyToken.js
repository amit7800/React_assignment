
import  jwt  from 'jsonwebtoken';

export const verifyToken=async(req,res,next)=>
{
    try{


const token = req.header("authorization");

let JwtSecreteKey= "SECRET_KEY";

if(!token)
{
    return res.send({
        status: 404,
        message:"error"
    })}
    
        

    const decode = jwt.verify(token,JwtSecreteKey);
    req.result=decode;
    next();

    }
catch(e){
    
    res.send({
        status: 400,
        message:"not valid"

    })
}
}
