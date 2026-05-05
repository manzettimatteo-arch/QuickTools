// Anno nel footer
document.getElementById("year").textContent = new Date().getFullYear();

// Calcolatrice
const calcBtn = document.getElementById("calc-btn");
calcBtn.addEventListener("click", () => {
  const a = parseFloat(document.getElementById("calc-a").value);
  const b = parseFloat(document.getElementById("calc-b").value);
  const op = document.getElementById("calc-op").value;
  const resultEl = document.getElementById("calc-result");

  if (isNaN(a) || isNaN(b)) {
    resultEl.textContent = "Risultato: inserisci due numeri validi.";
    return;
  }

  let res;
  switch (op) {
    case "+":
      res = a + b;
      break;
    case "-":
      res = a - b;
      break;
    case "*":
      res = a * b;
      break;
    case "/":
      if (b === 0) {
        resultEl.textContent = "Risultato: divisione per zero non consentita.";
        return;
      }
      res = a / b;
      break;
    default:
      res = NaN;
  }

  resultEl.textContent = "Risultato: " + res;
});

// Generatore password
function generatePassword(length, useLower, useUpper, useNum, useSymbol) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";

  let chars = "";
  if (useLower) chars += lower;
  if (useUpper) chars += upper;
  if (useNum) chars += nums;
  if (useSymbol) chars += symbols;

  if (!chars) return "";

  let pwd = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    pwd += chars[idx];
  }
  return pwd;
}

const pwdBtn = document.getElementById("pwd-btn");
const pwdResult = document.getElementById("pwd-result");
const pwdCopy = document.getElementById("pwd-copy");

pwdBtn.addEventListener("click", () => {
  const length = parseInt(document.getElementById("pwd-length").value, 10);
  const useLower = document.getElementById("pwd-lower").checked;
  const useUpper = document.getElementById("pwd-upper").checked;
  const useNum = document.getElementById("pwd-num").checked;
  const useSymbol = document.getElementById("pwd-symbol").checked;

  if (isNaN(length) || length < 6 || length > 64) {
    alert("Inserisci una lunghezza tra 6 e 64.");
    return;
  }

  const pwd = generatePassword(length, useLower, useUpper, useNum, useSymbol);
  if (!pwd) {
    alert("Seleziona almeno un tipo di carattere.");
    return;
  }

  pwdResult.value = pwd;
});

pwdCopy.addEventListener("click", async () => {
  if (!pwdResult.value) return;
  try {
    await navigator.clipboard.writeText(pwdResult.value);
    pwdCopy.textContent = "Copiato!";
    setTimeout(() => (pwdCopy.textContent = "Copia"), 1200);
  } catch (e) {
    alert("Impossibile copiare automaticamente. Copia manualmente il testo.");
  }
});

// Conteggio caratteri / parole
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const lineCount = document.getElementById("line-count");

function updateCounts() {
  const text = textInput.value;
  const chars = text.length;

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const lines = text.split(/\r\n|\r|\n/).length;

  charCount.textContent = "Caratteri: " + chars;
  wordCount.textContent = "Parole: " + words;
  lineCount.textContent = "Righe: " + lines;
}

textInput.addEventListener("input", updateCounts);

// Convertitore valuta (tassi fittizi)
const curBtn = document.getElementById("cur-btn");
const curResult = document.getElementById("cur-result");

curBtn.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("cur-amount").value);
  const from = document.getElementById("cur-from").value;
  const to = document.getElementById("cur-to").value;

  if (isNaN(amount)) {
    curResult.textContent = "Risultato: inserisci un importo valido.";
    return;
  }

  // Tassi dimostrativi (non reali)
  const rateEURtoUSD = 1.08;
  const rateUSDtoEUR = 1 / rateEURtoUSD;

  let converted = amount;

  if (from === "EUR" && to === "USD") {
    converted = amount * rateEURtoUSD;
  } else if (from === "USD" && to === "EUR") {
    converted = amount * rateUSDtoEUR;
  } else {
    converted = amount; // stessa valuta
  }

  curResult.textContent =
    "Risultato: " + converted.toFixed(2) + " " + to.toUpperCase();
});
