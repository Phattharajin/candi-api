// Add Google Fonts dynamically (Mitr font)
const fontLink1 = document.createElement("link");
fontLink1.href = "https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap";
fontLink1.rel = "stylesheet";
document.head.appendChild(fontLink1);

// Add preconnect to Google Fonts and Google Fonts Static
const preconnect1 = document.createElement("link");
preconnect1.rel = "preconnect";
preconnect1.href = "https://fonts.googleapis.com";
document.head.appendChild(preconnect1);

const preconnect2 = document.createElement("link");
preconnect2.rel = "preconnect";
preconnect2.href = "https://fonts.gstatic.com";
preconnect2.setAttribute("crossorigin", "");
document.head.appendChild(preconnect2);

// Create the header structure for admin and committee
const headerHTML = `
<header>
  <div class="container-fluid p-4" style="background-color: #8B0000; display: flex; align-items: center; justify-content: space-between;">
    <!-- Left Side: Logo and University Name -->
    <div style="display: flex; align-items: center;" onclick="goToHomePage()">
      <img src="logo.png" style="width: 55px; height: 95px; margin-right: 10px;" alt="Logo">
      <div>
        <h3 class="text-white ms-4" style="font-family: 'Mitr', sans-serif; font-weight: 200; margin: 0;">มหาวิทยาลัยแม่ฟ้าหลวง</h3>
        <h3 class="text-white ms-4" style="font-family: 'Mitr', sans-serif; font-weight: 200; margin: 0;">Mae Fah Luang University</h3>
      </div>
    </div>

    <!-- Right Side: Profile Username and Logout -->
    <div style="display: flex; align-items: center; gap: 20px;">
      <div style="color: rgba(255, 255, 255, 0.7); display: flex; align-items: center;">
        <i class="fa fa-user-circle" style="font-size: 36px; margin-right: 10px;"></i>
        <div>
          <h6 id="username" style="font-family: 'Mitr', sans-serif; font-weight: 200; margin: 0;"></h6>
        </div>
      </div>

      <!-- Log Out Button -->
      <button id="logoutButton" 
        style="background-color: #F6D072; color: #8B0000; font-family: 'Mitr', sans-serif; font-weight: 200; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" 
        onclick="logout()">
        Log Out
      </button>
    </div>
  </div>
</header>
`;

// Append header to DOM
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  fetchStaffUser();
});

// Redirect to correct home page based on role
async function goToHomePage() {
  try {
    const response = await fetch("/staff-info");
    const data = await response.json();

    if (response.ok) {
      if (data.role === "admin") {
        window.location.href = "/admin_home";
      } else if (data.role === "committee") {
        window.location.href = "/committee_home";
      } else {
        window.location.href = "/home";
      }
    } else {
      window.location.href = "/loginstaff";
    }
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "/loginstaff";
  }
}

// Logout function
function logout() {
  fetch("/logout", { method: "POST" }).then(() => {
    localStorage.removeItem("token");
    window.location.href = "/loginstaff";
  });
}

async function fetchStaffUser() {
  try {
    const response = await fetch("/staff-info"); // correct route
    const data = await response.json();

    if (response.ok) {
      document.getElementById("username").textContent = data.username || "Unknown";
    } else {
      console.error("Failed to fetch user:", data.error);
    }
  } catch (error) {
    console.error("Error fetching staff info:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchStaffUser(); // Fetch and display staff username
});
