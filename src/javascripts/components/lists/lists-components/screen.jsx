/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Screen = ({
  screen: {
    _id, name, width, height, description, screenCode, color, createdAt,
  }, edit, active,
}) => {
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start', { active });
  return (
    <div className={elementClass} role="button" tabIndex={0} onClick={() => edit(_id)} onKeyDown={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <strong>
              <FontAwesomeIcon icon={['far', 'window-maximize']} className="mr-2" fixedWidth />
              {name}
            </strong>
          </h5>
          <small>
            {width}
						x
            {height}
          </small>
        </div>
        <div className="d-flex w-100 align-content-right">
          <p className="mb-0">{description}</p>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <small>
            <FontAwesomeIcon icon="fingerprint" className="mr-2" fixedWidth />
            {screenCode}
            <FontAwesomeIcon icon="adjust" className="mr-2 ml-3" fixedWidth />
            {color}
          </small>
          <small>
            <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />
            {moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')}
          </small>
        </div>
      </div>
    </div>
  );
};

Screen.propTypes = {
  screen: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func,
  active: PropTypes.bool,
};

Screen.defaultProps = {
  edit: () => false,
  active: false,
};

export default Screen;
