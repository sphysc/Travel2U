const form = document.getElementById("claim-form");


if (form) {
  const steps = document.querySelectorAll(".form-step");
  const progressItems = document.querySelectorAll(".progress-step");
  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");


  let currentStep = 0;


  function showStep(number) {
    currentStep = number;


    for (let i = 0; i < steps.length; i++) {
      steps[i].classList.remove("active");
      progressItems[i].classList.remove("active", "done");


      if (i === currentStep) {
        steps[i].classList.add("active");
        progressItems[i].classList.add("active");
      } else if (i < currentStep) {
        progressItems[i].classList.add("done");
      }
    }


    backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
    nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";


    if (currentStep === steps.length - 1) {
      fillReview();
    }


    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  function stepIsValid() {
    const fields = steps[currentStep].querySelectorAll("input, select, textarea");


    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }


  function fillReview() {
    const table = document.getElementById("review-table");
    table.innerHTML = "";


    const fields = document.querySelectorAll("[data-label]");
    for (const field of fields) {
      table.innerHTML += "<tr><td>" + field.dataset.label + "</td><td>" + field.value + "</td></tr>";
    }


    const files = document.getElementById("evidence").files;
    let fileList = [];
    for (const file of files) {
      fileList.push(file.name);
    }
    table.innerHTML += "<tr><td>Uploaded Files</td><td>" + fileList.join("<br>") + "</td></tr>";
  }


  nextBtn.addEventListener("click", function () {
    if (stepIsValid()) {
      showStep(currentStep + 1);
    }
  });


  backBtn.addEventListener("click", function () {
    showStep(currentStep - 1);
  });


  document.getElementById("evidence").addEventListener("change", function () {
    const list = document.getElementById("file-names");
    list.innerHTML = "";
    for (const file of this.files) {
      list.innerHTML += "<li>" + file.name + "</li>";
    }
  });


  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!stepIsValid()) return;


    const number = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("reference").textContent = "CLM-" + number;


    form.style.display = "none";
    document.querySelector(".progress").style.display = "none";
    document.getElementById("success").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  showStep(0);
}


const faqItems = document.querySelectorAll(".faq-item");


if (faqItems.length > 0) {


  for (const item of faqItems) {
    const question = item.querySelector(".faq-question");


    question.addEventListener("click", function () {
      const wasOpen = item.classList.contains("open");


      for (const other of faqItems) {
        other.classList.remove("open");
      }


      if (!wasOpen) {
        item.classList.add("open");
      }
    });
  }


  const searchBox = document.getElementById("faq-search");
  const noResults = document.getElementById("no-results");


  searchBox.addEventListener("input", function () {
    const text = searchBox.value.toLowerCase();
    let found = 0;


    for (const item of faqItems) {
      const content = item.textContent.toLowerCase();


      if (content.includes(text)) {
        item.style.display = "block";
        found++;
      } else {
        item.style.display = "none";
      }
    }


    noResults.style.display = found === 0 ? "block" : "none";
  });
}


const vehicleForm = document.getElementById("vehicle-form");


if (vehicleForm) {


  const yearSelect = document.getElementById("year");
  const thisYear = new Date().getFullYear();


  for (let year = thisYear + 1; year >= 1990; year--) {
    yearSelect.innerHTML += "<option>" + year + "</option>";
  }


  vehicleForm.addEventListener("submit", function (event) {
    event.preventDefault();


    const vehicle = {
      year: document.getElementById("year").value,
      make: document.getElementById("make").value,
      model: document.getElementById("model").value,
      plate: document.getElementById("plate").value,
      vin: document.getElementById("vin").value.toUpperCase(),
      use: document.getElementById("use").value
    };


    sessionStorage.setItem("vehicle", JSON.stringify(vehicle));


    window.location.href = "plan-selection.html";
  });
}


const planCards = document.querySelectorAll(".plan-card");


if (planCards.length > 0) {
  const summaryBox = document.getElementById("selection-summary");
  const successBox = document.getElementById("quote-success");
  const savedVehicle = sessionStorage.getItem("vehicle");
  let vehicleText = "";


  if (savedVehicle) {
    const vehicle = JSON.parse(savedVehicle);
    vehicleText = vehicle.year + " " + vehicle.make + " " + vehicle.model + " (" + vehicle.plate + ")";


    document.getElementById("vehicle-text").textContent = vehicleText;
    document.getElementById("vehicle-summary").style.display = "block";
    document.getElementById("no-vehicle").style.display = "none";
  }


  const chooseButtons = document.querySelectorAll(".choose-btn");


  for (const button of chooseButtons) {
    button.addEventListener("click", function () {


      for (const card of planCards) {
        card.classList.remove("selected");
      }
      button.closest(".plan-card").classList.add("selected");


      document.getElementById("chosen-plan").textContent = button.dataset.plan;
      document.getElementById("chosen-price").textContent = button.dataset.price;
      document.getElementById("chosen-vehicle").textContent =
        vehicleText ? "Vehicle: " + vehicleText : "";


      summaryBox.style.display = "block";
      summaryBox.scrollIntoView({ behavior: "smooth" });
    });
  }


  document.getElementById("change-btn").addEventListener("click", function () {
    summaryBox.style.display = "none";
    for (const card of planCards) {
      card.classList.remove("selected");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  document.getElementById("confirm-btn").addEventListener("click", function () {
    const number = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("quote-reference").textContent = "QTE-" + number;


    summaryBox.style.display = "none";
    document.querySelector(".plans").style.display = "none";
    successBox.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

