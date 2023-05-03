export const tooltipFormatter = (
  value: number,
  name: string
): [number, string] => {
  if (name === "dilatacao") {
    return [value as number, "Dilatação"];
  }
  return [value as number, name as string];
};

export const tooltipLabelFormatter = (label: string) => {
  return new Date(label).toLocaleString("pt-BR").slice(11, 17);
};

export const formatDatetimeAxis = (value: string | number) => {
  let formatted = new Date(value).toLocaleString("pt-BR").slice(11, 17);
  return formatted;
};

export const formatDateAxis = (value: string | number) => {
  let formatted = new Date(value).toLocaleString("pt-BR").slice(0, 10);
  return formatted;
};

export const cpfValidate = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (let index = 0; index < 10; index++)
    add += parseInt(cpf.charAt(index)) * (11 - index);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const reverseFunction = (data: any) => {
  return data.reverse();
};

export const labelPosition = (e: any) => {
  switch (e) {
    case 10: {
      return "-5";
    }
    case 9: {
      return "-4";
    }
    case 8: {
      return "-3";
    }
    case 7: {
      return "-2";
    }
    case 6: {
      return "-1";
    }
    case 5: {
      return "0";
    }
    case 4: {
      return "+1";
    }
    case 3: {
      return "+2";
    }
    case 2: {
      return "+3";
    }
    case 1: {
      return "+4";
    }
    case 0: {
      return "+5";
    }
    default:
      return e;
  }
};

export const valuePosition = (e: any) => {
  switch (e) {
    case -5: {
      return 10;
    }
    case -4: {
      return 9;
    }
    case -3: {
      return 8;
    }
    case -2: {
      return 7;
    }
    case -1: {
      return 6;
    }
    case 0: {
      return 5;
    }
    case 1: {
      return 4;
    }
    case 2: {
      return 3;
    }
    case 3: {
      return 2;
    }
    case 4: {
      return 1;
    }
    case 5: {
      return 0;
    }
    default:
      return e;
  }
};

export const makeEventsInterval = (
  data: any[],
  objKey: string,
  idKey: string
) => {
  const dataReverse = data.reduceRight(function (previous: any, current: any) {
    previous.push(current);
    return previous;
  }, []);

  const find: any = dataReverse.find((item: any) => item?.[objKey]);
  const interval: any[] = [];
  let auxInterval = 0;
  if (find) {
    dataReverse.forEach((item: any) => {
      if (
        find?.[idKey] === item?.[idKey] &&
        (auxInterval === 0 || auxInterval === 1)
      ) {
        auxInterval = 1;
        interval.push(item);
      } else if (auxInterval === 1) {
        auxInterval = 2;
      }
    });
  }

  const findSecond = dataReverse.find(
    (item: any) =>
      item?.position < interval[interval.length - 1]?.position &&
      item?.[objKey] !== undefined
  );
  const intervalSecond: any[] = [];
  let auxIntervalSecond = 0;
  if (findSecond) {
    dataReverse.forEach((item: any) => {
      if (
        findSecond?.[idKey] === item?.[idKey] &&
        item?.position < interval[interval.length - 1]?.position &&
        auxIntervalSecond !== 2
      ) {
        auxIntervalSecond = 1;
        intervalSecond.push(item);
      } else if (auxIntervalSecond === 1) {
        auxIntervalSecond = 2;
      }
    });
  }

  const findThird = dataReverse.find(
    (item: any) =>
      item?.position < intervalSecond[intervalSecond.length - 1]?.position &&
      item?.[objKey] !== undefined
  );
  const intervalThird: any[] = [];
  let auxIntervalThird = 0;
  if (findThird) {
    dataReverse.forEach((item: any) => {
      if (
        findThird?.[idKey] === item?.[idKey] &&
        item?.position < intervalSecond[intervalSecond.length - 1]?.position &&
        auxIntervalThird !== 2
      ) {
        auxIntervalThird = 1;
        intervalThird.push(item);
      } else if (auxIntervalThird === 1) {
        auxIntervalThird = 2;
      }
    });
  }

  const findFourth = dataReverse.find(
    (item: any) =>
      item?.position < intervalThird[intervalThird.length - 1]?.position &&
      item?.[objKey] !== undefined
  );
  const intervalFourth: any[] = [];
  let auxIntervalFourth = 0;
  if (findFourth) {
    dataReverse.forEach((item: any) => {
      if (
        findFourth?.[idKey] === item?.[idKey] &&
        item?.position < intervalThird[intervalThird.length - 1]?.position &&
        auxIntervalFourth !== 2
      ) {
        auxIntervalFourth = 1;
        intervalFourth.push(item);
      } else if (auxIntervalFourth === 1) {
        auxIntervalFourth = 2;
      }
    });
  }

  const findFifth = dataReverse.find(
    (item: any) =>
      item?.position < intervalFourth[intervalFourth.length - 1]?.position &&
      item?.[objKey] !== undefined
  );
  const intervalFifth: any[] = [];
  let auxIntervalFifth = 0;
  if (findFifth) {
    dataReverse.forEach((item: any) => {
      if (
        findFifth?.[idKey] === item?.[idKey] &&
        item?.position < intervalFourth[intervalFourth.length - 1]?.position &&
        auxIntervalFifth !== 2
      ) {
        auxIntervalFifth = 1;
        intervalFifth.push(item);
      } else if (auxIntervalFifth === 1) {
        auxIntervalFifth = 2;
      }
    });
  }

  return [
    interval,
    intervalSecond,
    intervalThird,
    intervalFourth,
    intervalFifth,
  ];
};
