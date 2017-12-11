/* IMPORT MODULES */
import React from 'react';
const cx = require('classnames');

/* COMPONENTS */
export const Title = ({ categoria, total }) => {
  const icono = cx('fa',
  {'fa-television': categoria === "displays"},
  {'fa-picture-o': categoria === "images"},
  {'fa-list': categoria === "groups"},
  {'fa-user-o': categoria === "account"},
  {'fa-cogs': categoria === "settings"},
  {'fa-book': categoria === "docs"});
  const estilo = cx('card', 'mb-3', 'bg-transparent',
  {'border-success text-success': categoria === "displays"},
  {'border-info text-info': categoria === "images"},
  {'border-warning text-warning': categoria === "groups"},
  {'border-light text-light': categoria === "account"},
  {'border-light text-light': categoria === "settings"},
  {'border-light text-light': categoria === "docs"});
  return(
    <div className="resumen">
      <div className={estilo}>
        <div className="card-body text-right">
          <div className="card-text d-flex w-100 justify-content-between">
            <h1 className="mb-0 display-3"><i className={icono} aria-hidden="true"></i></h1>
            <h1 className="mb-0 display-3">{total}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
