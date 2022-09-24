

export interface TableConfig { 
  description?: string;
  id: string;
  title: string;
  render?: (info: any) => JSX.Element;
}

export const InfoTable: TableConfig[] = [
  {
    id: "name",
    title: "Nombre",
  },
  {
    id: "cores",
    title: "Precio",
  },
  {
    id: "processorFrequency",
    title: "Grafica",
  },
  {
    id: "ram",
    title: "RAM"
  },
  {
    id: "HDD",
    title: "HDD"
  },
  {
    id: "cellInStack",
    title: "Celdas en la pilas"
  },
  {
    id: "durationBatery",
    title: "Duracion de la Bateria"
  },
  {
    id: "wattsConsumption",
    title: "Consumo de watts"
  },
  {
    id: "price",
    title: "Precio",
    render: ({price}) => <p>{Intl.NumberFormat("MXN", { currency: "MXN", style: "currency" }).format(isNaN(price) ? 0 : price)}</p>
  }
]
