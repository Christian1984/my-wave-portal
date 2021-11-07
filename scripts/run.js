async function main() {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("WavePortal");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed to", contract.address);
    console.log("Contract deployed by", owner.address);
    
    let waveCount = await contract.getTotalWaves();
    
    let waveTxn = await contract.wave();
    await waveTxn.wait();
    
    waveCount = await contract.getTotalWaves();
    
    waveTxn = await contract.connect(randomPerson).wave();
    await waveTxn.wait();
    
    waveCount = await contract.getTotalWaves();
}

async function runMain() {
    try {
        await main();
        process.exit(0);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}

runMain();