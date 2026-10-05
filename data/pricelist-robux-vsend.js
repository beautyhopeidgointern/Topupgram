// Cukup atur harga dasar per 100 Robux di sini!
const ROBUX_BASE_RATE_PER_100 = 17500;

// Daftar nominal Robux yang ingin ditampilkan otomatis di UI
const ROBUX_NOMINAL_LIST = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// Fungsi otomatis menghitung daftar produk berdasarkan rate di atas
function generateRobuxPricelist() {
    return ROBUX_NOMINAL_LIST.map(amount => {
        const calculatedPrice = (amount / 100) * ROBUX_BASE_RATE_PER_100;
        return {
            id: `rvs-${amount}`,
            name: `${amount.toLocaleString('id-ID')} Robux`,
            robuxAmount: amount,
            price: calculatedPrice
        };
    });
}
