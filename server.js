require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
const router=require("./src/routes/router");
const connectDb=require("./src/utils/db");
const errorMiddleware= require("./src/middlewares/error_middleware");

const corsOptions={
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", router);

app.use(errorMiddleware);

connectDb().then(()=>{
    app.listen(5000,()=>{
        console.log("server running on 5000...")
    })
})
