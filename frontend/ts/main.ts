import { WorkExperienceList} from "./listworkexperience";
import { workexperience} from "./workexperience";


//variabler 


//DOM event
document.addEventListener("DOMContentLoaded",init);


//variabler globala
const worklists:WorkExperienceList = new WorkExperienceList();

async function init() {
    const experiences = await worklists.getalldata();
    experiences.forEach(element => {
        addrow(element);
    });
}



function addrow(data:workexperience)
{
    console.log("lägger till rad",data);
    let experiencelist:any = document.getElementById("experiencelist")

    if(experiencelist)
    {
        const details = document.createElement('details');
        details.classList.add('details');
        const summary = document.createElement('summary');
        summary.textContent = data.JobTitle +"Företag:"+data.CompanyName;
        const p1 = document.createElement('p');
        p1.textContent = data.Description;
        const p2 = document.createElement('p');
        p2.textContent = data.StartDate+"-"+data.EndDate;
        details.appendChild(summary);
        details.appendChild(p1);
        details.appendChild(p2);

        
        //skapar cell och skapar knapp. skriver värde till föregående cell samt uppdaterar objekt.  
        let deletebutton:Element = document.createElement("button");
        deletebutton.textContent = "Delete"
        deletebutton.addEventListener("click",function(){
            console.log("denna tas bort"+data.Id);
            
            worklists.deleteworkexperience(data.Id);
            details.remove();
            
        });
        details.appendChild(deletebutton);    
        experiencelist.appendChild(details);

    }
    else
    {
        console.error("nåt gick fel vid hämtning av tabell.")
    }
}