// 1. نظام تشغيل الساعة الحية تلقائياً
setInterval(() => {
    const now = new Date();
    document.getElementById('liveClock').innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleTimeString('ar-EG')}`;
}, 1000);

// 2. محرك البحث الذكي لتصفية الأدوات
function searchTools() {
    const query = document.getElementById('toolSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
        const keywords = card.getAttribute('data-keywords');
        if (keywords.includes(query)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// ====== 3. أداة لوحة الرسم الاحترافية (كمبيوتر + موبايل) ======
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// إعدادات الخط ثابتة
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.strokeStyle = '#4361ee';

// --- أحداث الكمبيوتر (الماوس) ---
canvas.addEventListener('mousedown', (e) => { drawing = true; draw(e); });
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

// --- أحداث الموبايل (اللمس) ---
canvas.addEventListener('touchstart', (e) => { 
    drawing = true; 
    draw(e.touches[0]); 
    e.preventDefault(); // تمنع الشاشة من التحرك أثناء الرسم
}, { passive: false });

canvas.addEventListener('touchend', () => { drawing = false; ctx.beginPath(); });

canvas.addEventListener('touchmove', (e) => { 
    draw(e.touches[0]); 
    e.preventDefault(); 
}, { passive: false });

// دالة الرسم المشتركة والنظيفة بدون تكرار
function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    
    // حساب الإحداثيات بدقة حسب نوع الجهاز
    const clientX = e.clientX || e.pageX;
    const clientY = e.clientY || e.pageY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
}

function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
}

// 4. بقية دوال الأدوات المستقرة (العملات، النص، الوزن)
function calculateBMI() {
    const w = parseFloat(document.getElementById('weight').value);
    const h = parseFloat(document.getElementById('height').value)/100;
    if(w && h) document.getElementById('bmiResult').innerText = `مؤشر كتلتك: ${(w/(h*h)).toFixed(1)}`;
}

function analyzeText() {
    const t = document.getElementById('textInput').value;
    document.getElementById('charCount').innerText = t.replace(/\s/g, "").length;
    document.getElementById('wordCount').innerText = t.trim() === "" ? 0 : t.trim().split(/\s+/).length;
}

function generatePassword() {
    const c = "abcdefg123456!@#"; let p = "";
    for (let i = 0; i < 12; i++) p += c.charAt(Math.floor(Math.random() * c.length));
    document.getElementById('passwordResult').innerText = p;
}

function copyPassword() {
    navigator.clipboard.writeText(document.getElementById('passwordResult').innerText);
    alert("تم النسخ!");
}

function convertCurrency() {
    const usd = parseFloat(document.getElementById('amount').value);
    if(usd) {
        document.getElementById('iqdResult').innerText = (usd * 1310).toLocaleString();
        document.getElementById('egpResult').innerText = (usd * 48.5).toFixed(2);
    }
}

// تشغيل الوضع الداكن
document.getElementById('themeToggle').addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
});
