const axios = require("axios").default;
const config = require("./config.json");

async function getBalanceData(accountId) {
  const response = await axios.get(`https://ripplex.io/portal/ilp/hermes/accounts/${accountId}/balance`, {
    headers: {
      'Authorization': `Bearer ${config.rippleBearerToken}`
    }
  });

  return response.data;
}

async function payFriend(from, to) {
  const response = await axios.post(`https://ripplex.io/portal/ilp/hermes/accounts/${from}/pay`, {
    amount: 1000,
    destinationPaymentPointer: `$rafiki.money/p/${to}`
  }, {
    headers: {
      'Authorization': `Bearer ${config.rippleBearerToken}`
    }
  });

  return response.data;
}

async function receiveMoney(rippleReceiver) {
  const response = await axios.post("https://rafiki.money/api//payments/peer", {
    accountId: 1211,
    amount: "1000000",
    receiverPaymentPointer: `$ripplex.money/${rippleReceiver}`,
    type: "spsp"
  }, {
    headers: {
      'Authorization': `Bearer ${config.rafikiBearerToken}`
    }
  });

  return response.data;
}

module.exports = {
  getBalanceData,
  payFriend,
  receiveMoney
};