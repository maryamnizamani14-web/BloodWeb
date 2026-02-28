let donors = JSON.parse(localStorage.getItem("donors")) || [
  {name:"Hafsa khan", group:"A+", city:"Karachi", contact:"03001234567"},
  {name:"Sara Ahmed", group:"O-", city:"Lahore", contact:"03111234567"},
  {name:"Ahmed Raza", group:"B+", city:"Islamabad", contact:"03211234567"},
  {name:"Fatima Noor", group:"AB-", city:"Karachi", contact:"03331234567"},
  {name:"Usman Ali", group:"O+", city:"Peshawar", contact:"03451234567"},
  {name:"Ayesha Malik", group:"A-", city:"Quetta", contact:"03561234567"},
  {name:"Hassan Tariq", group:"B-", city:"Multan", contact:"03671234567"},
  {name:"Zainab Khan", group:"AB+", city:"Karachi", contact:"03781234567"},
  {name:"Bilal Ahmed", group:"O-", city:"Lahore", contact:"03891234567"},
  {name:"Fatima khan", group:"A+", city:"Islamabad", contact:"03901234567"}
];

// 2️⃣ Save donors
function saveToStorage(){
  localStorage.setItem("donors", JSON.stringify(donors));
}

// 3️⃣ Display donors
function displayDonors(data){
  const table = document.querySelector("#donorTable tbody");
  table.innerHTML = "";

  data.forEach(donor => {
    const row = document.createElement("tr");

    if(donor.group.includes("-")){
      row.classList.add("rare"); // optional highlight rare
    }

    row.innerHTML = `
      <td>${donor.name}</td>
      <td>${donor.group}</td>
      <td>${donor.city}</td>
      <td>${donor.contact}</td>
      <td></td> <!-- No Delete -->
    `;

    table.appendChild(row);
  });

  updateStats();
}

// 4️⃣ Filter donors
function filterDonors(){
  const blood = document.getElementById("bloodFilter").value;
  const city = document.getElementById("citySearch").value.toLowerCase();

  const filtered = donors.filter(donor => {
    return (blood === "" || donor.group === blood) &&
           (city === "" || donor.city.toLowerCase().includes(city));
  });

  displayDonors(filtered);
}

// 5️⃣ Update stats
function updateStats(){
  document.getElementById("totalDonors").innerText = donors.length;
  const rareCount = donors.filter(d => d.group.includes("-")).length;
  document.getElementById("rareDonors").innerText = rareCount;
}

// 6️⃣ Add new donor
document.getElementById("donorForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("dName").value.trim();
  const group = document.getElementById("dGroup").value;
  const city = document.getElementById("dCity").value.trim();
  const contact = document.getElementById("dContact").value.trim();

  if(!/^[0-9]{11}$/.test(contact)){
    alert("Phone number must be 11 digits!");
    return;
  }

  const newDonor = {name, group, city, contact};
  donors.push(newDonor);
  saveToStorage();
  displayDonors(donors);
  this.reset();
});

// 7️⃣ Initialize page
window.onload = function(){
  displayDonors(donors);
};