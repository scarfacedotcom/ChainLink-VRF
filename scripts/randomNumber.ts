import { ethers } from "hardhat";

async function main() {
  const VRF = await ethers.getContractFactory("VRFv2Consumer");
  const VRFv2Oracle = await VRF.deploy(10092);
  await VRFv2Oracle.deployed();
  console.log(`VRFv2 contract deployed to ${VRFv2Oracle.address}`);


  //////////////////  CONTRACT FUNCTIONS  //////////////////////////
  const [player1, player2, player3] = await ethers.getSigners();

  /// ADD PLAYER
  const signUpPlayer = await VRFv2Oracle.approvePlayers(player2.address);
  console.log(`${player2.address} approved successfully!`);

  /// GENERATE RANDOM WINNER
  await VRFv2Oracle.generateRandomWinner();

  /// VIEW WINNER
  const winner = await VRFv2Oracle.viewWinner();
  //console.log(Winner is: ${winner});

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});