function generateRandomNumbers() {
        let nums = [];
        while (nums.length < 25) {
            let n = Math.floor(Math.random() * 99) + 1;
            if (!nums.includes(n)) nums.push(n);
        }
        return nums;
    }
    function renderBingoTable(nums) {
        const table = document.getElementById('bingoTable');
        table.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                const td = document.createElement('td');
                td.textContent = nums[i * 5 + j];
                td.className = 'bingo-cell';
                td.onclick = function() {
                    td.classList.toggle('marked');
                    checkBingo();
                };
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
    function getMarkedMatrix() {
        const cells = document.querySelectorAll('.bingo-cell');
        let matrix = [];
        for (let i = 0; i < 5; i++) {
            let row = [];
            for (let j = 0; j < 5; j++) {
                row.push(cells[i * 5 + j].classList.contains('marked'));
            }
            matrix.push(row);
        }
        return matrix;
    }
    function checkBingo() {
        const m = getMarkedMatrix();
        
        for (let i = 0; i < 5; i++) {
            if (m[i].every(Boolean)) return showBingoPopup();
        }
       
        for (let j = 0; j < 5; j++) {
            let col = [];
            for (let i = 0; i < 5; i++) col.push(m[i][j]);
            if (col.every(Boolean)) return showBingoPopup();
        }
        
        if ([0,1,2,3,4].every(i => m[i][i])) return showBingoPopup();
        if ([0,1,2,3,4].every(i => m[i][4-i])) return showBingoPopup();
    }
    function showBingoPopup() {
        document.getElementById('bingoPopup').style.display = 'flex';
    }
    function hideBingoPopup() {
        document.getElementById('bingoPopup').style.display = 'none';
        startNewGame();
    }
    function startNewGame() {
        const nums = generateRandomNumbers();
        renderBingoTable(nums);
    }
    document.getElementById('randomBtn').onclick = startNewGame;
    document.getElementById('okBtn').onclick = hideBingoPopup;
    window.onload = startNewGame;
    function generatePDF() {
        document.getElementById('bingoPopup').style.display = 'none';
        document.activeElement.blur();
        if (typeof html2pdf === 'undefined') {
            alert('PDF funkcija nije dostupna. Provjeri internet vezu ili link na html2pdf.');
            return;
        }
        const element = document.getElementById('bingo');
        const options = {
            margin: 1,
            filename: 'Bingo.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(options).from(element).save();
    }