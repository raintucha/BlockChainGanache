const Web3 = require('web3').default;
const fs = require('fs');

// Подключение к Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// ABI и байткод
const abi = JSON.parse(fs.readFileSync('MyContract_abi.json', 'utf8'));
const bytecode = fs.readFileSync('MyContract_bytecode.txt', 'utf8');

// Деплой контракта
async function deploy() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Available accounts:', accounts);

        const account = accounts[0]; // Используем первый аккаунт из Ganache
        console.log('Using account:', account);

        const contract = new web3.eth.Contract(abi);
        const deployed = await contract.deploy({ data: bytecode }).send({
            from: account,
            gas: 3000000,
        });

        console.log('Contract deployed at:', deployed.options.address);
    } catch (error) {
        console.error('Deployment error:', error.message);
    }
}

deploy();
