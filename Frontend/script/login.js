// Login button event listener
let login = document.getElementById("loginbtn");
login.addEventListener("click", async (e) => {
  e.preventDefault();

  const payload = {
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  };
  localStorage.setItem("name", payload.email);

  try {
    let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/login";

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    let res = await response.json();
    console.log(res)
    localStorage.setItem("token", res.accesstoken);

    // Use SweetAlert for success message
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `${payload.email} has successfully logged in.`,
    }).then(() => {
      window.location.href = "../index.html";
    });

  } catch (error) {
    console.log(error.message);
    // Use SweetAlert for error message
    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: 'Login failed. Please check your credentials and try again.',
    });
  }
});

// Google authentication button event listener
let google = document.getElementById("authgoogle");
google.addEventListener("click", (e) => {
  e.preventDefault();

  let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/auth/google";

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.accesstoken);

      // Use SweetAlert for success message
      Swal.fire({
        icon: 'success',
        title: 'Google Authentication Successful',
        text: 'You have successfully authenticated using Google.',
      });

    })
    .catch((err) => {
      console.log(err);
      // Use SweetAlert for error message
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'Google authentication failed. Please try again later.',
      });
    });
});


// Get the forget password link element
const forgetPassLink = document.getElementById("forgetpass");

// Add event listener to the forget password link
forgetPassLink.addEventListener("click", async (e) => {
  e.preventDefault();

  // Show an input box to enter email using SweetAlert
  const { value: email } = await Swal.fire({
    title: 'Enter Your Email',
    input: 'email',
    inputPlaceholder: 'Enter your email address',
    showCancelButton: true,
    confirmButtonText: 'Submit',
  });

  // If email is provided
  if (email) {
    try {
      // Send a request to the /forgotPassword route
      const response = await fetch("https://dark-red-hippopotamus-toga.cyclic.app/user/forgotPassword", {
        method: "PATCH",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Show success message if the request was successful
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Email Sent',
          text: `An email with instructions to reset your password has been sent to ${email}.`,
        });
      } else {
        // Show error message if the request failed
        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: 'Failed to send password reset email. Please try again later.',
        });
      }
    } catch (error) {
      console.log(error.message);
      // Show error message if an error occurred
      Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: 'Failed to send password reset email. Please try again later.',
      });
    }
  }
});
