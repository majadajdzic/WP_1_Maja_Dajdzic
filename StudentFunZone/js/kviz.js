function checkAnswers() {
    let score = 0;

    const answers = {
        q1: "a",
        q2: ["a", "b", "c"],
        q3: "b",
        q4: ["a", "b", "d"],
        q5: "b"
    };

    if(document.querySelector('input[name="q1"]:checked')?.value === answers.q1) score++;

    const q2Checked = Array.from(document.querySelectorAll('input[name="q2"]:checked')).map(el => el.value).sort();
    if(JSON.stringify(q2Checked) === JSON.stringify(answers.q2)) score++;

    if(document.querySelector('input[name="q3"]:checked')?.value === answers.q3) score++;

    const q4Checked = Array.from(document.querySelectorAll('input[name="q4"]:checked')).map(el => el.value).sort();
    if(JSON.stringify(q4Checked) === JSON.stringify(answers.q4)) score++;

    if(document.querySelector('input[name="q5"]:checked')?.value === answers.q5) score++;

    document.getElementById("result").textContent = `Osvojili ste ${score} od 5 bodova!`;
}

const emailModal = document.createElement("div");
emailModal.id = "emailModal";
emailModal.style.display = "none";
emailModal.style.position = "fixed";
emailModal.style.top = "0";
emailModal.style.left = "0";
emailModal.style.width = "100%";
emailModal.style.height = "100%";
emailModal.style.backgroundColor = "rgba(0,0,0,0.5)";
emailModal.style.justifyContent = "center";
emailModal.style.alignItems = "center";
emailModal.style.zIndex = "1000";
emailModal.innerHTML = `
  <div style="background:white; padding:20px; border-radius:10px; max-width:300px; width:80%;">
    <h3>Pošalji rezultat e-mail</h3>
    <br>
    <input type="email" id="emailInput" placeholder="Unesite vašu email adresu..." style="width:100%; padding:5px; margin-bottom:10px;" />
    <div style="display:flex; justify-content:space-between;">
      <button id="emailSendBtn">Pošalji</button>
      <button id="emailCancelBtn">Poništi</button>
    </div>
  </div>
`;
document.body.appendChild(emailModal);

const emailInput = document.getElementById("emailInput");
const emailSendBtn = document.getElementById("emailSendBtn");
const emailCancelBtn = document.getElementById("emailCancelBtn");

document.getElementById('emailResultBtn').addEventListener('click', () => {
    emailInput.value = "";
    emailModal.style.display = "flex";
    emailInput.focus();
});

emailCancelBtn.addEventListener("click", () => {
    emailModal.style.display = "none";
});

emailSendBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        alert("Molimo unesite email adresu!");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Unesite ispravnu email adresu!");
        return;
    }

    const resultText = document.getElementById("result").textContent || "Niste provjerili rezultat.";
    const mailto = `mailto:${email}?subject=${encodeURIComponent('Rezultat kviza')}&body=${encodeURIComponent(resultText)}`;
    window.location.href = mailto;

    emailModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target === emailModal){
        emailModal.style.display = "none";
    }
});
