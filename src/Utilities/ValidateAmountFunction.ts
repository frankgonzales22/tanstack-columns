export const fncFormatCurrency = (
  value: number,
  disableBillion?: boolean,
  disableMillion?: boolean
) => {
  if (value === undefined || value === null) {
    return "0";
  }
  if (value >= 1000 && value < 1_000_000) {
    let thousandValue = (value / 1000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return `${thousandValue}K`;
  } else if (value >= 1_000_000 && value < 1_000_000_000) {
    // let millionValue = (value / 1_000_000).toLocaleString(undefined, {
    //   maximumFractionDigits: 2,
    // });
    // return `${millionValue}M`;
    if (disableMillion) {
      let thousandValue = (value / 1_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${thousandValue}K`;
    } else {
      let millionValue = (value / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}M`;
    }
  } else if (value >= 1_000_000_000) {
    //BILLION
    if (disableBillion) {
      let millionValue = (value / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}M`;
    } else {
      let billionValue = (value / 1_000_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${billionValue}B`;
    }
  } else {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
};

export const testFncFormat = (value: number) => {
  if (value === undefined) {
    return "";
  }
  if (value >= 1000 && value < 1000000) {
    let thousandValue = (value / 1000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return `${thousandValue}K`;
  } else if (value >= 1000000 && value < 1000000000) {
    let millionValue = (value / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return `${millionValue}M`;
  } else if (value >= 1000000000) {
    // Convert billions to millions
    let millionValue = (value / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    // Append 'M' to millionValue to represent millions
    return `${millionValue}M`;
  } else {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
};

export const fncValidateAmount = (value: number) => {
  if (value === undefined) {
    return "";
  }
  if (value >= 1_000 && value < 1_000_000) {
    return "K";
  } else if (value >= 1_000_000 && value < 1_000_000_000) {
    return "M";
  } else if (value >= 1_000_000_000) {
    return "B";
  } else {
    return "";
  }
};

export const fncFormatAmount = (value: number) => {
  if (value === undefined) {
    return "";
  }
  if (value >= 1000 && value < 1000000) {
    let thousandValue = (value / 1000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return thousandValue;
  } else if (value >= 1000000 && value < 1000000000) {
    let millionValue = (value / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return millionValue;
  } else if (value >= 1000000000) {
    let billionValue = (value / 1000000000).toLocaleString(undefined, {
      maximumFractionDigits: 3,
    });
    return billionValue;
  } else {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
};

// export const fncFormatAmountNoRoundOff = (value: number) => {
//   if (value >= 1000 && value < 1000000) {
//     let thousandValue = (value / 1000).toLocaleString(undefined);
//     return `${thousandValue}K`;
//   } else if (value >= 1000000 && value < 1000000000) {
//     let millionValue = (value / 1000000).toLocaleString(undefined);
//     return `${millionValue}M`;
//   } else if (value >= 1000000000) {
//     let billionValue = (value / 1000000000).toLocaleString(undefined);
//     return billionValue;
//   } else {
//     return value.toLocaleString(undefined);
//   }
// };

export const fncFormatPercentage = (value: number) => {
  return `${value}%`;
};
