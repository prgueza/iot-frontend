/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              <FontAwesomeIcon icon="map-marker-alt" className="mr-2" fixedWidth />
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
  location: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func,
  active: PropTypes.bool,
};

Location.defaultProps = {
  edit: () => false,
  active: false,
};

export default Location;
