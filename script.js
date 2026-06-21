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

// ====== 3. أداة لوحة الرسم الاحترافية المطورة (كمبيوتر + موبايل) ======
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// الإعدادات الافتراضية للفرشاة
let currentBrushColor = '#000000';
let currentBrushSize = 3;

function initContext() {
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentBrushColor;
}

// تغيير الألوان ديناميكياً
function changeColor(color) {
    currentBrushColor = color;
    // تحديث النقطة النشطة بصرياً
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.classList.remove('active');
        if(dot.style.backgroundColor === color || dot.getAttribute('style').includes(color)) {
            dot.classList.add('active');
        }
    });
}

// تغيير الحجم ديناميكياً
function changeSize(size) {
    currentBrushSize = size;
}

// --- أحداث الكمبيوتر (الماوس) ---
canvas.addEventListener('mousedown', (e) => { drawing = true; initContext(); draw(e); });
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

// --- أحداث الموبايل (اللمس) ---
canvas.addEventListener('touchstart', (e) => { 
    drawing = true; 
    initContext();
    draw(e.touches[0]); 
    e.preventDefault(); 
}, { passive: false });

canvas.addEventListener('touchend', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('touchmove', (e) => { 
    draw(e.touches[0]); 
    e.preventDefault(); 
}, { passive: false });

function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
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
    link.download = 'my-signature.png';
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

document.getElementById('themeToggle').addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
});
// ====== 6. أداة مؤقت التركيز المخصص (Custom Timer) ======
let countdown;
let timeLeft;
let isRunning = false;
let isPaused = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('timerDisplay').innerText = `${displayMinutes}:${displaySeconds}`;
}

function startTimer() {
    if (isRunning) return;

    // إذا لم يكن المؤقت موقوفاً مؤقتاً، نأخذ القيمة الجديدة من المستخدم
    if (!isPaused) {
        const inputMinutes = parseInt(document.getElementById('customMinutes').value);
        if (!inputMinutes || inputMinutes <= 0) {
            alert("⚠️ يرجى إدخال عدد دقائق صحيح!");
            return;
        }
        timeLeft = inputMinutes * 60;
    }

    isRunning = true;
    isPaused = false;
    
    // تبديل الأزرار
    document.getElementById('btnStartTimer').style.display = 'none';
    document.getElementById('btnPauseTimer').style.display = 'block';

    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(countdown);
            isRunning = false;
            alert("⏰ انتهى الوقت المحدد!");
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
    isPaused = true;
    document.getElementById('btnStartTimer').style.display = 'block';
    document.getElementById('btnPauseTimer').style.display = 'none';
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    isPaused = false;
    const inputMinutes = parseInt(document.getElementById('customMinutes').value) || 25;
    timeLeft = inputMinutes * 60;
    updateTimerDisplay();
    document.getElementById('btnStartTimer').style.display = 'block';
    document.getElementById('btnPauseTimer').style.display = 'none';
}
// ====== 7. أداة مولد بطاقات الألعاب والبروفايل (Gamer ID Builder) ======
function updateGamerCard() {
    const nameInput = document.getElementById('gamerName').value;
    const gameSelect = document.getElementById('gameType').value;
    const cardBox = document.getElementById('idCardBox');

    // تحديث النصوص بصرياً داخل الكارت
    document.getElementById('cardNameDisplay').innerText = nameInput.trim() === "" ? "YOUR NAME" : nameInput;
    document.getElementById('cardGameDisplay').innerText = gameSelect;

    // تغيير ألوان الكارت ديناميكياً حسب اللعبة المختارة لمظهر خرافي
    if (gameSelect === "PUBG Mobile") {
        cardBox.style.background = "linear-gradient(135deg, #2b2d42, #8d99ae)";
    } else if (gameSelect === "Fortnite") {
        cardBox.style.background = "linear-gradient(135deg, #7209b7, #f72585)";
    } else if (gameSelect === "Call of Duty") {
        cardBox.style.background = "linear-gradient(135deg, #111111, #333333)";
    } else if (gameSelect === "Anime Fan") {
        cardBox.style.background = "linear-gradient(135deg, #ff4d6d, #ffb3c1)";
    }
}

function downloadGamerCard() {
    const name = document.getElementById('gamerName').value || "Gamer";
    // استخدام طريقة برمجية ذكية لتحويل الـ HTML Canvas الخاص بالبطاقة وتحميلها
    const canvasCard = document.createElement('canvas');
    canvasCard.width = 400;
    canvasCard.height = 220;
    const ctxCard = canvasCard.getContext('2d');

    // رسم خلفية الكارت على الـ Canvas بناءً على اللعبة لحفظها كصورة حقيقية
    const gameSelect = document.getElementById('gameType').value;
    let grad = ctxCard.createLinearGradient(0, 0, 400, 220);
    if (gameSelect === "PUBG Mobile") { grad.addColorStop(0, '#2b2d42'); grad.addColorStop(1, '#8d99ae'); }
    else if (gameSelect === "Fortnite") { grad.addColorStop(0, '#7209b7'); grad.addColorStop(1, '#f72585'); }
    else if (gameSelect === "Call of Duty") { grad.addColorStop(0, '#111111'); grad.addColorStop(1, '#333333'); }
    else { grad.addColorStop(0, '#ff4d6d'); grad.addColorStop(1, '#ffb3c1'); }

    ctxCard.fillStyle = grad;
    ctxCard.fillRect(0, 0, 400, 220);

    // رسم الشريحة الإلكترونية والنصوص داخل الصورة المحملة
    ctxCard.fillStyle = "#ffb703";
    ctxCard.fillRect(30, 30, 45, 30);

    ctxCard.fillStyle = "#ffffff";
    ctxCard.font = "bold 14px sans-serif";
    ctxCard.fillText("GAMER ID", 300, 45);

    ctxCard.font = "bold 24px sans-serif";
    ctxCard.fillText(name.toUpperCase(), 30, 110);

    ctxCard.fillStyle = "#a8dadc";
    ctxCard.font = "16px sans-serif";
    ctxCard.fillText(gameSelect, 30, 145);

    ctxCard.fillStyle = "#ffffff";
    ctxCard.fillRect(30, 170, 140, 22);
    ctxCard.fillStyle = "#e63946";
    ctxCard.font = "bold 11px sans-serif";
    ctxCard.fillText("STATUS: PRO VERIFIED", 35, 185);

    // عملية التحميل
    const link = document.createElement('a');
    link.download = `${name}-GamerID.png`;
    link.href = canvasCard.toDataURL();
    link.click();
}

