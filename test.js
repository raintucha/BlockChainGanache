let Web3;
try {
    Web3 = require('web3').default; // Для новой версии Web3.js
} catch (error) {
    Web3 = require('web3'); // Для старой версии Web3.js
}

console.log('Starting connection test...');
const web3 = new Web3('http://127.0.0.1:7545'); // URL Ganache

async function checkConnection() {
    console.log('Checking connection...');
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Connected to Ganache. Accounts:', accounts);
    } catch (error) {
        console.error('Connection error:', error.message);
    }
}

checkConnection();
