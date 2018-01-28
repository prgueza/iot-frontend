// Importacion de librerias
import React from 'react';
const cx = require('classnames');

export const Icon = ({ icon, mr, ml, size }) => {
  const iconName = "fa-" + icon;
  const iconSize = size ? "fa-" + size + "x" : '';
  const marginLeft = ml ? "ml-" + ml : '';
  const marginRight = mr ? "mr-" + mr : '';
  const className = cx("fa fa-fw", iconName, iconSize, marginLeft, marginRight);

  return(
     <i className={className} aria-hidden="true"></i>
  );
};
