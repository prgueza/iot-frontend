/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { List } from './list.jsx';
import { Title } from '../tags/title.jsx';

/* COMPONENTS */
export const Panel = ({ categoria, contenido }) => {
  return(
    <div className="col-4">
      <Title total={contenido.length} categoria={categoria}/>
      <List categoria={categoria} contenido={contenido}/>
    </div>
  );
};
