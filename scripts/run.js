async function main() {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("WavePortal");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed to", contract.address);
    console.log("Contract deployed by", owner.address);
    
    let suggestionsCount = await contract.getSuggestionsCount();
    
    let suggestionTxn = await contract.suggest("https://testtube.com/view?video=video-1");
    await suggestionTxn.wait();
    
    suggestionsCount = await contract.getSuggestionsCount();
    
    suggestionTxn = await contract.connect(randomPerson).suggest("https://testtube.com/view?video=video-2");
    await suggestionTxn.wait();
    
    suggestionsCount = await contract.getSuggestionsCount();

    await contract.listSuggestions();
    
    let likeTxn = await contract.like(1);
    await likeTxn.wait();

    await contract.listSuggestions();
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