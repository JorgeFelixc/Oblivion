import {
  cellInStack,
  cores,
  durationBatery,
  HDD,
  InfoPoductos,
  price,
  processorFrequency,
  ram,
  SectionMatrix,
  wattsConsumption,
} from "../config/Info";

const ListOfValues: SectionMatrix[] = [
  cores,
  processorFrequency,
  ram,
  HDD,
  cellInStack,
  durationBatery,
  wattsConsumption,
  price,
];

export const getEvaluation = (product: InfoPoductos) => {
  const average = ListOfValues.map((item) => {
    const productValue = product[item.dispatcher];
    if (!productValue) {
      console.log("Product value:", productValue, product.name);
    }
    const value =
      item.values[productValue] || getTheClosest(item.values, productValue);

    if (!value) {
      console.log("Value in:", value, product.name, productValue);
    }

    return {
      total: typeof value === "number" ? value * item.weight : 0,
      weight: value,
      title: item.dispatcher,
      id: item.dispatcher,
    };
  });
  console.log(average);
  const finalWeight = average.reduce((prev, acc) => acc.total + prev, 0) / 100;
  const buildObject: { [key: string]: any } = {};
  average.forEach((item) => {
    buildObject[item.title] = item.weight;
  });
  buildObject["name"] = product.name;
  buildObject["finalWeight"] = finalWeight;

  return {
    weightProduct: buildObject,
    list: average,
    totals: finalWeight,
  };
  // return average.reduce((prev, acc) => acc.total + prev, 0);
};

const getTheClosest = (object: any, productValue: any) => {
  const formated = Object.entries(object)
    .map(([key, value]) => {
      if (Number(key) < Number(productValue)) return value;
      else {
        return null;
      }
    })
    .filter((each) => each !== null);
  const valueFormated = formated[formated.length - 1];
  if (!valueFormated) {
    const defaultSearch = Object.entries(object)
      .map((item, index) => {
        return index === 1 ? item : null;
      })
      .filter((item) => item !== null);
    const defaultValue = defaultSearch[0]?.[1];
    console.log(
      `[${defaultValue}]Placed first ${productValue} value:"`,
      object
    );
    return defaultValue;
  }

  console.log(`${valueFormated} Placed [${productValue}] between:`, object);
  return valueFormated;
};
