
let selectedTime = ""

document.querySelectorAll(".time-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".time-btn").forEach(btn => {
      btn.classList.remove("active")
    });
    this.classList.add("active")
    selectedTime = this.textContent
  })
});


const SUPABASE_URL = "https://ybfdykdxlapxwunmdwds.supabase.co/rest/v1/doctors";
const APPOINTMENTS_URL = "https://ybfdykdxlapxwunmdwds.supabase.co/rest/v1/appointments";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmR5a2R4bGFweHd1bm1kd2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTAxMzUsImV4cCI6MjA4NzE2NjEzNX0.-4Ql2ZeIN5byKIelO5d2I_kxDGdpTHJM3s2qLRnuAp8";

let allDoctors = [];
const doctorSelect = document.getElementById("doctorSelect");
const departmentSelect = document.getElementById("departmentSelect");

async function loadDoctors() {
  const res = await fetch(SUPABASE_URL + "?select=*", {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`
    }
  });

  allDoctors = await res.json();
}

function filteredDocsByDepartment(dept) {

  doctorSelect.innerHTML = `<option>Select Doctor</option>`;

  const filteredDoctors = allDoctors.filter(
    doc => doc.role === dept
  );

  filteredDoctors.forEach(doc => {
    doctorSelect.innerHTML += `
                <option value="${doc.name}">${doc.name}</option>
              `;
  });
}

departmentSelect.addEventListener("change", () => {
  const selectedDept = departmentSelect.value;
  filteredDocsByDepartment(selectedDept);
});


loadDoctors();

const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("appointment-date").value;
  const department = departmentSelect.value;
  const doctor = doctorSelect.value;
  const full_name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const the_data = {
    full_name,
    email,
    phone,
    department,
    doctor,
    date,
    time: selectedTime,
    status: "pending"
  };

  try {
    const res = await fetch(APPOINTMENTS_URL, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(the_data)
    });

    if (!res.ok) {
      alert("Error booking appointment");
    }
    else {
      alert(" Appointment booked successfully!");
    }

    form.reset();
    selectedTime = "";
    document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
    doctorSelect.innerHTML = `<option value="">Select Doctor</option>`;

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
});


