const express = require("express");
const path = require('path');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//create the post request
app.post("/date",(req,res)=>{
    if (req.body.name != '' && req.body.date != ''){
        const name = req.body.name
        const date = new Date(req.body.date)
        switch(date.getDay()){
            case 0:
                day= "Sunday"
                break;
            case 1:
                day= "Monday"
                break;
            case 2:
                day= "Tuesday"
                break;
            case 3:
                day= "Wednesday"
                break;
            case 4:
                day= "Thursday"
                break;
            case 5:
                day= "Friday"
                break;
            case 6:
                day = "Saturday"
                break;
        }
        if(day){
            res.status(200).send({'name':name,'day':day})
        }else{
            res.send({'message':"something went wrong"})
        }
    }else{
        res.send({'message':'Please fill the form correctly.'})
    }
});


let port = process.env.PORT || 5000 ;

if(process.env.NODE_ENV === "production"){
    app.use(express.static('build'))
    app.get('*', (req,res) => {
        req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}
app.listen(port,()=>{
    console.log("server listening the port number 5000");
});