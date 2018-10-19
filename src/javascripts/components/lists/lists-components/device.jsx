/* IMPORT MODULES */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Icon from '../../icons/icon';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Device = ({
  device: {
    _id, name, description, batt, initcode, found, updatedAt,
  },
}) => {
  const updated = moment(updatedAt).from(moment());
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start');
  const location = {
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
                ? <Icon icon="battery" fw="true" mr="1" batt={batt} />
                : <Icon icon="chain-broken" fw="true" mr="1" />
              }
              { found ? batt : '' }
            </small>
          </div>
          <hr className="element-division" />
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small>
              <i className="fa fa-code mr-2" aria-hidden="true" />
              {initcode}
            </small>
            <small>
              {updated}
              <i className="fa fa-calendar-o ml-2" aria-hidden="true" />
            </small>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

Device.propTypes = {
  device: PropTypes.shape.isRequired,
};

export default Device;
