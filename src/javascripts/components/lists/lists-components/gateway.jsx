/* IMPORT MODULES */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Gateway = ({
  gateway: {
    _id, name, description, ip, mac, createdAt,
  },
}) => {
  const created = moment(createdAt)
    .from(moment());
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start');
  const location = {
    pathname: `/gateways/${_id}`,
  };
  return (
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-gateway">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="w-60"><strong>{name}</strong></h5>
            <small>
              {ip}
              <FontAwesomeIcon icon="wifi" className="ml-2" fixedWidth />
            </small>
          </div>
          <hr className="element-division" />
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small>
              <FontAwesomeIcon icon="server" className="mr-2" fixedWidth />
              {mac}
            </small>
            <small>
              {created}
              <FontAwesomeIcon icon={['far', 'calendar']} className="ml-2" fixedWidth />
            </small>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

Gateway.propTypes = {
  gateway: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    mac: PropTypes.string,
    sync: PropTypes.string,
    updatedAt: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Gateway;
