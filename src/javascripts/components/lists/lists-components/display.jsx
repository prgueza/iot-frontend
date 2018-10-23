/* IMPORT MODULES */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Display = ({
  display: {
    _id, name, description, tags, device, updatedAt,
  },
}) => {
  const updated = moment(updatedAt)
    .from(moment());
  const tagsClass = cx({ 'fa fa-tags fa-flip-horizontal mr-1': tags.length > 1 }, { 'fa fa-tag fa-flip-horizontal mr-1': tags.length < 2 });
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start');
  const location = {
    pathname: `/displays/${_id}`,
  };
  return (
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-display">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="w-60"><strong>{name}</strong></h5>
            <small>
              <i className="fa fa-hashtag mr-1" aria-hidden="true" /> {device && device.initcode}
            </small>
          </div>
          <hr className="element-division" />
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small>
              <i className={tagsClass} aria-hidden="true" />
              {tags.length}
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

Display.propTypes = {
  display: PropTypes.shape.isRequired,
};

export default Display;
