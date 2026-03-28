/**
 * dashboard.js
 * Mock backend and state management using localStorage for the My Kera UI Prototype.
 */

const DB_KEY_FARMERS = 'my_kera_farmers';
const DB_KEY_PAYMENTS = 'my_kera_payments';

// Initialize Mock Data if empty
function initializeMockDB() {
    if (!localStorage.getItem(DB_KEY_FARMERS)) {
        const dummyFarmers = [
            {
                id: 'f_101',
                name: 'Kannan',
                farm: 'Sunrise Organic Grove',
                location: 'Kollam, Kerala',
                email: 'kannan@example.com',
                phone: '+91 9876543210',
                price: 45,
                stock: 120,
                photoUrl: 'https://ui-avatars.com/api/?name=Kannan&background=2e7d32&color=fff'
            },
            {
                id: 'f_102',
                name: 'Joseph Kurian',
                farm: 'Heritage Palms',
                location: 'Alappuzha, Kerala',
                email: 'joseph@example.com',
                phone: '+91 9988776655',
                price: 50,
                stock: 0, // Out of stock example
                photoUrl: 'https://ui-avatars.com/api/?name=Joseph+K&background=5d4037&color=fff'
            },
            {
                id: 'f_103',
                name: 'Devika M',
                farm: 'Green Canopy Estates',
                location: 'Wayanad, Kerala',
                email: 'devika@example.com',
                phone: '+91 9123456789',
                price: 42,
                stock: 300,
                photoUrl: 'https://ui-avatars.com/api/?name=Devika+M&background=81c784&color=fff'
            }
        ];
        localStorage.setItem(DB_KEY_FARMERS, JSON.stringify(dummyFarmers));
    }
    
    if (!localStorage.getItem(DB_KEY_PAYMENTS)) {
        localStorage.setItem(DB_KEY_PAYMENTS, JSON.stringify([]));
    }
}

// Utility: Get Current Auth User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Utility: Database Access
function getFarmers() {
    return JSON.parse(localStorage.getItem(DB_KEY_FARMERS)) || [];
}

function saveFarmers(farmersArray) {
    localStorage.setItem(DB_KEY_FARMERS, JSON.stringify(farmersArray));
}

function updateFarmerProfile(farmerData) {
    const farmers = getFarmers();
    const index = farmers.findIndex(f => f.id === farmerData.id);
    if (index >= 0) {
        farmers[index] = { ...farmers[index], ...farmerData };
    } else {
        farmers.push(farmerData);
    }
    saveFarmers(farmers);
}

// Notifications / Payments
function getPaymentsForFarmer(farmerId) {
    const all = JSON.parse(localStorage.getItem(DB_KEY_PAYMENTS)) || [];
    return all.filter(p => p.farmerId === farmerId).reverse();
}

function createPayment(farmerId, customerName, amount, quantity) {
    const payments = JSON.parse(localStorage.getItem(DB_KEY_PAYMENTS)) || [];
    payments.push({
        id: 'p_' + Math.floor(Math.random() * 1000000),
        farmerId,
        customerName,
        amount,
        quantity,
        date: new Date().toISOString()
    });
    localStorage.setItem(DB_KEY_PAYMENTS, JSON.stringify(payments));
}

// Run DB init immediately
initializeMockDB();
