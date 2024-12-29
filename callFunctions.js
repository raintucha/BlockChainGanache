const Web3 = require('web3').default;
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:7545'); // URL Ganache
const abi = JSON.parse(fs.readFileSync('MyContract_abi.json', 'utf8')); // ABI контракта
const contractAddress = '0xf587de36Fd0bB0174032eca57DcA629CAA64AF88'; // Адрес контракта
const contract = new web3.eth.Contract(abi, contractAddress);
const account = '0x909b9044d0dC901a06057057df01A5185bee56C5'; // Ваш аккаунт из Ganache

async function interact() {
    try {
        // Получить баланс контракта
        const balance = await contract.methods.getBalance().call();
        console.log('Баланс контракта:', web3.utils.fromWei(balance, 'ether'), 'ETH');

        // Сделать депозит в контракт
        await contract.methods.deposit().send({
            from: account,
            value: web3.utils.toWei('1', 'ether'), // 1 ETH
            gas: 3000000,
        });
        console.log('Депозит успешно выполнен.');

        // Обновить баланс
        const updatedBalance = await contract.methods.getBalance().call();
        console.log('Обновлённый баланс контракта:', web3.utils.fromWei(updatedBalance, 'ether'), 'ETH');

        // Вывести средства
        await contract.methods.withdraw().send({
            from: account,
            gas: 3000000,
        });
        console.log('Средства успешно выведены.');
    } catch (error) {
        console.error('Ошибка взаимодействия с контрактом:', error.message);
    }
}

interact();
