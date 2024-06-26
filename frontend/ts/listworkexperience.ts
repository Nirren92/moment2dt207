import { workexperience} from "./workexperience";

export class WorkExperienceList
{
    private WorkExperiencearray:workexperience[] = [];
    private Loaded: Promise<void>;

    constructor()
    {
        //måste säkerställa att data blivit uppladdat till objekt. 
        this.Loaded = this.Initdatabasedata();
    }

    //Funktion för att hämta all sparad data
    private async Initdatabasedata()
    {
        try {
            const response = await fetch("https://moment2dt207.onrender.com/api/workexperience");
            let temparray = await response.json();
            //Skapar objekt av datan. 
            this.WorkExperiencearray = temparray.map(element => new workexperience(
            element.id,
            element.companyname,
            element.jobtitle,
            element.location,
            element.startdate,
            element.enddate,
            element.description
            ));

            console.log("data är hämtad",this.WorkExperiencearray);
        }
        catch(err)
        {
            console.error("nåt gick fel vid hämtning av data:",err);        
        }
    }

     async deleteworkexperience(id:number)
    {
        try {
            const response = await fetch("https://moment2dt207.onrender.com/api/removeworkexperience/"+id, {
                            method: 'DELETE'
                        });
            console.log("data är raderad",this.WorkExperiencearray);
        }
        catch(err)
        {
            console.error("nåt gick fel vid borttagning av data:",err);        
        }
    }

    async addworkexperience(data:workexperience)
    {
        try {
            //kontrollerar att indata finns med 
            const { companyname, jobtitle,location,startdate,enddate,description } = data;
            if(!companyname || !jobtitle || !location || !startdate || !enddate || !description)
                {   
                    console.error("Indata saknas.");
                }
            else if(isNaN((new Date(startdate).getTime())) || isNaN((new Date(enddate).getTime())))
                {
                console.log("Datum inkorrekt");
                }
            else
            {
                console.log("com"+companyname); 
                const response = await fetch("https://moment2dt207.onrender.com/api/addworkexperience", {
                                method: 'POST',
                                headers: {
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify(data),
                            });
                return response.status;
                
            }
        }
        catch(err)
        {
            console.error("nåt gick fel vid tillägg av data:",err);
            return null;        
        }
    }


    //denna felhantering här är inte optimal.skulle typ vilja returnera null
    async getalldata(): Promise<workexperience[]>
    {
        try {
            //väntar på att construktor först har hunnit med att ladda
            await this.Loaded;
            console.log("array",this.WorkExperiencearray);
            return this.WorkExperiencearray;
        }
        catch(err)
        {
            console.error("nåt gick fel vid tillägg av data:",err);
            return this.WorkExperiencearray;        
        }
    }
    


}


async function get_data(url_IN)
{
        const response = await fetch(url_IN);
        const data = await response.json();
        return data;
}

