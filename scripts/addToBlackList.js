const hardhat = require("hardhat");
require("dotenv").config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const blackListAddresses = process.env.BLACKLIST_ADDRESSES.split(",");

async function main() {
  const [owner] = await hardhat.ethers.getSigners();
  const Token = await hardhat.ethers.getContractFactory("Token");
  const token = Token.attach(contractAddress);

  for (const address of blackListAddresses) {
    await token.connect(owner).addToBlackList(address);
    console.log(`Added ${address} to the blacklist.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
