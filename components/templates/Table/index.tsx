import React from "react";

import { Table, TableProps } from "@mantine/core";
import { TableConfig } from "../../../config/tables";

interface Props extends TableProps {
  tableConfiguration: TableConfig[];
  data: any[];
  EmptyState?: JSX.Element;
}

const CustomTable = ({
  tableConfiguration,
  data,
  EmptyState,
  ...restProps
}: Props) => {
  if (data.length === 0) {
    return (
      EmptyState || (
        <div className="w-full flex justify-center my-10">
          <h4>La informacion no a sido cargada aun</h4>
        </div>
      )
    );
  }
  return (
    <Table {...restProps} className="table">
      <CustomTableHeader tableConfiguration={tableConfiguration} />
      <CustomTableBody tableConfiguration={tableConfiguration} data={data} />
    </Table>
  );
};

export default CustomTable;

const CustomTableHeader = ({
  tableConfiguration,
}: {
  tableConfiguration: TableConfig[];
}) => {
  return (
    <thead>
      <tr>
        {tableConfiguration.map(({ id, title }) => (
          <th key={id}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};

interface CustomTableBodyProps {
  tableConfiguration: TableConfig[];
  data: any[];
}

const CustomTableBody = ({
  data,
  tableConfiguration,
}: CustomTableBodyProps) => {
  const buildRow = (data: any) => {
    return (
      <tr key={data.k}>
        {tableConfiguration.map((item) =>
          item.render ? (
            <th key={item.id}>{item.render(data)}</th>
          ) : (
            <th key={item.id}>{data[item.id]}</th>
          )
        )}
      </tr>
    );
  };

  return (
    <tbody>
      {data.map((item, index) => ({ ...item, k: index })).map(buildRow)}
    </tbody>
  );
};
