// Base Paket Nominal
const RATE_80 = 16000;   // 80 Robux = Rp 16.000
const RATE_500 = 77500;  // 500 Robux = Rp 77.500

const ROBUX_VLOG_PRICELIST = {
    // Nominal Kecil (Kelipatan 80 Robux)
    "small": [
        { id: "rvl-80", name: "80 Robux", price: RATE_80 * 1 },        // 16.000
        { id: "rvl-160", name: "160 Robux", price: RATE_80 * 2 },      // 32.000
        { id: "rvl-240", name: "240 Robux", price: RATE_80 * 3 },      // 48.000
        { id: "rvl-320", name: "320 Robux", price: RATE_80 * 4 }       // 64.000
    ],
    // Nominal Sedang (Kombinasi Paket 500 & 80 Robux)
    "medium": [
        { id: "rvl-500", name: "500 Robux", price: RATE_500 },                       // 77.500
        { id: "rvl-580", name: "580 Robux", price: RATE_500 + (RATE_80 * 1) },       // 77.500 + 16.000 = 93.500
        { id: "rvl-660", name: "660 Robux", price: RATE_500 + (RATE_80 * 2) },       // 77.500 + 32.000 = 109.500
        { id: "rvl-740", name: "740 Robux", price: RATE_500 + (RATE_80 * 3) },       // 77.500 + 48.000 = 125.500
        { id: "rvl-820", name: "820 Robux", price: RATE_500 + (RATE_80 * 4) },       // 77.500 + 64.000 = 141.500
        { id: "rvl-1000", name: "1.000 Robux", price: RATE_500 * 2 }                 // 155.000
    ],
    // Nominal Besar (Kelipatan Paket 500 Robux)
    "large": [
        { id: "rvl-1500", name: "1.500 Robux", price: RATE_500 * 3 },    // 232.500
        { id: "rvl-2000", name: "2.000 Robux", price: RATE_500 * 4 },    // 310.000
        { id: "rvl-2500", name: "2.500 Robux", price: RATE_500 * 5 },    // 387.500
        { id: "rvl-3000", name: "3.000 Robux", price: RATE_500 * 6 },    // 465.000
        { id: "rvl-3500", name: "3.500 Robux", price: RATE_500 * 7 },    // 542.500
        { id: "rvl-4000", name: "4.000 Robux", price: RATE_500 * 8 },    // 620.000
        { id: "rvl-4500", name: "4.500 Robux", price: RATE_500 * 9 },    // 697.500
        { id: "rvl-5000", name: "5.000 Robux", price: RATE_500 * 10 },   // 775.000
        { id: "rvl-6000", name: "6.000 Robux", price: RATE_500 * 12 },   // 930.000
        { id: "rvl-7000", name: "7.000 Robux", price: RATE_500 * 14 },   // 1.085.000
        { id: "rvl-8000", name: "8.000 Robux", price: RATE_500 * 16 },   // 1.240.000
        { id: "rvl-9000", name: "9.000 Robux", price: RATE_500 * 18 },   // 1.395.000
        { id: "rvl-10000", name: "10.000 Robux", price: RATE_500 * 20 }  // 1.550.000
    ]
};
