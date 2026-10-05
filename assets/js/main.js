// Function Generate Order ID: TPG + DDMMYYYY + Random(1-100) + 5 Random Letters
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
            alert("✅ Format order berhasil disalin!\nSilakan klik 'Kembali ke Bot' dan paste pesan di chat bot.");
        }).catch(err => {
            fallbackCopyText(textFormat);
        });
    } else {
        fallbackCopyText(textFormat);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("✅ Format order berhasil disalin!\nSilakan klik 'Kembali ke Bot' dan paste pesan di chat bot.");
    } catch (err) {
        alert("Gagal menyalin format secara otomatis. Silakan salin manual.");
    }
    document.body.removeChild(textArea);
}

// Function Tutup Telegram Mini App / Kembali ke Bot
function closeTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
    } else {
        alert("Anda tidak sedang membuka via Telegram WebApp.");
    }
}
