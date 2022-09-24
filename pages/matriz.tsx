import React, { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { InfoTable, WeightTable } from "../config/tables";
import { computers, InfoPoductos } from "../config/Info";
import { getEvaluation } from "../utils/Matriz";
import {
  AiOutlineFileAdd,
  AiOutlineDatabase,
  AiOutlineDashboard,
} from "react-icons/ai";
import CustomTable from "../components/templates/Table";

const DynCustomTable = dynamic(() => import("../components/templates/Table"), {
  suspense: true,
});

const Matriz = () => {
  const [uiState, setUiState] = useState({
    isModalDataOpen: false,
    isModalEvaluation: false,
    weightDataTable: [] as any[],
    infoData: computers,
  });

  const handleOpenModalData = () =>
    setUiState((prev) => ({ ...prev, isModalDataOpen: true }));
  const handleCloseModalData = () =>
    setUiState((prev) => ({ ...prev, isModalDataOpen: false }));

  const handleOpenModalEvaluation = () =>
    setUiState((prev) => ({ ...prev, isModalEvaluation: true }));
  const handleCloseModalEvaluation = () =>
    setUiState((prev) => ({ ...prev, isModalEvaluation: false }));

  const handleCalcularEvaluaciones = React.useCallback(() => {
    const evaluation = uiState.infoData.map((product) =>
      getEvaluation(product)
    );
    const weightData = evaluation.map((item) => item.weightProduct);

    setUiState((prev) => ({ ...prev, weightDataTable: weightData }));
  }, [uiState.infoData]);

  const handleUpdateItem = async (newProduct: InfoPoductos) => {
    await setUiState((prev) => ({
      ...prev,
      infoData: [...prev.infoData, newProduct],
    }));
  };

  useEffect(() => {
    handleCalcularEvaluaciones();
  }, [handleCalcularEvaluaciones]);

  const bestComputer = React.useMemo(() => {
    return [...uiState.weightDataTable].sort(
      (a, b) => a?.finalWeight - b?.finalWeight
    )[uiState.weightDataTable.length - 1];
  }, [uiState.weightDataTable]);

  const worstComputer = React.useMemo(() => {
    return [...uiState.weightDataTable].sort(
      (a, b) => a?.finalWeight - b?.finalWeight
    )[0];
  }, [uiState.weightDataTable]);

  return (
    <div className="p-24">
      <h1>Matriz de deciciones</h1>
      <p className="mb-10">
        Matriz de decisiones basado en componentes de computadoras
      </p>

      <footer className="matriz-footer space-x-4">
        <Button onClick={handleOpenModalData} rightIcon={<AiOutlineDatabase />}>
          Ver Matriz de Computadoras
        </Button>
        <Button
          onClick={handleOpenModalEvaluation}
          rightIcon={<AiOutlineFileAdd />}
        >
          Agregar nueva Computadora
        </Button>
        <Button
          className="ml-auto:important"
          onClick={handleCalcularEvaluaciones}
          rightIcon={<AiOutlineDashboard />}
        >
          Calcular
        </Button>
      </footer>

      <CustomTable
        highlightOnHover
        tableConfiguration={WeightTable}
        data={uiState.weightDataTable}
        className="table"
      />

      <ResultMessage
        worstComputer={worstComputer}
        bestComputer={bestComputer}
      />
      <Modal
        title="Datos de evaluacion del producto"
        opened={uiState.isModalEvaluation}
        onClose={handleCloseModalEvaluation}
      >
        <FormMatriz
          onClose={handleCloseModalEvaluation}
          onUpdate={handleUpdateItem}
        />
      </Modal>

      <Modal
        opened={uiState.isModalDataOpen}
        title="Agrega tu Computadora"
        onClose={handleCloseModalData}
        size="90vw"
      >
        <DynCustomTable
          highlightOnHover
          tableConfiguration={InfoTable}
          data={uiState.infoData}
          className="table"
        />
      </Modal>
    </div>
  );
};

export default Matriz;

interface FormMatrizProps {
  onClose: () => void;
  onUpdate: (item: InfoPoductos) => void;
}
const FormMatriz = ({ onClose, onUpdate }: FormMatrizProps) => {
  const form = useForm({
    initialValues: {
      name: "",
      cellInStack: 40,
      cores: 4,
      HDD: 254,
      price: 0,
      ram: 4,
      durationBatery: 4,
      processorFrequency: 4,
      wattsConsumption: 4,
    },
  });

  const handleSubmitForm = (values: InfoPoductos) => {
    onUpdate(values);
    onClose();
  };
  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <TextInput
          label="Nombre"
          placeholder="Algun nombre"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Nucleos"
          placeholder="4"
          required
          {...form.getInputProps("cores")}
        />
        <TextInput
          label="Frecuencia Processador"
          placeholder="1.3"
          required
          {...form.getInputProps("processorFrequency")}
        />
        <TextInput
          label="RAM"
          placeholder="32"
          required
          {...form.getInputProps("ram")}
        />
        <TextInput
          label="HDD/Disco Duro"
          placeholder="1024"
          required
          {...form.getInputProps("HDD")}
        />
        <TextInput
          label="Celdas en Pila"
          placeholder="3"
          required
          {...form.getInputProps("cellInStack")}
        />
        <TextInput
          label="Duracion Pila"
          placeholder="4"
          required
          {...form.getInputProps("durationBatery")}
        />
        <TextInput
          label="Consumo watts"
          placeholder="45"
          required
          {...form.getInputProps("wattsConsumption")}
        />
        <TextInput
          label="Precio"
          placeholder="$12,000"
          required
          {...form.getInputProps("price")}
        />
        <Button className="mt-10 w-full" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

const ResultMessage = ({
  bestComputer,
  worstComputer,
}: {
  bestComputer: any;
  worstComputer: any;
}) => {
  return (
    <>
      <div className="mt-10 flex justify-center text-3xl">
        <h2>
          La Mejor PC es: &apos;&apos;{bestComputer?.name}&apos;&apos; con{" "}
          {bestComputer?.finalWeight}
        </h2>
      </div>
      <div className="mt-10 flex justify-center text-3xl">
        <h2>
          La Peor PC es: &apos;&apos;{worstComputer?.name}&apos;&apos; con{" "}
          {worstComputer?.finalWeight}
        </h2>
      </div>
    </>
  );
};
