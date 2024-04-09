//klass för att hantera workexperience data
export interface interfaceworkexperience 
{
    Id:number;
    CompanyName:string;
    JobTitle:string;
    Location:string;
    StartDate:Date;
    EndDate:Date;
    Description:string;
}

export class workexperience implements interfaceworkexperience
{
    Id:number;
    CompanyName:string;
    JobTitle:string;
    Location:string;
    StartDate:Date;
    EndDate:Date;
    Description:string;
    
    constructor( id:number,companyname:string,jobtitle:string,location:string,startdate:Date,enddate:Date,description:string)
    {
        this.Id = id;
        this.CompanyName = companyname;
        this.JobTitle = jobtitle;
        this.Location = location;
        this.StartDate = startdate;
        this.EndDate = enddate;
        this.Description = description;
    }





}