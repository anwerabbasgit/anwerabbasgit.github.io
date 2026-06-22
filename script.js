// ====== 1. نظام تشغيل الساعة الحية تلقائياً ======
setInterval(() => {
    const now = new Date();
    const clockEl = document.getElementById('liveClock');
    if(clockEl) clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleTimeString('ar-EG')}`;
}, 1000);

// ====== 2. نظام تغيير الوضع (Dark/Light Mode) ======
const themeToggle = document.getElementById('themeToggle');
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? '' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i> الوضع الفاتح' : '<i class="fa-solid fa-moon"></i> الوضع الداكن';
    });
}

// ====== 3. أداة حساب الـ BMI ======
function calculateBMI() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultDiv = document.getElementById('bmiResult');
    
    if(weightInput && heightInput && resultDiv) {
        const w = parseFloat(weightInput.value);
        const h = parseFloat(heightInput.value)/100;
        if(w && h) {
            const bmi = (w/(h*h)).toFixed(1);
            let status = bmi < 18.5 ? "📉 نحافة" : bmi < 24.9 ? "✅ مثالي" : bmi < 29.9 ? "⚠️ زيادة وزن" : "🚨 سمنة مفرطة";
            resultDiv.innerText = `مؤشر كتلتك: ${bmi} (${status})`;
        }
    }
}

// ====== 4. أداة تحليل النصوص ======
function analyzeText() {
    const textInput = document.getElementById('textInput');
    const charEl = document.getElementById('charCount');
    const wordEl = document.getElementById('wordCount');
    
    if(textInput && charEl && wordEl) {
        const t = textInput.value;
        charEl.innerText = t.replace(/\s/g, "").length;
        wordEl.innerText = t.trim() === "" ? 0 : t.trim().split(/\s+/).length;
    }
}

// ====== 5. أداة توليد ونسخ كلمة المرور ======
function generatePassword() {
    const c = "abcdefgHIJKLMNOP1234567890!@#$%&*"; let p = "";
    for (let i = 0; i < 14; i++) p += c.charAt(Math.floor(Math.random() * c.length));
    const resEl = document.getElementById('passwordResult');
    if(resEl) resEl.innerText = p;
}
function copyPassword() {
    const resEl = document.getElementById('passwordResult');
    if(resEl) {
        const txt = resEl.innerText;
        if(txt && txt !== "اضغط توليد...") {
            navigator.clipboard.writeText(txt);
            alert("📋 تم نسخ كلمة المرور بنجاح!");
        }
    }
}

// ====== 6. أداة تحويل العملات السريع ======
function convertCurrency() {
    const amountInput = document.getElementById('amount');
    const iqdEl = document.getElementById('iqdResult');
    const egpEl = document.getElementById('egpResult');
    
    if(amountInput && iqdEl && egpEl) {
        const usd = parseFloat(amountInput.value);
        if(usd) {
            iqdEl.innerText = (usd * 1310).toLocaleString();
            egpEl.innerText = (usd * 48.5).toFixed(2);
        } else {
            iqdEl.innerText = "0";
            egpEl.innerText = "0";
        }
    }
}

// ====== 7. أداة لوحة الرسم الاحترافية للشاشات واللمس ======
const canvas = document.getElementById('paintCanvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let drawing = false;
    function startDraw() { drawing = true; }
    function endDraw() { drawing = false; ctx.beginPath(); }
    function draw(x, y) {
        if (!drawing) return;
        ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#4361ee';
        const r = canvas.getBoundingClientRect();
        ctx.lineTo(x - r.left, y - r.top); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - r.left, y - r.top);
    }
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mousemove', (e) => draw(e.clientX, e.clientY));
    canvas.addEventListener('touchstart', (e) => { startDraw(); const t = e.touches[0]; draw(t.clientX, t.clientY); });
    canvas.addEventListener('touchend', endDraw);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); const t = e.touches[0]; draw(t.clientX, t.clientY); }, { passive: false });
}
function clearCanvas() { 
    const cv = document.getElementById('paintCanvas');
    if(cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); 
}
function downloadCanvas() {
    const cv = document.getElementById('paintCanvas');
    if(cv) {
        try {
            const dataUrl = cv.toDataURL('image/png');
            const lnk = document.createElement('a');
            lnk.download = 'signature.png';
            lnk.href = dataUrl;
            document.body.appendChild(lnk);
            lnk.click();
            document.body.removeChild(lnk);
        } catch (e) {
            alert("حدث خطأ أثناء تحميل الرسمة، يرجى المحاولة مرة أخرى.");
        }
    }
}

// ====== 8. مفكرة الملاحظات والمهام الذكية ======
function loadNotes() {
    const saved = localStorage.getItem('userNotes');
    const txtArea = document.getElementById('notesArea');
    if(saved && txtArea) txtArea.value = saved;
}
function saveNotes() {
    const txtArea = document.getElementById('notesArea');
    if(txtArea) {
        const txt = txtArea.value;
        localStorage.setItem('userNotes', txt);
        const status = document.getElementById('saveStatus');
        if(status) {
            status.innerText = "✅ تم الحفظ تلقائياً في ذاكرة المتصفح الآمنة!";
            setTimeout(() => status.innerText = "", 3000);
        }
    }
}

// ====== 9. محول التوقيت العالمي الفوري ======
function convertGlobalTime() {
    const timeInput = document.getElementById('localTimeInput');
    const resultDiv = document.getElementById('timeZoneResults');
    if(timeInput && resultDiv) {
        const timeVal = timeInput.value;
        if(!timeVal) return;
        const [hours, minutes] = timeVal.split(':');
        const d = new Date(); d.setHours(hours); d.setMinutes(minutes);
        const fmt = (zone) => d.toLocaleTimeString('ar-EG', { timeZone: zone, hour: '2-digit', minute: '2-digit' });
        resultDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; font-size: 14px;">
                <div style="padding: 10px; background: var(--bg-color); border-radius: 8px;">🕋 مكة: <b>${fmt('Asia/Riyadh')}</b></div>
                <div style="padding: 10px; background: var(--bg-color); border-radius: 8px;">🇬🇧 لندن: <b>${fmt('Europe/London')}</b></div>
                <div style="padding: 10px; background: var(--bg-color); border-radius: 8px;">🇺🇸 نيويورك: <b>${fmt('America/New_York')}</b></div>
                <div style="padding: 10px; background: var(--bg-color); border-radius: 8px;">🌐 غرينتش: <b>${fmt('UTC')}</b></div>
            </div>`;
    }
}

// ====== 10. حاسبة النسبة المئوية ======
function calculatePercentage() {
    const percentInput = document.getElementById('percentNum');
    const totalInput = document.getElementById('totalNum');
    const resultDiv = document.getElementById('percentResult');
    if(percentInput && totalInput && resultDiv) {
        const p = parseFloat(percentInput.value); const t = parseFloat(totalInput.value);
        if(!isNaN(p) && !isNaN(t) && t !== 0) {
            resultDiv.innerText = `${p}% من العدد ${t} هي: ${((p / 100) * t).toFixed(2)}`;
        }
    }
}

// ====== 11. حاسبة العمر الدقيق ======
function calculateAge() {
    const birthInput = document.getElementById('birthDateInput');
    const resultDiv = document.getElementById('ageResult');
    if(birthInput && resultDiv) {
        if(!birthInput.value) return;
        const birthDate = new Date(birthInput.value); const now = new Date();
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        if (days < 0) { months--; const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); }
        if (months < 0) { years--; months += 12; }
        const daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        resultDiv.innerHTML = `عمرك: ${years} سنة، و ${months} شهر، و ${days} يوم. <br> 📅 ولدت يوم: ${daysOfWeek[birthDate.getDay()]}`;
    }
}

// ====== 12. حاسبة السعرات والماء ======
function calculateCaloriesWater() {
    const weight = parseFloat(document.getElementById('healthWeight').value);
    const resultDiv = document.getElementById('healthResult');
    if(weight && resultDiv) {
        const water = (weight * 0.035).toFixed(1);
        const calories = Math.round(weight * 24 * 1.2);
        resultDiv.innerHTML = `💪 تحتاج يومياً حوالي: <b>${calories} سعرة حرارية</b> <br> 💧 وكمية ماء لا تقل عن: <b>${water} لتر</b>`;
    }
}

// ====== 13. مولد ومحول الألوان العشوائية ======
function generateRandomColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const box = document.getElementById('colorBox');
    const code = document.getElementById('colorCode');
    if(box && code) {
        box.style.backgroundColor = randomColor;
        code.innerText = `HEX: ${randomColor}`;
    }
}

// ====== 14. ميزة نظام البحث الفوري بالواجهة ======
function searchTools() {
    const query = document.getElementById('toolSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        if(title.includes(query) || desc.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// ====== 15. نظام التشغيل الموحد والذكي فور تحميل الصفحة ======
document.addEventListener('DOMContentLoaded', () => {
