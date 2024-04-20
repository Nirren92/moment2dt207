const { render } = require("ejs");
const {Client} = require("pg");
require("dotenv").config();

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));



//Ansluter
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


//skapar tabell
client.query(`
DROP TABLE IF EXISTS workexperience;

CREATE TABLE workexperience(
    id SERIAL Primary KEY,
    companyname TEXT,
    jobtitle TEXT,
    location TEXT,
    startdate DATE,
    enddate DATE,
    description TEXT

);



INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES 
('company1','Projektledare','sverige','2020-05-15','2021-05-15', 'det var roligt jobb'),
('company2','Tekniker','sverige','2022-05-15','2021-05-15', 'det var roligt jobb'),
('company3','Operatör','sverige','2023-05-15','2021-05-15', 'det var roligt jobb');

`);


