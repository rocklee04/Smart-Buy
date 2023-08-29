// *************************** UserName ****************************
const user = document.getElementById("username");
const name = localStorage.getItem("name") || "Login First";
user.innerText = "Hello," + "\n" + name;

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


  const signOutLink = document.getElementById('signOutLink');

  // Attach click event handler to the "Sign Out" link
  signOutLink.addEventListener('click', async () => {
      const accessToken = localStorage.getItem('token'); // to get token from localStorage

      try {
          const response = await fetch('https://dark-red-hippopotamus-toga.cyclic.app/user/logout', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ accessToken })
          });

          const data = await response.json();
          if (response.ok) {
              // Successfully logged out
              alert(data.msg)
              localStorage.removeItem('name')
              // Optionally, perform any other actions you want after logging out
          } else {
              // Logout failed
              alert(data.msg)
          }
      } catch (error) {
          console.log(error)
      }
  });





