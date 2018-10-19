/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Screen = ({
  screen: {
    _id, name, size, description, screenCode, colorProfile, createdAt,
  }, edit, active,
}) => {
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start', { active });
  return (
    <div className={elementClass} role="button" tabIndex={0} onClick={() => edit(_id)} onKeyDown={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <strong>
              <i className="fa fa-window-maximize mr-2" aria-hidden="true" />
              {name}
            </strong>
          </h5>
          <small>
            {size.width}
						x
            {size.height}
          </small>
        </div>
        <div className="d-flex w-100 align-content-right">
          <p className="mb-0">{description}</p>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <small>
            <i className="fa fa-code mr-1" aria-hidden="true" />
            {screenCode}
            <i className="fa fa-adjust ml-3 mr-1" aria-hidden="true" />
            {colorProfile}
          </small>
          <small>
            <i className="fa fa-calendar-o mr-2" aria-hidden="true" />
            {moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')}
          </small>
        </div>
      </div>
    </div>
  );
};

Screen.propTypes = {
  screen: PropTypes.shape.isRequired,
  edit: PropTypes.shape.isRequired,
  active: PropTypes.string.isRequired,
};

export default Screen;
