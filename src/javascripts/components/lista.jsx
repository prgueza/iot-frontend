// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Importacion de componentes
const DisplayComponentes = require('./display.jsx');
const ImagenComponentes = require('./imagen.jsx');
const GrupoComponentes = require('./grupo.jsx');
const Display = DisplayComponentes.vistaGeneral;
const Imagen = ImagenComponentes.vistaGeneral;
const Grupo = GrupoComponentes.vistaGeneral;
// const DisplayListaDetalles = DisplayComponentes.listaDetalles;
// const ImagenListaDetalles = ImagenComponentes.listaDetalles;
// const GrupoListaDetalles = GrupoComponentes.listaDetalles;

// Declaracion del componente
