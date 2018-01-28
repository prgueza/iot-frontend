/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { icon } from '../icons/icon.jsx';

/* COMPONENT */
export const Card = ({ gateway, contenido }) => {
  contenido  = contenido.sort((a, b) => a.id - b.id);

  return(
    <div className="card">
      <div className="card-header">
        {gateway.name}
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {contenido.map((c) => <li className="list-group-item"><Icon icon='television' mr='3'/>{c.name}</li>)}
        </ul>
      </div>
    </div>
  );
};
