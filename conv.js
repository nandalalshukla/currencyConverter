import { countryCurrencyMap } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  let amt;
  const fromCrr = document.getElementById("fromCurrency");
  const toCrr = document.getElementById("toCurrency");
  const convBtn = document.getElementById("convertBtn");
  document.getElementById("amount").addEventListener("input", () => {
    amt = parseFloat(document.getElementById("amount").value);
    console.log(amt);
  });
  const display = document.getElementById("display");
  const fImg = document.getElementById("fromImg");
  const tImg = document.getElementById("toImg");

  // Populate select options first
  for (const countryCode in countryCurrencyMap) {
    let optFrom = document.createElement("option");
    optFrom.value = countryCode;
    optFrom.textContent = countryCurrencyMap[countryCode];
    fromCrr.appendChild(optFrom);

    let optTo = document.createElement("option");
    optTo.value = countryCode;
    optTo.textContent = countryCurrencyMap[countryCode];
    toCrr.appendChild(optTo);
  }

  // Set default flags based on initial selection
  function updateFlags() {
    const fromCrrCode = fromCrr.value;
    const toCrrCode = toCrr.value;

    fImg.src = `https://flagsapi.com/${fromCrrCode}/shiny/64.png`;
    tImg.src = `https://flagsapi.com/${toCrrCode}/shiny/64.png`;
  }

  updateFlags(); // call once on load

  // Update flags when selection changes
  fromCrr.addEventListener("change", updateFlags);
  toCrr.addEventListener("change", updateFlags);

  // Example: use CURR_CONV_API_URL when needed, with current selected values

  convBtn.addEventListener("click", async () => {
    const toCrrCode = countryCurrencyMap[toCrr.value];
    const fromCrrCode = countryCurrencyMap[fromCrr.value];

    const CURR_CONV_API_URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_Epjys0M9zrIAqWR3FWk4C8QV8icAx6bFNVCgM2pM&currencies=${toCrrCode}&base_currency=${fromCrrCode}&`;
    console.log(toCrrCode);

    try {
      const response = await fetch(CURR_CONV_API_URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      console.log(result);
      console.log(result.data[toCrrCode].value);
      let exchange = result.data[toCrrCode].value.toFixed(4);
      console.log(amt);
      console.log(exchange);

      display.innerText = `${toCrrCode}   ${(exchange * amt).toFixed(4)}`;
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  });
});
