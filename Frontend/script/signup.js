
const onSignup = document.getElementById("Signupbtn");

//add event listener on signup button
onSignup.addEventListener("click", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  };

  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  try {

    if (pattern.test(payload.email)) {
      let url = "https://dark-red-hippopotamus-toga.cyclic.app/user/signup";

      let responce = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      let res = await responce.json();
      localStorage.setItem("otp", res.OTP);
      alert(` OTP send ${payload.email}`);
      window.location.href = "../html/OTP.html";
    } else {
        alert("Invalid email address.");
    }
  } catch (error) {
    console.log(error.message);
  }
});
