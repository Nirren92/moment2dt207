const { render } = require("ejs");
const {Client} = require("pg");
require("dotenv").config();



const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


//hämtar anslutningsdata från env
const client = new Client({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    ssl:{
        rejectUnauthorized: false,
    },
}); 
//ansluter
client.connect((err) => {
    if(err)
    {
        console.error("gick inte att ansluta.", err);
    }
    else
    {
        console.log("Ansluten till datbas. ");
    }
});


//Starta server
app.listen(process.env.PORT, () =>{
    console.log("server startad");   
});



//inlagda erfarenheter som finns inlagda i systemet
app.get("/api/workexperience",cors(), async(req,res) =>{
    client.query("SELECT * FROM workexperience", (err, result) =>{
        if(err)
        {
            console.log("nåtgick fel vid sql fråga"+err);
        }
        else
        {
            if(result.rows.length < 1)
            {
                console.log("inga rader fanns.sätta nåt default värde?")
                res.status(404).send('Ingen data i databasen');;
            }
            else
            {
                res.json(result.rows);
            }
        }
    });
});

//Ändrar data i erfarenhet. detta kommer från en form datan som ska uppdateras
app.post('/api/updateworkexperience',cors(), async (req, res) => {
    try
    {
       const { ID,companyname, jobtitle,location,startdate,enddate,description } = req.body;

        //kontroll att det är inga nullvärden
        if(!companyname || !jobtitle || !location || !startdate || !enddate)
        {
            console.log("indata tom/null");
            return res.status(400).send('Indata är inkorrekt, fält'); 
        }

        //kontroll av datum
        if(isNaN((new Date(startdate).getTime())) || isNaN((new Date(enddate).getTime())))
        {
        console.log("Datum inkorrekt");
        return res.status(400).send('Datum i indata inkorrekt är inkorrekt, fält'); 
        }
       const result = await client.query("UPDATE workexperience set companyname =$2, jobtitle=$3,location=$4,startdate=$5,enddate=$6, description=$7 WHERE code=$1",[ID,companyname, jobtitle,location,startdate,enddate,description])  
    }
    catch (err)
    {
        console.error("Nnåtgick fel vid sql fråga:"+err)
    }
    
});


//lägger till erfarenhet. detta kommer från en form datan som ska uppdateras
app.post('/api/addworkexperience',cors(), async (req, res) => {
    try
    {
       const { companyname, jobtitle,location,startdate,enddate,description } = req.body;
     
       //kontroll att det är inga nullvärden
       if(!companyname || !jobtitle || !location || !startdate || !enddate)
       {
            console.log("indata tom/null");
            return res.status(400).send('Indata är inkorrekt, fält'); 
       }

       //kontroll av datum
       if(isNaN((new Date(startdate).getTime())) || isNaN((new Date(enddate).getTime())))
       {
        console.log("Datum inkorrekt");
        return res.status(400).send('Datum i indata inkorrekt är inkorrekt, fält'); 
       }

       const result = await client.query("INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES($1,$2,$3,$4,$5,$6)",[companyname, jobtitle,location,startdate,enddate,description])  
       res.status(201).send('Arbetslivserfarenhet tillagd');
    }
    catch (err)
    {
        console.error("Nåtgick fel vid sql fråga:"+err);
        res.status(500).send("Nåtgick fel vid sql fråga:"+err);
    }

});



//tar bort erfarenhet
app.post('/api/removeworkexperience/:exeperienceID',cors(), async (req, res) => {
    try
    {
       const { exeperienceID } =  req.params;
       const result = await client.query("DELETE FROM workexperience WHERE id=$1",[exeperienceID])  
    }
    catch (err)
    {
        console.error("nåtgick fel vid sql fråga:"+err)
    }
   
});










