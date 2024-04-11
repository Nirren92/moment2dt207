import { WorkExperienceList} from "./listworkexperience";
import { workexperience} from "./workexperience";


//variabler 


//DOM event
document.addEventListener("DOMContentLoaded",init);
const form = document.getElementById('inputform');



//variabler globala
const worklists:WorkExperienceList = new WorkExperienceList();


function submitform(event:Event)
{
    event.preventDefault();
    //hämtar data från form
    const forms = event.target;
    const formData = new FormData(forms); // här har jag fel.
    const data = Object.fromEntries(formData.entries()) as unknown as workexperience;
    console.log("Submit",data);
    worklists.addworkexperience(data);
}


async function init() {
    const experiences = await worklists.getalldata();
    experiences.forEach(element => {
        addrow(element);
    });
    if(form)
    form.addEventListener('submit',submitform );
}



function addrow(data:workexperience)
{
    console.log("lägger till rad",data);
    let experiencelist:any = document.getElementById("experiencelist")

    if(experiencelist)
    {


        //fixar datum och år



        const details = document.createElement('details');
        details.classList.add('details');
        const summary = document.createElement('summary');
        summary.textContent = "Företag: "+data.CompanyName +" - "+data.JobTitle+" - "+ getYear(data.StartDate)+"-"+getMonth(data.StartDate)+" - "+ getYear(data.EndDate)+"-"+getMonth(data.EndDate);
        const p1 = document.createElement('p');
        p1.textContent = data.Description;
        details.appendChild(summary);
        details.appendChild(p1);
  
        
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




function getYear(strdate:Date):number
{
    const date = new Date(strdate);
    return date.getFullYear();
}

function getMonth(strdate:Date):string
{
    //månad börjar på 0varav +1
    const date = new Date(strdate);
    return (date.getMonth() + 1).toString().padStart(2, '0');
}