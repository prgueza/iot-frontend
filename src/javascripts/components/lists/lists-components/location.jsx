/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Location = ({
  location: {
    _id, name, description,
  }, edit, active,
}) => {
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start', { active });
  return (
    <div className={elementClass} role="button" tabIndex={0} onClick={() => edit(_id)} onKeyDown={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <strong>
              <i className="fa fa-map-marker mr-2" aria-hidden="true" />
              {name}
            </strong>
          </h5>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

Location.propTypes = {
  location: PropTypes.shape.isRequired,
  edit: PropTypes.shape.isRequired,
  active: PropTypes.string.isRequired,
};

export default Location;
