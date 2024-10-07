///////////////////////////////////////////////////////////////
// Query Seletors

// Original
const origStitches = document.querySelector(".origStitches");
const origRows = document.querySelector(".origRows");
const origYardage = document.querySelector(".origYardage");
const origSkeins = document.querySelector(".origSkeins");

// Current
const currStitches = document.querySelector(".currStitches");
const currRows = document.querySelector(".currRows");
const currYardage = document.querySelector(".currYardage");
const currSkeins = document.querySelector(".currSkeins");

// Stitch calculator
const stitches = document.querySelector(".stitches");
const stitchResult = document.querySelector("#stitchResult");
const stitCalcButt = document.querySelector(".stitCalcButt");

// Row Calculator
const rows = document.querySelector(".rows");
const rowResult = document.querySelector("#rowResult");
const rowCalcButt = document.querySelector(".rowCalcButt");

// Increse Calculator
const incCurr = document.querySelector(".incCurr");
const incNum = document.querySelector(".incNum");
const incCalcButt = document.querySelector(".incCalcButt");
const incResult = document.querySelector("#incResult");

// Decrese Calculator
const decCurr = document.querySelector(".decCurr");
const decNum = document.querySelector(".decNum");
const decCalcButt = document.querySelector(".decCalcButt");
const decResult = document.querySelector("#decResult");

// // Yardage Calculator
// const yardageResult = document.querySelector("#yardageResult");
// const yardCalcButt = document.querySelector(".yardCalcButt");

// Swatch Calculator
const swatchStitches = document.querySelector(".swatchStitches");
const swatchRows = document.querySelector(".swatchRows");
const swatchWidth = document.querySelector(".swatchWidth");
const swatchHeight = document.querySelector(".swatchHeight");
const swatchResult = document.querySelector("#swatchResult");
const swatCalcButt = document.querySelector(".swatCalcButt");
const swatchGaugeUnit = document.querySelector("#swatchGaugeUnit");

////////////////////////////////////////////////////////////////
// Gauge settings
// Original pattern Gauge
const oriGauge = {
  st: 0,
  row: 0,
  size: 0,
  len: 0,
  skein: 0,
  skienYardage: 0,
};
// current Gauge
const curGauge = {
  st: 0,
  row: 0,
  size: 0,
  len: 0,
  skein: 0,
  skienYardage: 0,
};
// needed Gauge
const needGauge = {
  st: 0,
  row: 0,
  size: 0,
  len: 0,
  skein: 0,
  skienYardage: 0,
};

const curSwatchGauge = { st: 0, row: 0, width: 0, height: 0 };

const swatchGauge = { st: 0, row: 0 };

const gauges = [oriGauge, curGauge, needGauge, swatchGauge];

////////////////////////////////////////////////////////////////
// Language Change

const langBtn = document.getElementById("langBtn");
const elementsToTranslate = document.querySelectorAll("[data-lang-en]");

langBtn.addEventListener("click", () => {
  // Toggle between English and Korean
  if (langBtn.textContent === "ENG") {
    langBtn.textContent = "KOR";
    changeLanguage("ko");
  } else {
    langBtn.textContent = "ENG";
    changeLanguage("en");
  }
});

function changeLanguage(lang) {
  elementsToTranslate.forEach((el) => {
    if (lang === "ko") {
      el.textContent = el.getAttribute("data-lang-ko");
    } else {
      el.textContent = el.getAttribute("data-lang-en");
    }
  });
}

//////////////////////////////////////////////////////////
// Calculate Functions

// ratio formula
const calcGauge = function (ori, cur, now, resEle, type) {
  const original = parseFloat(ori.value);
  const current = parseFloat(cur.value);
  const result = Math.round((current * now) / original);
  resEle.textContent = `Calculated ${type}: ${result}`;
  resEle.style.display = "block";

  console.log(`${type} calculation : ${result}`);
};

//Gauge functions
const stCalc = function (now) {
  oriGauge.st = parseFloat(origStitches.value);
  curGauge.st = parseFloat(currStitches.value);
  needGauge.st = Math.round((curGauge.st * now) / oriGauge.st);
  stitchResult.textContent = `You need ${needGauge.st}sts.`;
  console.log(needGauge.st);
};

const rowCalc = function (now) {
  needGauge.row = Math.round((curGauge.row * now) / oriGauge.row);
  rowResult.textContent = `You need ${needGauge.row} rows.`;
  console.log(needGauge.row);
};
// //length calculator means yardage(meter) calculator
// const yardageCalc = function (now) {
//   needGauge.skienYardage = Math.round(
//     (curGauge.skienYardage * now) / oriGauge.skienYardage
//   );
//   yardageResult.textContent = `Total yardage you need is ${needGauge.skienYardage}`;
//   console.log(needGauge.skienYardage);
// };

// Increase

function incCalc(curNum, incNum) {
  const cur = parseInt(curNum);
  const inc = parseInt(incNum);
  const finalStitches = cur + inc;
  const baseGap = Math.floor(cur / (inc + 1));
  const remainder = cur % (inc + 1);

  if (remainder === 0) {
    const result = `K${baseGap}, (M1, K${baseGap})${inc}times = total ${finalStitches} stitches`;
    incResult.textContent = result;
    incResult.style.display = "block";
    console.log(result);
  } else {
    const result = `K${Math.ceil(remainder / 2) + baseGap}, (M1, K${baseGap})${
      inc - 1
    }times, M1, K${
      baseGap + remainder - Math.ceil(remainder / 2)
    } = total ${finalStitches} stitches`;

    incResult.textContent = result;
    incResult.style.display = "block";
    console.log(result);
  }

  // // Array to hold the gaps between increases
  // let gaps = [];

  // // Distribute the stitches as evenly as possible
  // for (let i = 0; i < inc; i++) {
  //   let gap = baseGap;

  //   // Spread out the remainder (unevenly distributed stitches)
  //   if (i < remainder) {
  //     gap += 1;
  //   }

  //   gaps.push(gap);
  // }

  // // Now we'll group identical gaps together
  // let result = [];
  // let count = 1;

  // for (let i = 0; i < gaps.length; i++) {
  //   if (gaps[i] === gaps[i + 1]) {
  //     count++;
  //   } else {
  //     // If there's more than one of the same gap, group them
  //     if (count > 1) {
  //       result.push(`(M1, K${gaps[i]}) ${count} times`);
  //     } else {
  // result.push(`M1, K${gaps[i]}`);
  //     }
  //     count = 1; // Reset the count for the next group
  //   }
  // }

  // // Add the remaining stitches after the last increase
  // const finalGap = cur - gaps.reduce((a, b) => a + b, 0);
  // result.push(`M1, K${finalGap}`);

  // // Join the result into a single string
  // const output = result.join(", ");
  // console.log(`${output} = ${finalStitches} stitches in total`);
}

// Decrease
function decCalc(curNum, decNum) {
  const cur = parseInt(curNum);
  const dec = parseInt(decNum);
  const finalStitches = cur - dec;
  const baseGap = Math.floor(cur / (dec + 1));
  const remainder = cur % (dec + 1);

  if (remainder === 0) {
    const result = `K${baseGap - 1}, (K2tog, K${baseGap - 2})${
      dec - 1
    }times, K2tog, K${baseGap - 1} = total ${finalStitches} stitches`;
    decResult.textContent = result;
    decResult.style.display = "block";
    console.log(result);
  } else {
    const result = `K${Math.ceil(remainder / 2) + baseGap - 1}, (K2tog, K${
      baseGap - 2
    })${dec - 1}times, K2tog, K${
      baseGap + remainder - Math.ceil(remainder / 2) - 1
    } = total ${finalStitches} stitches`;
    decResult.textContent = result;
    decResult.style.display = "block";
    console.log(result);
  }

  /*
  // Array to hold the gaps between decreases
  let gaps = [];

  // Distribute the stitches as evenly as possible
  for (let i = 0; i < dec; i++) {
    let gap = baseGap;

    // Spread out the remainder (unevenly distributed stitches)
    if (i < remainder) {
      gap += 1;
    }

    gaps.push(gap);
  }

  // Now we'll group identical gaps together
  let result = [];
  let count = 1;

  for (let i = 0; i < gaps.length; i++) {
    if (gaps[i] === gaps[i + 1]) {
      count++;
    } else {
      // If there's more than one of the same gap, group them
      if (count > 1) {
        result.push(`(K${gaps[i]}, K2tog) ${count} times`);
      } else {
        result.push(`K${gaps[i]}, K2tog`);
      }
      count = 1; // Reset the count for the next group
    }
  }

  // Add any remaining stitches after the last decrease
  const finalGap = cur - gaps.reduce((a, b) => a + b, 0);
  result.push(`K${finalGap}`);

  // Join the result into a single string
  const output = result.join(", ");
  console.log(`${output} = ${finalStitches} stitches in total`); */
}

const swatchCalc = function (stit, row, wid, hei) {
  let result;
  if (swatchGaugeUnit.value === "cm") {
    swatchGauge.st = Math.round((parseFloat(stit) * 10) / wid);
    swatchGauge.row = Math.round((parseFloat(row) * 10) / hei);
    result = `${swatchGauge.st}sts * ${swatchGauge.row}rows in 10cm`;
    swatchResult.textContent = result;
    swatchResult.style.display = "block";
    console.log(result);
  } else {
    swatchGauge.st = Math.round((parseFloat(stit) * 4) / wid);
    swatchGauge.row = Math.round((parseFloat(row) * 4) / hei);
    result = `${swatchGauge.st}sts * ${swatchGauge.row}rows in 4 inches`;
    swatchResult.textContent = result;
    swatchResult.style.display = "block";
    console.log(result);
  }
};

// Change inch to cm

const inchToCm = (inch) => Math.round(inch * 2.54).toFixed(1);
const cmToInch = (cm) => Math.round(cm / 2.54).toFixed(1);

////////////////////////////////////////////////
// Event handlers
// clicking buttons function

//Stitch Calculator
stitCalcButt.addEventListener("click", function (e) {
  e.preventDefault();
  calcGauge(
    origStitches,
    currStitches,
    stitches.value,
    stitchResult,
    "stitches"
  );
});

//Row Calculator
rowCalcButt.addEventListener("click", function (e) {
  e.preventDefault();
  calcGauge(origRows, currRows, rows.value, rowResult, "rows");
});

// // Yard Calculator
// yardCalcButt.addEventListener("click", function (e) {
//   e.preventDefault();
// });

// Increse Calculator
incCalcButt.addEventListener("click", function (e) {
  e.preventDefault();
  incCalc(incCurr.value, incNum.value);
});
// Decrese Calculator
decCalcButt.addEventListener("click", function (e) {
  e.preventDefault();
  decCalc(decCurr.value, decNum.value);
});
// Swatch Calculator
swatCalcButt.addEventListener("click", function (e) {
  e.preventDefault();
  swatchCalc(
    swatchStitches.value,
    swatchRows.value,
    swatchWidth.value,
    swatchHeight.value
  );
});
