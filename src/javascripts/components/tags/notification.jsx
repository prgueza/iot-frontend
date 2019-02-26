/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENTS */
const Notification = ({
  text, icon, spin, info, status,
}) => {
  const notifyIconContainer = `notify-icon-container notify-icon-${status}`;
  const notifyDivision = `notify-division notify-division-${status}`;
  const notifyInfo = `notify-info-${status}`;
  return (
    <div className="notify-content">
      <div className={notifyIconContainer}>
        <div className="notify-icon">
          <FontAwesomeIcon icon={icon} size="2x" className="ml-1 mr-1" fixedWidth spin={spin} />
        </div>
      </div>
      <div className="notify-text">
      <strong>{text}</strong>
      { info
  				&& (
  			<div>
          <hr className={notifyDivision} />
          <small className={notifyInfo}>{info}</small>
  			</div>
  				)
  			}
      </div>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  info: PropTypes.string,
  status: PropTypes.oneOf(['error', 'warning', 'success']),
};

Notification.defaultProps = {
  spin: false,
  status: 'success',
  info: '',
};

export default Notification;
