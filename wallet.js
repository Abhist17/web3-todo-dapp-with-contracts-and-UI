require('dotenv').config();
const { ethers } = require('ethers');

// Load environment variables
const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

// Contract ABI
const abi = [
    "function deposit() public payable",
    "function withdraw(uint amount) public",
    "function transfer(address payable recipient, uint amount) public",
    "function getBalance() public view returns (uint)",
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to check wallet balance
async function getBalance() {
    const balance = await contract.getBalance();
    console.log(`Wallet Balance: ${ethers.formatEther(balance)} ETH`);
}

// Function to deposit funds
async function deposit(amount) {
    const tx = await contract.deposit({ value: ethers.parseEther(amount) });
    await tx.wait();
    console.log(`Deposited ${amount} ETH`);
}

// Function to withdraw funds
async function withdraw(amount) {
    const tx = await contract.withdraw(ethers.parseEther(amount));
    await tx.wait();
    console.log(`Withdrew ${amount} ETH`);
}

// Function to transfer funds
async function transfer(to, amount) {
    const tx = await contract.transfer(to, ethers.parseEther(amount));
    await tx.wait();
    console.log(`Transferred ${amount} ETH to ${to}`);
}

// Example usage
(async () => {
    console.log("Wallet DApp running...\n");

    // Check balance
    await getBalance();

    // Deposit funds
    // await deposit("0.01");

    // Withdraw funds
    // await withdraw("0.005");

    // Transfer funds
    // await transfer("0xRecipientAddress", "0.002");

    // Final balance check
    await getBalance();
})();