const express = require("express");
const app = express();

const port = 3000;

const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

async function startFlow(sender_address, reciever_address) {
  const jsonRPCProvider =
    "https://goerli.infura.io/v3/6815f013c45d4c288f68799a488ec8e3";

  // using web3js provider to connect to superflid
  const web3 = new Web3(jsonRPCProvider);

  // initialize superflid SDK
  const sf = new SuperfluidSDK.Framework({
    web3,
  });

  await sf.initialize();

  const bobAddress = sender_address; // address of the sender's wallet
  const userBob = sf.user({
    address: bobAddress,
    token: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00", // address of the Super Token
  });

  const aliceAddress = reciever_address; // address of the receiver's wallet

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

app.use(express.json());

app.post("/subscribe", (req, res) => {
  startFlow(req.sender_address, req.reciever_address);
  res.send("Thanks For subscribing");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
