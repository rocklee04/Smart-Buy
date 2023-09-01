// Include the SweetAlert library in your HTML

let cartData = JSON.parse(localStorage.getItem("cart-data"));
let total = document.getElementById("total");
let totalPrice = localStorage.getItem("totalPrice");
total.innerText = ` ₹ ${totalPrice}`;
let form = document.querySelector("form");

let btn = document.getElementById("check");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateForm()) {
        localStorage.removeItem("cart-data");
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Your Payment is successful!`,
          }).then(() => {
            window.location.href = "../index.html";
        });
    }
});

function validateForm() {
    // Get references to input fields
    let fname = document.getElementById("fname");
    let email = document.getElementById("email");
    let adr = document.getElementById("adr");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let zip = document.getElementById("zip");
    let cname = document.getElementById("cname");
    let ccnum = document.getElementById("ccnum");
    let expmonth = document.getElementById("expmonth");
    let expyear = document.getElementById("expyear");
    let cvv = document.getElementById("cvv");

    // Regular expressions for validation
    let emailRegex = /^[^\s@]+@gmail\.com$/;
    let zipRegex = /^\d{6}$/;
    let ccnumRegex = /^\d{16}$/;
    let expMonthRegex = /^(0[1-9]|1[0-2])$/;
    let expYearRegex = /^\d{4}$/;
    let cvvRegex = /^\d{3}$/;

    // Validation checks
    if (fname.value === "") {
        show("Full Name field is required.");
        return false;
    }

    if (!emailRegex.test(email.value)) {
        show("Invalid Gmail address.");
        return false;
    }

    if (adr.value === "") {
        show("Address field is required.");
        return false;
    }

    if (city.value === "") {
        show("City field is required.");
        return false;
    }

    if (state.value === "") {
        show("State field is required.");
        return false;
    }

    if (!zipRegex.test(zip.value)) {
        show("Invalid ZIP code. Must be 6 digits.");
        return false;
    }

    if (cname.value === "") {
        show("Name on Card field is required.");
        return false;
    }

    if (!ccnumRegex.test(ccnum.value)) {
        show("Invalid credit card number. Must be 16 digits.");
        return false;
    }

    if (!expMonthRegex.test(expmonth.value)) {
        show("Invalid expiration month.");
        return false;
    }

    if (!expYearRegex.test(expyear.value)) {
        show("Invalid expiration year.");
        return false;
    }

    if (!cvvRegex.test(cvv.value)) {
        show("Invalid CVV. Must be 3 digits.");
        return false;
    }

    return true;
}

function show(message) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
