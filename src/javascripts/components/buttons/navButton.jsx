// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { Icon } from '../icons/icon.jsx';
const cx = require('classnames');

export const NavButton = ({ linkTo, text, count, number, icon, exact }) => {
  const location = { pathname: '/' + linkTo };
  return(
    <NavLink exact={exact ? exact : ''} to={location}>
      <li>
        <button type="button" className="btn btn-nav btn-block mb-1">
          <Icon icon={icon} mr="2"/>
          {text}
          {count && <span className="pull-right">{number}</span> }
        </button>
      </li>
    </NavLink>
  );
};
