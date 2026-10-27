const form = document.getElementById("contactForm");


form.addEventListener("submit", function(event) {
    event.preventDefault();


    alert("Thank you for contacting Travel2U Car Insurance!");


    form.reset();
});

