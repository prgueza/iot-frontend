/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

const cx = require('classnames');

/* COMPONENT */
const AddButton = ({ category }) => {
  const claseBoton = cx('btn btn-block btn-small', { 'btn-success': category === 'displays' }, { 'btn-info': category === 'images' }, { 'btn-warning': category === 'groups' }, { 'btn-success': category === 'gateways' });
  const location = {
    pathname: `/${category}/add`,
  };
  return (
    <Link to={location}>
      { category !== 'displays'
        ? (
          <button type="button" className={claseBoton}>
            <i className="fa fa-plus-circle mr-1" aria-hidden="true" />
						Añadir
          </button>
        )
        : (
          <button type="button" className={claseBoton}>
            <i className="fa fa-wrench mr-1" aria-hidden="true" />
						Configurar
          </button>
        )
      }
    </Link>
  );
};

AddButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default AddButton;
