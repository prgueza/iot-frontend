/* IMPORT MODULES */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Device = ({
  editDisplay,
  device: {
    _id, name, description, batt, initcode, found, lastFound,
  },
}) => {
  const last = moment(lastFound).from(moment());
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start');
  const battery = [
    { icon: 'battery-empty', set: batt < 20 },
    { icon: 'battery-quarter', set: batt >= 20 && batt < 40 },
    { icon: 'battery-half', set: batt >= 40 && batt < 60 },
    { icon: 'battery-three-quarters', set: batt >= 60 && batt < 80 },
    { icon: 'battery-full', set: batt >= 80 },
  ];
  const location = editDisplay ? {
    pathname: `/displays/add/${_id}`,
  } : {
    pathname: `/devices/${_id}`,
  };
  return (
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-dispositivo">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="w-60"><strong>{name}</strong></h5>
            <small>
              { found
                ? <FontAwesomeIcon icon={battery.find(bat => bat.set).icon} className="mr-2" fixedWidth />
                : <FontAwesomeIcon icon="unlink" fixedWidth />
              }
              { found ? batt : '' }
            </small>
          </div>
          <hr className="element-division" />
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small>
              <FontAwesomeIcon icon={['far', 'hdd']} className="mr-2" fixedWidth />
              {initcode}
            </small>
            <small>
              {last}
              <FontAwesomeIcon icon="sync-alt" className="ml-2" fixedWidth />
            </small>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

Device.propTypes = {
  editDisplay: PropTypes.bool,
  device: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    updatedAt: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

Device.defaultProps = {
  editDisplay: false,
};


export default Device;
