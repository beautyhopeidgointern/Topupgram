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

// Function Salin Format ke Clipboard dengan Proteksi Line Break
function copyFormatToClipboard(textFormat) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textFormat).then(() => {
            alert("✅ Format order berhasil disalin!\r\nSilakan klik 'Kembali ke Bot' dan tempel (paste) pesan di chat bot.");
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
    // Mencegah autosnap formatting
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("✅ Format order berhasil disalin!\r\nSilakan klik 'Kembali ke Bot' dan tempel (paste) pesan di chat bot.");
    } catch (err) {
        alert("Gagal menyalin format secara otomatis. Silakan salin manual.");
    }
    document.body.removeChild(textArea);
}

// Function Kembali ke Bot
function closeTelegramWebApp() {
    const botUrl = "https://t.me/topupgrambot";

    if (window.Telegram && window.Telegram.WebApp) {
        // Jika didukung Telegram SDK, buka link bot lalu tutup Mini App
        try {
            window.Telegram.WebApp.openTelegramLink(botUrl);
            window.Telegram.WebApp.close();
        } catch (e) {
            window.location.href = botUrl;
        }
    } else {
        // Fallback jika dibuka dari browser biasa
        window.location.href = botUrl;
    }
}
