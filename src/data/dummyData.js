// ═══════════════════════════════════════════════════════════
// AgriConnect — Dummy Data
// All hardcoded data for the prototype
// ═══════════════════════════════════════════════════════════

export const farmers = [
  {
    id: 1,
    name: "Ramesh Patil",
    location: "Nashik, MH",
    district: "Nashik",
    state: "Maharashtra",
    crop: "Wheat",
    qty: 50,
    unit: "Quintal",
    price: 2400,
    msp: 2275,
    harvest: "15 Mar 2026",
    rating: 4.2,
    deals: 18,
    verified: true,
    season: "Rabi",
    organic: false,
    distance: 12,
    memberSince: "Jan 2024",
    avgResponseTime: "2 hrs",
    phone: "+91 98765 43210",
    photo: null,
    listings: [
      { crop: "Wheat", qty: 50, unit: "Quintal", price: 2400, season: "Rabi", harvest: "15 Mar 2026" },
      { crop: "Onion", qty: 80, unit: "Quintal", price: 1900, season: "Rabi", harvest: "28 Feb 2026" },
    ]
  },
  {
    id: 2,
    name: "Sunita Devi",
    location: "Amravati, MH",
    district: "Amravati",
    state: "Maharashtra",
    crop: "Soybean",
    qty: 30,
    unit: "Quintal",
    price: 4600,
    msp: 4600,
    harvest: "10 Apr 2026",
    rating: 4.7,
    deals: 34,
    verified: true,
    season: "Kharif",
    organic: true,
    distance: 47,
    memberSince: "Mar 2023",
    avgResponseTime: "1 hr",
    phone: "+91 87654 32109",
    photo: null,
    listings: [
      { crop: "Soybean", qty: 30, unit: "Quintal", price: 4600, season: "Kharif", harvest: "10 Apr 2026" },
      { crop: "Cotton", qty: 15, unit: "Quintal", price: 7020, season: "Kharif", harvest: "20 Apr 2026" },
    ]
  },
  {
    id: 3,
    name: "Gopal Singh",
    location: "Pune, MH",
    district: "Pune",
    state: "Maharashtra",
    crop: "Onion",
    qty: 200,
    unit: "Quintal",
    price: 1800,
    msp: 0,
    harvest: "28 Feb 2026",
    rating: 3.9,
    deals: 9,
    verified: true,
    season: "Rabi",
    organic: false,
    distance: 28,
    memberSince: "Aug 2024",
    avgResponseTime: "4 hrs",
    phone: "+91 76543 21098",
    photo: null,
    listings: [
      { crop: "Onion", qty: 200, unit: "Quintal", price: 1800, season: "Rabi", harvest: "28 Feb 2026" },
    ]
  },
  {
    id: 4,
    name: "Lakshmi Bai",
    location: "Nagpur, MH",
    district: "Nagpur",
    state: "Maharashtra",
    crop: "Rice",
    qty: 100,
    unit: "Quintal",
    price: 2320,
    msp: 2300,
    harvest: "05 Apr 2026",
    rating: 4.5,
    deals: 22,
    verified: true,
    season: "Kharif",
    organic: true,
    distance: 65,
    memberSince: "Jun 2023",
    avgResponseTime: "3 hrs",
    phone: "+91 65432 10987",
    photo: null,
    listings: [
      { crop: "Rice", qty: 100, unit: "Quintal", price: 2320, season: "Kharif", harvest: "05 Apr 2026" },
    ]
  },
  {
    id: 5,
    name: "Arjun Yadav",
    location: "Kolhapur, MH",
    district: "Kolhapur",
    state: "Maharashtra",
    crop: "Sugarcane",
    qty: 500,
    unit: "Quintal",
    price: 340,
    msp: 315,
    harvest: "01 Mar 2026",
    rating: 4.0,
    deals: 12,
    verified: true,
    season: "Zaid",
    organic: false,
    distance: 55,
    memberSince: "Nov 2024",
    avgResponseTime: "5 hrs",
    phone: "+91 54321 09876",
    photo: null,
    listings: [
      { crop: "Sugarcane", qty: 500, unit: "Quintal", price: 340, season: "Zaid", harvest: "01 Mar 2026" },
    ]
  }
];

export const crops = [
  "Wheat", "Rice", "Sugarcane", "Onion", "Tomato", "Cotton", "Soybean", "Maize"
];

export const mspRates = {
  "Wheat": 2275,
  "Rice": 2300,
  "Sugarcane": 315,
  "Onion": 0,
  "Tomato": 0,
  "Cotton": 7020,
  "Soybean": 4600,
  "Maize": 2090,
};

export const reviews = [
  {
    id: 1,
    farmerId: 1,
    reviewer: "Amit Sharma",
    rating: 4,
    text: "Ramesh ji delivered exactly what was promised. Wheat quality was excellent — no moisture issues. Very professional communication throughout the deal.",
    tags: ["Quality produce", "Good communication"],
    date: "12 Jan 2026"
  },
  {
    id: 2,
    farmerId: 1,
    reviewer: "Priya Foods Pvt Ltd",
    rating: 5,
    text: "Second time dealing with Patil sahab. Quantities were accurate, delivery was timely. Will continue working with him for future procurement.",
    tags: ["Delivered on time", "Fair pricing", "Quality produce"],
    date: "28 Nov 2025"
  },
  {
    id: 3,
    farmerId: 1,
    reviewer: "Rajesh Agarwal",
    rating: 4,
    text: "Good produce quality. Slight delay in delivery due to transport issues but he kept us informed. Pricing was competitive — slightly above MSP but justified by quality.",
    tags: ["Quality produce", "Fair pricing"],
    date: "05 Sep 2025"
  }
];

export const seasons = ["Rabi", "Kharif", "Zaid"];

export const states = ["Maharashtra", "Madhya Pradesh", "Rajasthan", "Uttar Pradesh", "Punjab"];

export const districts = {
  "Maharashtra": ["Nashik", "Pune", "Amravati", "Nagpur", "Kolhapur", "Aurangabad"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Agra", "Varanasi"],
  "Punjab": ["Amritsar", "Ludhiana", "Patiala"],
};

export const tagOptions = [
  "Quality produce",
  "Fair pricing",
  "Prompt response",
  "Delivered on time",
  "Good communication"
];

export const businessTypes = [
  "Processor",
  "Exporter",
  "Retailer",
  "Wholesaler",
  "Food Industry"
];

// Bilingual labels
export const labels = {
  en: {
    appName: "AgriConnect",
    tagline: "Seedh Kisan se. Direct trade, fair price.",
    taglineHi: "सीधे किसान से। सीधा व्यापार, उचित दाम।",
    farmer: "Farmer",
    farmerHi: "किसान",
    buyer: "Buyer",
    buyerHi: "खरीदार",
    login: "Login",
    loginHi: "लॉग इन",
    mobileOrEmail: "Mobile number or Email",
    sendOtp: "Send OTP",
    sendOtpHi: "OTP भेजें",
    documents: "Documents",
    documentsHi: "दस्तावेज़",
    listProduce: "List your produce",
    listProduceHi: "अपनी उपज सूचीबद्ध करें",
    search: "Search",
    searchHi: "खोजें",
    deals: "Deals",
    dealsHi: "सौदे",
    profile: "Profile",
    profileHi: "प्रोफ़ाइल",
    home: "Home",
    homeHi: "होम",
    myListings: "My Listings",
    myListingsHi: "मेरी सूची",
    submit: "Submit",
    submitHi: "जमा करें",
    verified: "Verified Farmer",
    verifiedHi: "सत्यापित किसान",
    verifiedBuyer: "Verified Buyer",
    verifiedGovt: "Verified by Govt. of India",
    verifiedDigilocker: "✓ Verified via DigiLocker",
    tapToUpload: "Tap to upload",
    optional: "Optional",
    revealContact: "Reveal Contact Details",
    revealContactHi: "संपर्क विवरण देखें",
    dealLocked: "Deal Locked!",
    dealLockedHi: "सौदा पक्का!",
    markCompleted: "Mark as Completed",
    markPayment: "Mark Payment Received",
    writeReview: "Write your experience...",
    submitReview: "Submit Review",
    submitReviewHi: "समीक्षा जमा करें",
    listMyProduce: "List My Produce →",
    listMyProduceHi: "मेरी उपज सूचीबद्ध करें →",
    contact: "Contact",
    contactHi: "संपर्क करें",
    useMyLocation: "Use my location",
  },
  hi: {
    appName: "एग्रीकनेक्ट",
    tagline: "सीधे किसान से। सीधा व्यापार, उचित दाम।",
    farmer: "किसान",
    buyer: "खरीदार",
    login: "लॉग इन",
    mobileOrEmail: "मोबाइल नंबर या ईमेल",
    sendOtp: "OTP भेजें",
    documents: "दस्तावेज़",
    listProduce: "अपनी उपज सूचीबद्ध करें",
    search: "खोजें",
    deals: "सौदे",
    profile: "प्रोफ़ाइल",
    home: "होम",
    myListings: "मेरी सूची",
    submit: "जमा करें",
    verified: "सत्यापित किसान",
    verifiedBuyer: "सत्यापित खरीदार",
    verifiedGovt: "भारत सरकार द्वारा सत्यापित",
    verifiedDigilocker: "✓ डिजीलॉकर से सत्यापित",
    tapToUpload: "अपलोड करने के लिए टैप करें",
    optional: "वैकल्पिक",
    revealContact: "संपर्क विवरण देखें",
    dealLocked: "सौदा पक्का!",
    markCompleted: "पूर्ण के रूप में चिह्नित करें",
    markPayment: "भुगतान प्राप्त चिह्नित करें",
    writeReview: "अपना अनुभव लिखें...",
    submitReview: "समीक्षा जमा करें",
    listMyProduce: "मेरी उपज सूचीबद्ध करें →",
    contact: "संपर्क करें",
    useMyLocation: "मेरा स्थान उपयोग करें",
  }
};
