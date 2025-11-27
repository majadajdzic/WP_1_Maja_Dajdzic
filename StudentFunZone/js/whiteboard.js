const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const eraserBtn = document.getElementById('eraserBtn');

let drawing = false;
let currentColor = colorPicker.value;
let isErasing = false;

function startDrawing(e) {
  drawing = true;
  draw(e);
}   

function endDraw() {
    drawing = false;    
    ctx.beginPath();
}   

function draw(e) {
    if (!drawing) return;       

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height; 

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);   

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;        

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#FFFFFF' : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', (e) => {
    draw(e);
    e.preventDefault(); 
});

colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
    isErasing = false;
});

eraserBtn.addEventListener("click", () => {
    isErasing = !isErasing;
    eraserBtn.textContent = isErasing ? "Piši" : "Briši";
});

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", () => {
    const dataUrl = canvas.toDataURL('image/png');
    loadHtml2pdf(()=>{
        const img = new Image();
        img.src = dataUrl;
        img.style.maxWidth = '100%';
        const wrapper = document.createElement('div');
        wrapper.appendChild(img);
        html2pdf().set({margin:10, filename:'whiteboard.pdf', html2canvas:{scale:2}}).from(wrapper).save();
    });
});

function loadHtml2pdf(cb){
    if(typeof html2pdf !== 'undefined') return cb();
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload = cb;
    document.body.appendChild(s);
}

const emailModal = document.getElementById("emailModal");
const emailBtn = document.getElementById("emailBtn");
const emailSendBtn = document.getElementById("emailSendBtn");
const emailCancelBtn = document.getElementById("emailCancelBtn");
const emailInput = document.getElementById("emailInput");

emailBtn.addEventListener("click", () => {
    emailModal.style.display = "block";
    emailInput.value = "";
    emailInput.focus();
});

emailCancelBtn.addEventListener("click", () => {
    emailModal.style.display = "none";
});

emailSendBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Unesite ispravnu email adresu!");
        return;
    }

    const subject = encodeURIComponent("Whiteboard export");
    const body = encodeURIComponent("Interaktivni whiteboard export.\n\nPriložite PDF koji ste ranije snimili.");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    emailModal.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target === emailModal) {
        emailModal.style.display = "none";
    }
});
