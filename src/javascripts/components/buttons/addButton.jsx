/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = require('classnames');

/* COMPONENT */
const AddButton = ({ category }) => {
  const claseBoton = cx('btn btn-block btn-small', { 'btn-success': category === 'displays' }, { 'btn-info': category === 'images' }, { 'btn-warning': category === 'groups' }, { 'btn-success': category === 'gateways' });
  const location = {
    pathname: `/${category}/add`,
  };
  return (
    <Link to={location}>
      <button type="button" className={claseBoton}>
        <FontAwesomeIcon icon="plus-circle" className="mr-1" />
				Añadir
      </button>
    </Link>
  );
};

AddButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default AddButton;
