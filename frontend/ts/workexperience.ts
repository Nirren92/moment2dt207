//klass för att hantera workexperience data
export interface interfaceworkexperience 
{
    id:number;
    companyname:string;
    jobtitle:string;
    location:string;
    startdate:Date;
    enddate:Date;
    description:string;
}

export class workexperience implements interfaceworkexperience
{
    id:number;
    companyname:string;
    jobtitle:string;
    location:string;
    startdate:Date;
    enddate:Date;
    description:string;
    
    constructor( id:number,companyname:string,jobtitle:string,location:string,startdate:Date,enddate:Date,description:string)
    {
        this.id = id;
        this.companyname = companyname;
        this.jobtitle = jobtitle;
        this.location = location;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
    }





}