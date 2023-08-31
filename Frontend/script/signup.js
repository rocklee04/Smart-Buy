const onSignup = document.getElementById("Signupbtn");

// Add event listener on signup button
onSignup.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;



  // Validate username
  if(!name) {
    showError("Username is required")
    return;
  }
  if (!isValidUsername(name)) {
    showError("Invalid username. Username must have at least 3 characters.");
    return;
  }

  // Validate email format
  if(!email) {
    showError("Email is required");
    return;  
  }
  if (!isValidEmail(email)) {
    showError("Invalid email address.");
    return;
  }

  // Validate strong password
  if(!password) {
    showError("Password is required")
    return;
  }
  if (!isStrongPassword(password)) {
    showError("Weak password. Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.");
    return;
  }

  const payload = {
    name,
    email,
    password,
  };

  try {
    let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/signup";

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await response.json();
    localStorage.setItem("otp", res.OTP);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: `OTP sent to ${payload.email}`,
    }).then(() => {
      window.location.href = "../html/OTP.html";
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Helper function to show error message using SweetAlert
function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
}

// Helper function to check valid username format
function isValidUsername(name) {
  return (name.length >= 4);
}

// Helper function to check valid email format
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

// Helper function to check strong password
function isStrongPassword(password) {
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /\d/.test(password) &&
         /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
}
