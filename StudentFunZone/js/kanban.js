const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});
document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});
document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});
function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}
document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (dragging) list.appendChild(dragging);
    });
});

const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});

document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === clearModal) {
        clearModal.style.display = "none";
    }
});

document.getElementById("saveBoardBtn").addEventListener("click", () => {
    loadHtml2pdf(() => {
        const el = document.querySelector('.board');
        html2pdf().set({margin:10, filename:'kanban_board.pdf', html2canvas:{scale:2}}).from(el).save();
    });
});

document.getElementById('emailBoardBtn').addEventListener('click', ()=> {
    const emailModal = document.getElementById("emailModal");
    emailModal.style.display = "block";
    const emailInput = document.getElementById("emailInput");
    emailInput.value = "";
    emailInput.focus();
});

function saveAsImage(){
    html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

function loadHtml2pdf(cb){
    if(typeof html2pdf !== 'undefined') return cb();
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload = cb;
    document.body.appendChild(s);
}

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const emailModal = document.getElementById("emailModal");
const emailInput = document.getElementById("emailInput");
const emailSendBtn = document.getElementById("emailSendBtn");
const emailCancelBtn = document.getElementById("emailCancelBtn");

emailSendBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        alert("Unesite e-mail adresu!");
        emailInput.focus();
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Unesite ispravnu e-mail adresu!");
        emailInput.focus();
        return;
    }

    const lists = document.querySelectorAll('.column');
    let body = 'Kanban board export:%0D%0A%0D%0A';
    lists.forEach(col => {
        const title = col.querySelector('h2').innerText.trim();
        body += title + ':%0D%0A';
        col.querySelectorAll('.task').forEach(t => {
            body += '- ' + t.innerText.trim() + '%0D%0A';
        });
        body += '%0D%0A';
    });
    body += 'Notes: PDF export available; please attach the saved PDF to the email.';

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Kanban board export')}&body=${body}`;
    window.location.href = mailto;

    emailModal.style.display = "none";
});

emailCancelBtn.addEventListener("click", () => {
    emailModal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === emailModal) {
        emailModal.style.display = "none";
    }
});
