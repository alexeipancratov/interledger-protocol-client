const axios = require("axios").default;
const config = require("./config.json");

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

module.exports = {
  getBalanceData,
  payFriend
};