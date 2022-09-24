import React, { Suspense } from 'react';

import { InfoTable } from '../config/tables';
import { computers } from '../config/Info';
import dynamic from 'next/dynamic';

const DynCustomTable = dynamic(() => import('../components/templates/Table'), {  ssr: true, suspense: true });

const Matriz = () => { 
  return(
    <div className="p-24">
      <h1>Matriz de deciciones</h1>
      <Suspense fallback={"...loading"}>
        <DynCustomTable highlightOnHover tableConfiguration={InfoTable} data={computers} className="table"/> 
      </Suspense>
      
    </div>
  )
}


export default Matriz;
