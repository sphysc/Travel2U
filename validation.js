const form = document.getElementById("form")
const firstname_input = document.getElementById("firstname-input")
const email_input = document.getElementById("email-input")
const password_input = document.getElementById("password-input")
const confirm_password_input = document.getElementById("confirm-input")
const error = document.getElementById("error")
form.addEventListener('submit', (e)=>{
e.preventDefault()
    if (confirm_password_input && password_input.value !== confirm_password_input.value){
        error.textContent="Passwords do not match."
        return
    }
    error.textContent=""
    window.location.href = "myaccount.html";
})