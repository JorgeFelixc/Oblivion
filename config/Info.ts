export interface InfoPoductos {
  [key: string]: any;
  name: string;
  cores: number;
  processorFrequency: number;
  ram: number;
  HDD: number;
  cellInStack: number;
  durationBatery: number;
  wattsConsumption: number;
  price: number;
}

export interface SectionMatrix {
  weight: number;
  dispatcher: string;
  values: {
    [key in number]: number;
  };
}

export const computers: InfoPoductos[] = [
  {
    name: "HP 15-dw",
    cores: 6,
    processorFrequency: 4,
    ram: 8,
    HDD: 256,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 41,
    price: 10750,
  },
  {
    name: "HP 250 G8",
    cores: 4,
    processorFrequency: 1.3,
    ram: 8,
    HDD: 1024,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 41,
    price: 22099,
  },
  {
    name: "Lenovo Legion 5",
    cores: 6,
    processorFrequency: 3.3,
    ram: 16,
    HDD: 512,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 45,
    price: 29000,
  },
  {
    name: "msi Raider GE76",
    cores: 6,
    processorFrequency: 3.5,
    ram: 32,
    HDD: 1024,
    cellInStack: 4,
    durationBatery: 6,
    wattsConsumption: 45,
    price: 90999,
  },
  {
    name: "Lenovo idepead 5",
    cores: 6,
    processorFrequency: 3.5,
    ram: 8,
    HDD: 1024,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 45,
    price: 16400,
  },
  {
    name: "Lenovo idepead ga",
    cores: 6,
    processorFrequency: 3.5,
    ram: 8,
    HDD: 512,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 45,
    price: 15300,
  },
  {
    name: "ASUS F515EA",
    cores: 4,
    processorFrequency: 2.8,
    ram: 16,
    HDD: 512,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 45,
    price: 22900,
  },
  {
    name: "Asus TUF-FA506IC-HN068W",
    cores: 4,
    processorFrequency: 4,
    ram: 8,
    HDD: 512,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 45,
    price: 20000,
  },
  {
    name: "huawei matebook d16",
    cores: 6,
    processorFrequency: 4,
    ram: 16,
    HDD: 512,
    cellInStack: 3,
    durationBatery: 5,
    wattsConsumption: 60,
    price: 23900,
  },
  {
    name: "Lenovo ThinkPad E14",
    cores: 4,
    processorFrequency: 2.4,
    ram: 8,
    HDD: 256,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 45,
    price: 16000,
  },
  {
    name: "DELL Vostro 3400",
    cores: 4,
    processorFrequency: 1.1,
    ram: 8,
    HDD: 1024,
    cellInStack: 3,
    durationBatery: 3,
    wattsConsumption: 42,
    price: 16900,
  },
];

export const cores: SectionMatrix = {
  weight: 15,
  dispatcher: "cores",
  values: {
    2: 5,
    4: 8,
    6: 9,
    8: 10,
  },
};

export const processorFrequency: SectionMatrix = {
  weight: 15,
  dispatcher: "processorFrequency",
  values: {
    1.3: 5,
    2.4: 8,
    2.8: 8,
    3.3: 9,
    3.5: 9,
    4: 10,
    4.1: 10,
  },
};

export const ram: SectionMatrix = {
  weight: 20,
  dispatcher: "ram",
  values: {
    4: 5,
    8: 8,
    16: 9,
    32: 10,
  },
};

export const HDD: SectionMatrix = {
  weight: 20,
  dispatcher: "HDD",
  values: {
    256: 6,
    512: 8,
    1024: 10,
  },
};

export const cellInStack: SectionMatrix = {
  weight: 5,
  dispatcher: "cellInStack",
  values: {
    3: 8,
    4: 10,
  },
};

export const durationBatery: SectionMatrix = {
  weight: 5,
  dispatcher: "durationBatery",
  values: {
    3: 6,
    4: 8,
    5: 9,
    6: 10,
  },
};

export const wattsConsumption: SectionMatrix = {
  weight: 0,
  dispatcher: "wattsConsumption",
  values: {
    41: 10,
    42: 10,
    45: 9,
    60: 8,
    70: 8,
  },
};

export const price: SectionMatrix = {
  weight: 20,
  dispatcher: "price",
  values: {
    9400: 10,
    10750: 10,
    15000: 9,
    15300: 9,
    16000: 8,
    16400: 8,
    16900: 8,
    20000: 7,
    22900: 7,
    23900: 6,
    29000: 6,
    37000: 5,
  },
};
