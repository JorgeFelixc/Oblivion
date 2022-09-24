export interface InfoPoductos {
  name: string;
  cores: number;
  processorFrequency: number;
  ram: number;
  HDD: number,
  cellInStack: number;
  durationBatery: number;
  wattsConsumption: number;
  price: number;
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
    name: "Lenovo Ideapad 3",
    cores: 4,
    processorFrequency: 4.7,
    ram: 8,
    HDD: 512,
    cellInStack: 3,
    durationBatery: 4,
    wattsConsumption: 70,
    price: 14500,
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
    price: 23999,
  },
];