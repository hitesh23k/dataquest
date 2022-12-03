const hre = require("hardhat")

async function main() {
    const dataQuestFactory = await hre.ethers.getContractFactory("DataQuest");
    const dataQuest = await dataQuestFactory.deploy();
    await dataQuest.deployed();

    console.log(`contract successfully deployed to ${dataQuest.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});