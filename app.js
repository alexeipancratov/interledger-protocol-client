const readline = require("readline");
const interledgerService = require("./interledger-service");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter RippleX account ID: ", async (rippleAccountId) => {
  const balanceData = await interledgerService.getBalanceData(rippleAccountId);
  
  console.log(`Balance of ${rippleAccountId} is ${balanceData.accountBalance.netBalance}`);

  rl.question("Enter a rafiki account to send money to: ", async (rafikiAccountId) => {
    const transferData = await interledgerService.payFriend(rippleAccountId, rafikiAccountId);

    console.log("=====Receipt Start=====");
    console.log(`Original amount: ${transferData.originalAmount}`);
    console.log(`Amount delivered: ${transferData.amountDelivered}`);
    console.log(`Amount sent: ${transferData.amountSent}`);
    console.log(`Payment is ${transferData.successfulPayment ? "successful" : "unsuccessful"}`);
    console.log("=====Receipt End=====");

    rl.question("Press any key to receive money back", async () => {
      const transferData = await interledgerService.receiveMoney(rippleAccountId);

      console.log("=====Receipt Start=====");
      console.log(`Sent ${transferData.sent}`);
      console.log("=====Receipt End=====");
    });
  });
});