/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENT */
const Title = ({ appearance, total, icon }) => (
  <div className="title">
    <div className={appearance}>
      <div className="card-body text-right">
        <div className="card-text d-flex w-100 justify-content-between">
          <h1 className="mb-0 display-3"><FontAwesomeIcon icon={icon} /></h1>
          <h1 className="mb-0 display-3">{total}</h1>
        </div>
      </div>
    </div>
  </div>
);

Title.propTypes = {
  appearance: PropTypes.string.isRequired,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.string.isRequired,
};

Title.defaultProps = {
  total: '',
};

export default Title;
