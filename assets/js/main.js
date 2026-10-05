// Function Toast Notifikasi Custom ala iPhone (Ganti Alert Bawaan Browser)
function showToast(message, type = 'error') {
    // Cek jika container toast sudah ada, jika belum buatkan
    let toastContainer = document.getElementById('custom-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'custom-toast-container';
        toastContainer.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs pointer-events-none transition-all duration-300';
        document.body.appendChild(toastContainer);
    }

    // Tentukan warna icon & accent
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-emerald-900/90 border-emerald-500/30' : 'bg-slate-900/90 border-slate-700/50';
    const textColor = 'text-white';

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-2.5 p-3 px-4 rounded-2xl shadow-xl backdrop-blur-md border ${bgColor} ${textColor} text-xs font-semibold transform -translate-y-8 opacity-0 transition-all duration-300 ease-out pointer-events-auto`;
    
    toast.innerHTML = `
        <div class="flex-shrink-0 text-base">${isSuccess ? '✅' : '⚠️'}</div>
        <div class="flex-1 leading-tight text-[11px]">${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Animasi Muncul ala iOS
    setTimeout(() => {
        toast.classList.remove('-translate-y-8', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    // Otomatis Hilang setelah 2.5 detik
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-8', 'opacity-0');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 2500);
}

// Override / Ganti fungsi alert standar jika ada script lain yang memanggil alert
window.alert = function(msg) {
    showToast(msg, 'error');
};

// Function Generate Order ID
function generateOrderID() {
    const now = new Date();
    const dateStr = String(now.getDate()).padStart(2, '0') +
                    String(now.getMonth() + 1).padStart(2, '0') +
                    now.getFullYear();
    
    const randomNum = Math.floor(Math.random() * 100) + 1;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomLetters = '';
    for (let i = 0; i < 5; i++) {
        randomLetters += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return `TPG${dateStr}${randomNum}${randomLetters}`;
}

// Function Salin Format ke Clipboard
function copyFormatToClipboard(textFormat) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textFormat).then(() => {
            showToast("Format order disalin! Silakan paste di bot Telegram.", 'success');
        }).catch(() => {
            fallbackCopyText(textFormat);
        });
    } else {
        fallbackCopyText(textFormat);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast("Format order disalin! Silakan paste di bot Telegram.", 'success');
    } catch (err) {
        showToast("Gagal menyalin otomatis. Silakan salin manual.", 'error');
    }
    document.body.removeChild(textArea);
}

// Function Kembali ke @topupgrambot
function closeTelegramWebApp() {
    const botUrl = "https://t.me/topupgrambot";

    if (window.Telegram && window.Telegram.WebApp) {
        try {
            window.Telegram.WebApp.openTelegramLink(botUrl);
            window.Telegram.WebApp.close();
        } catch (e) {
            window.location.href = botUrl;
        }
    } else {
        window.location.href = botUrl;
    }
}
