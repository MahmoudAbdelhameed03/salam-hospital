const APPOINTMENTS_URL = "https://ybfdykdxlapxwunmdwds.supabase.co/rest/v1/appointments";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmR5a2R4bGFweHd1bm1kd2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTAxMzUsImV4cCI6MjA4NzE2NjEzNX0.-4Ql2ZeIN5byKIelO5d2I_kxDGdpTHJM3s2qLRnuAp8";  

const tableBody = document.getElementById("appointmentsTable");

async function loadAppointments(app){
  const res = await fetch(
    `${APPOINTMENTS_URL}?select=*`,
    {
      headers:{
        apikey : API_KEY,
        Authorization : `Bearer ${API_KEY}`
      }
    }

  )

  const appointments = await res.json();
  console.log(res);
  showAppointments(appointments);
}
function showAppointments(list) {

  tableBody.innerHTML = "";

  list.forEach(app => {
    tableBody.innerHTML += `
      <tr>
        <td>${app.doctor}</td>
        <td>${app.department}</td>
        <td>${app.date}</td>
        <td>${app.status}</td>
        <td>
          <button onclick="deleteAppointment('${app.id}')" 
            class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  });

}
async function deleteAppointment(id) {

  await fetch(
    `${APPOINTMENTS_URL}?id=eq.${id}`,
    {
      method: "DELETE",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      }
    }
  );

  loadAppointments();
}
loadAppointments()