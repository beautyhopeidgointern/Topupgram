// Function Toast Notifikasi Custom ala iPhone (Ganti Alert Bawaan Browser)
function showToast(message, type = 'error') {
    let toastContainer = document.getElementById('custom-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'custom-toast-container';
        toastContainer.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs pointer-events-none transition-all duration-300';
        document.body.appendChild(toastContainer);
    }

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

    setTimeout(() => {
        toast.classList.remove('-translate-y-8', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

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

// Function Salin Format ke Clipboard (Dual Mode: iOS & Android Safe)
function copyFormatToClipboard(textFormat) {
    // Normalisasi enter agar konsisten di semua platform
    const formattedText = textFormat.replace(/\r?\n/g, "\r\n");

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(formattedText).then(() => {
            showToast("Format order disalin! Silakan paste di bot Telegram.", 'success');
        }).catch(() => {
            fallbackCopyText(formattedText);
        });
    } else {
        fallbackCopyText(formattedText);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Trik Styling khusus WebKit agar Line Break Tidak Di-strip oleh Telegram Webview
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    
    document.body.appendChild(textArea);

    // Khusus Perangkat iOS (iPhone / iPad)
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const editable = textArea.contentEditable;
        const readOnly = textArea.readOnly;

        textArea.contentEditable = 'true';
        textArea.readOnly = 'false';

        const range = document.createRange();
        range.selectNodeContents(textArea);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);

        textArea.contentEditable = editable;
        textArea.readOnly = readOnly;
    } else {
        // Untuk Perangkat Non-iOS (Android, Windows, Mac)
        textArea.focus();
        textArea.select();
    }

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
