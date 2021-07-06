const axios = require("axios").default;
const readline = require("readline");
const config = require("./config.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

axios.defaults.headers.common["Authorization"] = `Bearer ${config.apiBearerToken}`;

async function getBalanceData(accountId) {
  const response = await axios.get(`https://ripplex.io/portal/ilp/hermes/accounts/${accountId}/balance`);

  return response.data;
}

async function payFriend(from, to) {
  const response = await axios.post(`https://ripplex.io/portal/ilp/hermes/accounts/${from}/pay`, {
    amount: 1000,
    destinationPaymentPointer: `$rafiki.money/p/${to}`
  });

  return response.data;
}

rl.question("Enter RippleX account ID: ", async (rippleAccountId) => {
  const balanceData = await getBalanceData(rippleAccountId);
  console.log(`Balance of ${rippleAccountId} is ${balanceData.accountBalance.netBalance}`);

  rl.question("Enter a rafiki account to send money to: ", async (rafikiAccountId) => {
    const transferData = await payFriend(rippleAccountId, rafikiAccountId);
    console.log("=====Receipt Start=====");
    console.log(`Original amount: ${transferData.originalAmount}`);
    console.log(`Amount delivered: ${transferData.amountDelivered}`);
    console.log(`Amount sent: ${transferData.amountSent}`);
    console.log(`Payment is ${transferData.successfulPayment ? "successful" : "unsuccessful"}`);
    console.log("=====Receipt End=====");
  });
});