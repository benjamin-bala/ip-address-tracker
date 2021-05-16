//Selecting Elements
let userinput = document.getElementById("userinput")
let btn = document.querySelector("button")
let ipInformationDiv = document.querySelector(".ip-information")

//Initializing Map
var map = L.map('mapid').setView([22.12, 82.2], 18);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Generate Div with ip information
const generateDiv = (ip,city,region,timezone,isp) =>{
    ipInformationDiv.innerHTML = 
    `
    <div class="card-box">
      <div class="card">
        <p>IP Address</p>
        <h2>${ip}</h2>
      </div>
      <div class="card">
        <p>Location</p>
        <h2>${city}, ${region}</h2>
      </div>
      <div class="card">
        <p>Timezone</p>
        <h2>${timezone}</h2>
      </div>
      <div class="card">
        <p>Isp</p>
        <h2>${isp}</h2>
      </div>
    </div>
    `
}


//Get Ip address from User and fetch information from ipify api
const getInformationFromIp = async address => {

    //Check user input for Ip address or domain name
    let checkUserInput = address.toLowerCase().includes("www.") ? `domain=${address}` : `ipAddress=${address}`

    //Fetch information from api
    await fetch(`https://geo.ipify.org/api/v1?apiKey=at_7XvGwLTyRgLdgnZb43ZrrgzfJuR8m&${checkUserInput}`)
    .then(res => res.json())
    .then(data => {
      
       
        //Adding informations to div    
        generateDiv(data.ip,data.location.city,data.location.region,data.location.timezone,data.isp)

        //Update Location
        map.panTo([data.location.lat, data.location.lng]);
        
        L.marker([data.location.lat, data.location.lng]).addTo(map)
            .openPopup();
    })
    .catch(console.log)
}

//Get infromation from ip
getInformationFromIp(userinput.value)



//Adding events to Elements
btn.addEventListener("click", () => {
  getInformationFromIp(getInformationFromIp(userinput.value))
})

userinput.addEventListener("keypress", event => {
    if(event.key === "Enter") return getInformationFromIp(userinput.value)
})