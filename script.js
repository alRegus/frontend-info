const leftElem = document.querySelectorAll(".left ul li");
const rightElem = document.querySelectorAll(".right div");
const form = document.querySelector("form");
const name = document.querySelector("#name");

const left = Array.from(leftElem);
const right = Array.from(rightElem);

left.map((elem) => {
  elem.addEventListener("click", (e) => {
    let val = e.target.id;

    if (
      right.map((elem) => {
        elem.classList.contains("show");
      })
    ) {
      right.map((elem) => {
        elem.classList.remove("show");
      });
    }

    document.querySelector(`.right-elem-${val}`).classList.add("show");

    if (window.innerWidth <= 650) {
      left.map((elem) => {
        elem.classList.remove("z-index");
      });

      e.target.classList.add("z-index");
    } else {
      left.map((elem) => {
        elem.classList.remove("z-index");
      });

      e.target.classList.add("z-index");
    }
  });
});

const nameInput = document.querySelector("#name");
nameInput.addEventListener("change", () => {
  if (nameInput.value.length <= 3) {
    document.querySelector(".error").textContent =
      "Name needs to be more than 3 characters";
  } else {
    document.querySelector(".error").textContent = null;
  }
});

function quizResult(e) {
  e.preventDefault();

  let i = 0;
  let msg;

  const quizMsg = document.querySelector(".quiz-msg");
  const name = document.querySelector("#name").value;

  if (name.length <= 3) {
    msg = `Cant show result without a proper name`;
    quizMsg.textContent = msg;
  } else {
    const htmlElem = document.querySelectorAll('[name="html_element"]');
    htmlElem.forEach((radio) => {
      if (radio.checked) {
        const checkedRadio = radio.value;
        if (checkedRadio == "script") i++;
      }
    });

    const select = document.querySelector("select").value;
    if (select == "myFunction") i++;

    const placeJs = document.querySelectorAll('[name="place_js"]');
    placeJs.forEach((elem) => {
      if (elem.checked) {
        const checkResult = elem.value;
        if (checkResult == "head") i += 0.5;
        if (checkResult == "body") i += 0.5;
        if (checkResult == "div") i -= 0.5;
        if (checkResult == "section") i -= 0.5;
      }
    });

    const operator = document.getElementById("operator").value;
    if (operator == "=") i++;

    if (i > 2) msg = `Congratulations ${name}! You got correct ${i} out of 4`;
    if (i <= 2) msg = `Too bad ${name}! You only got correct ${i} out of 4`;
    if (i == 0) msg = `You answered all questions wrong ${name}`;

    quizMsg.textContent = msg;
    form.reset();
  }
}

form.addEventListener("submit", quizResult);
