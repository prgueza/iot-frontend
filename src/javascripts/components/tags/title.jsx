/* IMPORT MODULES */
import React from 'react';
const cx = require('classnames');

/* COMPONENTS */
export const Title = ({ category, total }) => {
  const icono = cx('fa',
  {'fa-television': category === "displays"},
  {'fa-picture-o': category === "images"},
  {'fa-list': category === "groups"},
  {'fa-user-o': category === "account"},
  {'fa-cogs': category === "settings"},
  {'fa-book': category === "docs"},
  {'fa-tablet': category === "devices"},
  {'fa-sitemap': category === "gateways"});
  const estilo = cx('card', 'mb-3', 'bg-transparent',
  {'border-success text-success': category === "displays"},
  {'border-info text-info': category === "images"},
  {'border-warning text-warning': category === "groups"},
  {'border-light text-light': category === "account"},
  {'border-light text-light': category === "settings"},
  {'border-light text-light': category === "docs"},
  {'border-light text-light': category === "devices"},
  {'border-light text-light': category === "gateways"});
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
