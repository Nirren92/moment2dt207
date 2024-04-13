import { WorkExperienceList} from "./listworkexperience";
import { workexperience} from "./workexperience";

//DOM event
document.addEventListener("DOMContentLoaded",init);
const form = document.getElementById('inputform');

//variabler globala
const worklists:WorkExperienceList = new WorkExperienceList();

//hämtar data från form
async function submitform(event:Event)
{
    //hindrar default inställningar på form
    event.preventDefault();

    //kontrollerar att det är korrekt format(form)
    if(event.target instanceof HTMLFormElement)
    {
        const data = Object.fromEntries(new FormData(event.target).entries()) as unknown as workexperience;
        console.log("Submit",data);
        const addok = await worklists.addworkexperience(data);
        //gick det bra att lägga till data i databasen läggs den även till manuellt i frontend utan ett API anrop för att undvika onödigt anrop
        console.log("statuws: "+addok);
        if(addok==201)
        {
            addrow(data as workexperience);
        }
        else
        {
            alert("Kontrollera inmatningsdata");
        }
    }

}

//Init funktion när data laddas in från databas
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
    //lägger till data i en details med berörd information 
    if(experiencelist)
    {
        const details = document.createElement('details');
        details.classList.add('details');
        const summary = document.createElement('summary');
        summary.textContent = "Företag: "+data.companyname +" - "+data.jobtitle+" - "+ getYear(data.startdate)+"-"+getMonth(data.startdate)+" - "+ getYear(data.enddate)+"-"+getMonth(data.enddate);
        const p1 = document.createElement('p');
        p1.textContent = data.description;
        
        details.appendChild(p1);
        const p2 = document.createElement('p');
        p2.textContent ="Placeringsort: "+ data.location;
        details.appendChild(p2);


        details.appendChild(summary);
       


        //skapar knapp för att kunna radera objektet. 
        let deletebutton:Element = document.createElement("button");
        deletebutton.textContent = "Delete"
        deletebutton.addEventListener("click",function(){
            console.log("denna tas bort"+data.id);
            worklists.deleteworkexperience(data.id);
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

//får årtal i format YYYY
function getYear(strdate:Date):number
{
    const date = new Date(strdate);
    return date.getFullYear();
}
//får månad i format MM
function getMonth(strdate:Date):string
{
    //månad börjar på 0varav +1
    const date = new Date(strdate);
    return (date.getMonth() + 1).toString().padStart(2, '0');
}