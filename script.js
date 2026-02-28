// 1️⃣ Load donors from localStorage OR default list
let donors = JSON.parse(localStorage.getItem("donors")) || [
  {name:"Ali Khan", group:"A+", city:"Karachi", contact:"03001234567"},
  {name:"Sara Ahmed", group:"O-", city:"Lahore", contact:"03111234567"},
  {name:"Ahmed Raza", group:"B+", city:"Islamabad", contact:"03211234567"},
  {name:"Fatima Noor", group:"AB-", city:"Karachi", contact:"03331234567"},
  {name:"Usman Ali", group:"O+", city:"Peshawar", contact:"03451234567"},
  {name:"Ayesha Malik", group:"A-", city:"Quetta", contact:"03561234567"},
  {name:"Hassan Tariq", group:"B-", city:"Multan", contact:"03671234567"},
  {name:"Zainab Khan", group:"AB+", city:"Karachi", contact:"03781234567"},
  {name:"Bilal Ahmed", group:"O-", city:"Lahore", contact:"03891234567"},
  {name:"Mariam Ali", group:"A+", city:"Islamabad", contact:"03901234567"}
];


// 2️⃣ Save to localStorage
function saveToStorage(){
  localStorage.setItem("donors", JSON.stringify(donors));
}


// 3️⃣ DISPLAY DONORS FUNCTION (Add here 👇)
function displayDonors(data){
  const table = document.querySelector("#donorTable tbody");
  table.innerHTML = "";

  data.forEach((donor, index) => {
    const row = document.createElement("tr");

    if(donor.group.includes("-")){
      row.classList.add("rare");
    }

    row.innerHTML = `
      <td>${donor.name}</td>
      <td>${donor.group}</td>
      <td>${donor.city}</td>
      <td>${donor.contact}</td>
      <td><button onclick="deleteDonor(${index})">Delete</button></td>
    `;

    table.appendChild(row);
  });

  updateStats();
}


// 4️⃣ DELETE FUNCTION
function deleteDonor(index){
  if(confirm("Are you sure you want to delete this donor?")){
    donors.splice(index, 1);
    saveToStorage();
    displayDonors(donors);
  }
}


// 5️⃣ FILTER FUNCTION
function filterDonors(){
  const blood = document.getElementById("bloodFilter").value;
  const city = document.getElementById("citySearch").value.toLowerCase();

  const filtered = donors.filter(donor => {
    return (blood === "" || donor.group === blood) &&
           (city === "" || donor.city.toLowerCase().includes(city));
  });

  displayDonors(filtered);
}


// 6️⃣ STATS FUNCTION
function updateStats(){
  document.getElementById("totalDonors").innerText = donors.length;

  const rareCount = donors.filter(d => d.group.includes("-")).length;
  document.getElementById("rareDonors").innerText = rareCount;
}


// 7️⃣ Show donors when page loads
displayDonors(donors);