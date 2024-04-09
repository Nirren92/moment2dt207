import { WorkExperienceList} from "./listworkexperience";
import { workexperience} from "./workexperience";


//variabler 


//DOM event
document.addEventListener("DOMContentLoaded",init);


//variabler globala
const worklists:WorkExperienceList = new WorkExperienceList();

async function init() {
    const experiences = await worklists.getalldata();
    console.log("ex",experiences)
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
        p1.textContent = data.StartDate+"-"+data.EndDate;
        details.appendChild(summary);
        details.appendChild(p1);
        experiencelist.appendChild(details);

    }
    else
    {
        console.error("nåt gick fel vid hämtning av tabell.")
    }
}