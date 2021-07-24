const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")

let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function saveInput(){
    let lead = inputEl.value
    myLeads.push(lead)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = ""
    console.log(localStorage.getItem("myLeads"))

}

function render(leads){
    let listItems = ""

    for(let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a href='https://${leads[i]}' target='_blank'>${leads[i]}</a>
            </li>
        `
    }

    ulEl.innerHTML = listItems

}

function saveTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

}

function deleteLeads(){
    localStorage.removeItem("myLeads")
    myLeads = []
    render(myLeads)
    console.log("Leads Deleted")
}

inputBtn.addEventListener("click", saveInput)
deleteBtn.addEventListener("dblclick", deleteLeads)
tabBtn.addEventListener("click", saveTab)


