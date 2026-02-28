const form = document.getElementById("emergencyForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const blood = document.getElementById("bloodType").value;
  const phone = document.getElementById("phone").value.trim();
  const hospital = document.getElementById("hospital").value.trim();

  // Validation
  if(name === "" || blood === "" || phone === "" || hospital === ""){
    showMessage("All fields are required!", "red");
    return;
  }

  if(!/^[0-9]{11}$/.test(phone)){
    showMessage("Phone number must be 11 digits only!", "red");
    return;
  }

  // Save request
  let requests = JSON.parse(localStorage.getItem("requests")) || [];

  requests.push({
    name,
    blood,
    phone,
    hospital,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("requests", JSON.stringify(requests));

  showMessage("Emergency request submitted successfully!", "green");

  form.reset();
});

function showMessage(text, color){
  message.innerText = text;
  message.style.color = color;
}