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
            const response = await fetch("http://localhost:3000/api/workexperience");
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
            const response = await fetch("http://localhost:3000/api/removeworkexperience/"+id, {
                            method: 'POST'
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
            const response = await fetch("http://localhost:3000/api/addworkexperience", {
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify(data),
                        });
            return response.status;
            
        }
        catch(err)
        {
            console.error("nåt gick fel vid tillägg av data:",err);
            return null;        
        }
    }

    async getalldata(): Promise<workexperience[]>
    {
        //felhantering?!?!?!?!
        await this.Loaded;
        console.log("array",this.WorkExperiencearray);
        return this.WorkExperiencearray;
    }
    


}


async function get_data(url_IN)
{
        const response = await fetch(url_IN);
        const data = await response.json();
        return data;
}

