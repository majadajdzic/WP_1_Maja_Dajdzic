const board = document.getElementById("board");
const addNoteBtn = document.getElementById("addNoteBtn");
const addImageBtn = document.getElementById("addImageBtn");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

const emailModal = document.getElementById("emailModal");
const emailBtn = document.getElementById("emailBtn");
const emailSendBtn = document.getElementById("emailSendBtn");
const emailCancelBtn = document.getElementById("emailCancelBtn");
const emailInput = document.getElementById("emailInput");

const colors = ["color1","color2","color3","color4","color5","color6"];
const sampleImages = ["../slike/slika1.png","../slike/slika2.png","../slike/slika3.png","../slike/slika4.png"];
const sampleQuotes = [
  "„Svaka dovoljno napredna tehnologija jednaka je magiji.“ – Arthur C. Clarke",
  "„Tehnologija je riječ koja opisuje nešto što još ne funkcionira.“ – Douglas Adams",
  "„Ne osnivate zajednice. Zajednice već postoje. Pitanje je kako im možete pomoći da budu bolje.“ – Mark Zuckerberg"
];

function makeDraggable(el){
  let offsetX, offsetY;
  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.className = "delete-btn";
  el.appendChild(delBtn);

  delBtn.addEventListener("click", e => { e.stopPropagation(); el.remove(); });
  el.addEventListener("mousedown", dragStart);

  function dragStart(e){
    if(e.target===delBtn) return;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
  }
  function drag(e){ e.preventDefault(); el.style.left = e.clientX - offsetX + "px"; el.style.top = e.clientY - offsetY + "px"; }
  function dragEnd(){ document.removeEventListener("mousemove", drag); document.removeEventListener("mouseup", dragEnd); }
}

addNoteBtn.addEventListener("click", () => {
  const note = document.createElement("div");
  note.className = "note " + colors[Math.floor(Math.random()*colors.length)];
  note.contentEditable = "true";
  note.style.left = Math.random()*500+"px";
  note.style.top = Math.random()*300+"px";
  note.textContent="Napiši nešto...";
  makeDraggable(note);
  board.appendChild(note);
});

addImageBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className="pinned-img";
  div.style.left=Math.random()*400+"px";
  div.style.top=Math.random()*250+"px";
  const img=document.createElement("img");
  img.src=sampleImages[Math.floor(Math.random()*sampleImages.length)];
  div.appendChild(img);
  makeDraggable(div);
  board.appendChild(div);
});

addQuoteBtn.addEventListener("click", () => {
  const q=document.createElement("div");
  q.className="quote";
  q.textContent=sampleQuotes[Math.floor(Math.random()*sampleQuotes.length)];
  q.style.left=Math.random()*400+"px";
  q.style.top=Math.random()*250+"px";
  q.contentEditable="true";
  makeDraggable(q);
  board.appendChild(q);
});

saveBtn.addEventListener("click", ()=>{
  html2pdf().set({margin:10, filename:'vision_board.pdf', html2canvas:{scale:2}}).from(board).save();
});

clearBtn.addEventListener("click", ()=>{
  if(confirm("Očistiti cijelu ploču?")){
    board.innerHTML="";
    localStorage.removeItem("visionBoardItems");
  }
});

emailBtn.addEventListener("click", ()=>{
  emailModal.style.display="block";
  emailInput.value="";
  emailInput.focus();
});
emailCancelBtn.addEventListener("click", ()=>{
  emailModal.style.display="none";
});
emailSendBtn.addEventListener("click", ()=>{
  const email=emailInput.value.trim();
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    alert("Unesite ispravnu email adresu!");
    return;
  }
  const subject=encodeURIComponent("Vision board export");
  const body=encodeURIComponent("Vaš vision board je spreman!\n\nPriložite PDF koji ste izvezli.");

  window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;
  emailModal.style.display="none";
});
window.addEventListener("click", e=>{
  if(e.target===emailModal) emailModal.style.display="none";
});
