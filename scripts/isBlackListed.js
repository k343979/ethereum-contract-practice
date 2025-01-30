const hardhat = require("hardhat");
require("dotenv").config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const addresses = process.env.BLACKLIST_ADDRESSES.split(",");

async function main() {
  const Token = await hardhat.ethers.getContractFactory("Token");
  const token = Token.attach(contractAddress);

  for (const address of addresses) {
    const isBlackListed = await token.isBlackListed(address);
    console.log(`Is ${address} blacklisted? ${isBlackListed}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
