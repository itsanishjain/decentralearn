const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

startFlow();

async function startFlow() {
  const jsonRPCProvider =
    "https://goerli.infura.io/v3/6815f013c45d4c288f68799a488ec8e3";

  // using web3js provider to connect to superflid
  const web3 = new Web3(jsonRPCProvider);

  // initialize superflid SDK
  const sf = new SuperfluidSDK.Framework({
    web3,
  });

  await sf.initialize();

  const bobAddress = "0x1B689089a0ef9a814903E8def331151ADf7F2E73"; // address of the sender's wallet
  const userBob = sf.user({
    address: bobAddress,
    token: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00", // address of the Super Token
  });

  const aliceAddress = "0xc77327F1851255b9f4DA527CEDB91C54499123ef"; // address of the receiver's wallet

  try {
    await userBob.flow({
      recipient: aliceAddress,
      flowRate: "1",
    });

    console.log("SOME FLOW OBJCECT");
  } catch (error) {
    console.log("ERROR :)", error);
  }
}
