/api/workexperience
Dettta Api retunerar all tillänglig data från databasen. skulle databasen vara tom anges status 404

/api/updateworkexperience
Detta API tillåter användaren att uppdatera en befintlig rad. Detta styrs genom det ID som varje erfarenhet får tilldelat vid skapande. 
ID,companyname, jobtitle,location,startdate,enddate,description: API anropen ska inne hålla följande data i body. 
kontroll av data görs och ett lyckat anrop returnerar status 201. 

/api/addworkexperience
Detta api tillåter användaren att lägga till ny erfarenhet i databasen. 
ID,companyname, jobtitle,location,startdate,enddate,description: API anropen ska inne hålla följande data i body. 
kontroll av data görs och ett lyckat anrop returnerar status 201. 

/api/removeworkexperience/:experienceID
Detta API tillåter användaren att ta bort en erfarenhet från databasen. experienceID anger vilken erfarenhet som ska tas bort. 



data har följande format:
    id:number;
    companyname:string;
    jobtitle:string;
    location:string;
    startdate:Date;
    enddate:Date;
    description:string;


