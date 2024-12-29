const hre = require("hardhat");

async function main() {
    console.log("Deploying contract...");

    // Получаем фабрику контракта
    const MyContract = await hre.ethers.getContractFactory("MyContract");

    // Деплоим контракт
    const contract = await MyContract.deploy();

    // Ждём завершения деплоя
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
