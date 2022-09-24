import React from 'react';

import { Table, TableProps } from '@mantine/core';
import { TableConfig } from '../../../config/tables';

interface Props extends TableProps {
  tableConfiguration: TableConfig[];
  data: any[];
}

const CustomTable = ({tableConfiguration, data, ...restProps}: Props) => { 

  return(
    <Table {...restProps} className="table">
      <CustomTableHeader tableConfiguration={tableConfiguration} />
      <CustomTableBody tableConfiguration={tableConfiguration} data={data} />
    </Table>
  )
}

export default CustomTable;

const CustomTableHeader = ({tableConfiguration}: { tableConfiguration: TableConfig[] }) => { 
  return (
    <thead>
      <tr>
        {tableConfiguration.map(({id, title}) => <th key={id}>{title}</th>)}
      </tr>
    </thead>
  )
};

interface CustomTableBodyProps {
  tableConfiguration: TableConfig[];
  data: any[];
}

const CustomTableBody = ({data, tableConfiguration}: CustomTableBodyProps) => { 
  const buildRow = (data: any) => { 
    return (
      <tr>
        {
          tableConfiguration
            .map((item) => item.render ? <th key={item.id}>{item.render(data)}</th> : <th key={item.id}>{data[item.id]}</th>)
        }
      </tr>
    )
  }

  return (
    <tbody>
      {data.map(buildRow)}   
    </tbody>
  )
}