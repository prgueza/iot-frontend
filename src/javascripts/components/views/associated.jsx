/* IMPORT MODULES */
import React from 'react';

/* COMPONENTS */
export const Associated = ({ contenido, categoria }) => {
  const texto = categoria == 'imagenes' ? 'Añadir una imagen' : 'Añadir un grupo';
  const icono = categoria == 'imagenes' ? 'fa fa-picture-o mr-3' : 'fa fa-list mr-3';
  const lista = contenido.map((e, i) => (
    <div key={i} className="list-group-item elemento-asociado list-group-item flex-column align-items-start">
        <div className="elemento">
          <div className="d-flex">
            <p className="mb-1"><i className={icono}></i>{e.name}</p>
          </div>
        </div>
    </div>
  ));
  while (lista.length < 5){lista.push(
      <div key={lista.length} className="list-group-item elemento-asociado list-group-item flex-column align-items-start">
          <div className="elemento">
            <div className="d-flex">
              <p className="mb-1 disponible"><i className='fa fa-share-square-o mr-3'></i>Espacio disponible</p>
            </div>
          </div>
      </div>
    );
  }
  return(
  <div className="imagenes-asociadas">
    <div className="list-group mb-3">
      {lista}
    </div>
  </div>
  );
}
