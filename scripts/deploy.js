const { ethers } = require("hardhat");

async function main() {
  const initialSupply = 1000000000000000;
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment();
  // トークンコントラクトのアドレスを表示
  console.log("token:", token.target);
  console.log("deployment succeeded.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
