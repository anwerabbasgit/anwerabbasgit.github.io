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

// ====== 7. أداة لوحة الرسم الاحترافية (تدعم الحاسبة والموبايل باللمس) ======
const canvas = document.getElementById('paintCanvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let drawing = false;

    // وظيفة بدء الرسم المشتركة
    function startDraw() { drawing = true; }
    // وظيفة إنهاء الرسم المشتركة
    function endDraw() { drawing = false; ctx.beginPath(); }
    
    // وظيفة الرسم الفعلية وحساب الإحداثيات بدقة لجميع الشاشات
    function draw(x, y) {
        if (!drawing) return;
        ctx.lineWidth = 3; 
        ctx.lineCap = 'round'; 
        ctx.strokeStyle = '#4361ee';
        const r = canvas.getBoundingClientRect();
        ctx.lineTo(x - r.left, y - r.top); 
        ctx.stroke();
        ctx.beginPath(); 
        ctx.moveTo(x - r.left, y - r.top);
    }

    // --- حساسات الحاسبة (الماوس) ---
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mousemove', (e) => draw(e.clientX, e.clientY));

    // --- حساسات الموبايل (اللمس المطور) ---
    canvas.addEventListener('touchstart', (e) => {
        startDraw();
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
    });
    canvas.addEventListener('touchend', endDraw);
    canvas.addEventListener('touchmove', (e) => {
        // منع الشاشة من الاهتزاز أو النزول أثناء الرسم بالإصبع
        e.preventDefault(); 
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
    }, { passive: false });
}

function clearCanvas() { 
    const cv = document.getElementById('paintCanvas');
    if(cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); 
}
function downloadCanvas() {
    const cv = document.getElementById('paintCanvas');
    if(cv) {
        const lnk = document.createElement('a'); lnk.download = 'signature.png';
        lnk.href = cv.toDataURL(); lnk.click();
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
document.addEventListener('DOMContentLoaded', loadNotes);
