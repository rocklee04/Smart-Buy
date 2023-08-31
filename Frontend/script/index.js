// *************************** UserName ****************************
const username = document.getElementById("username");
const name = localStorage.getItem("name")
let token = localStorage.getItem("token");
// user.innerText = "Hello," + "\n" + name;

// ******************************** Cross Button ************************************
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.querySelector("body");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll("#close").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);


const profileIcon = document.querySelector("#nav1 div:nth-child(3) i");
const profileLink = document.querySelector("#nav1 div:nth-child(3) a");

if (username && token) {
    user.innerText = "Hello,\n" + username;
    // Show logout button
    profileIcon.classList.remove("fa-user");
    profileIcon.classList.add("fa-user-circle");
    profileLink.href = "#";  // Modify this to your logout route or page
    profileLink.innerHTML = '<i class="fa-solid fa-sign-out"></i>';
    profileLink.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            // Make a request to the /logout route
            let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/logout";
            let response = await fetch(url, {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken: token }), // Send the access token in the body
            });

            if (response.ok) {
                // Clear user data from local storage
                localStorage.removeItem("name");
                localStorage.removeItem("token");

                // Redirect to home or login page
                window.location.href = "./index.html"; // Change this to your desired page
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.log(error.message);
        }
    });
} else {
    user.innerText = "Hello, Sign in";
    // Show signup/login links
    profileIcon.classList.remove("fa-user-circle");
    profileIcon.classList.add("fa-user");
    profileLink.href = "./html/Signup.html";
}




