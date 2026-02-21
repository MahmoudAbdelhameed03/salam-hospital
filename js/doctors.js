const SUPABASE_URL = "https://ybfdykdxlapxwunmdwds.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmR5a2R4bGFweHd1bm1kd2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTAxMzUsImV4cCI6MjA4NzE2NjEzNX0.-4Ql2ZeIN5byKIelO5d2I_kxDGdpTHJM3s2qLRnuAp8";

const doctorsRow = document.getElementById("doctorsRow");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");

let allDoctors = [];

function doctorCardTemplate(d) {
  return `
    <div class="col-lg-3 col-md-6">
      <div class="doctor-card text-center">
        <img src="${d.img}" class="img-fluid doctor-img" alt="${d.name}">
        <div class="doctor-info p-4">
          <h5 class="fw-bold">${d.name}</h5>
          <span class="doctor-role">${d.role}</span>

          <p class="doctor-desc mt-3">${d.desc}</p>

          <div class="experience-badge mb-3">
            ${d.experience}+ YEARS EXPERIENCE
          </div>

          <a href="doctor-details.html?doctorId=${d.id}" class="btn btn-info rounded-pill px-4">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  `;
}

async function loadDoctors() {
    doctorsRow.innerHTML = `<p class="text-center text-muted">Loading doctors...</p>`;

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/doctors?select=*&order=id.asc`,
      {
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`
        }
      }
    );
    const doctors = await res.json();
    allDoctors= doctors

    doctorsRow.innerHTML = doctors.map(doctorCardTemplate).join("");
  }

loadDoctors();

function filterDoctors(){
  doctorsRow.innerHTML=""
  
  const searchValue = searchInput.value.toLowerCase();
  const selectedDept = departmentFilter.value;

  const filteredDoctors = allDoctors.filter(doc =>
    doc.name.toLowerCase().includes(searchValue) &&
    (selectedDept === "" || doc.role === selectedDept)
  );

  filteredDoctors.forEach(doc => {
    doctorsRow.innerHTML += doctorCardTemplate(doc);
  });

  if (filteredDoctors.length === 0) {
    doctorsRow.innerHTML = "<p class='text-center'>No doctors found</p>";
  }
}
searchInput.addEventListener("input", filterDoctors);

departmentFilter.addEventListener("change", () => {
  filterDoctors();
});
