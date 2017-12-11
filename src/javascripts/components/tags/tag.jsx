/* IMPORT MODULES */
import React from 'react';
const cx = require('classnames');

/* COMPONENTS */
export const Tag = ({ categoria, etiqueta }) => {
  const claseEtiqueta = cx("btn mr-1",
    {"btn-outline-success": categoria === "displays"},
    {"btn-outline-info": categoria === "imagenes"},
    {"btn-outline-warning": categoria === "grupos"},
    "btn-tiny"
  );
  return(
    <button type="button" className={claseEtiqueta}>{etiqueta}</button>
  );
};
