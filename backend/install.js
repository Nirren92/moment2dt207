require("dotenv").config();

const uri = process.env.URLDB;

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
mongoose
    .connect(uri)
    .then(() => {console.log("Ansluten till mongodb");})
    .catch((error)=> {console.error("nåt gick fel"+error);})

const workexperience = mongoose.Schema({
    companyName: String,
    jobTitle: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: String
})
    
const WorkExperience = mongoose.model('WorkExperience', workexperience);

let testdata = {
    companyName: "test",
    jobTitle: "test",
    location: "test",
    startDate: new Date(),  
    endDate: new Date(),
    description: "test"
};

WorkExperience.create(testdata);
