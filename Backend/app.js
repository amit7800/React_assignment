import express from 'express'
import { Db } from 'mongodb';
import { mongoconnection } from './db';
import  bodyParser  from 'body-parser';
import cors from 'cors';
import user from './route/user';



const app = express()

mongoconnection();
app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

app.use("/user",user)





export default app;