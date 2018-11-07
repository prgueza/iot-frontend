/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Icon from '../icons/icon';

const cx = require('classnames');

/* COMPONENTS */
const Notification = ({
  text, icon, spin, info, error,
}) => {
  const notifyIconContainer = cx({ 'notify-icon-container notify-icon-error': error }, { 'notify-icon-container notify-icon-success': !error });
  const notifyDivision = cx({ 'notify-division-error': error }, { 'notify-division-success': !error });
  const notifyInfo = cx({ 'notify-info-error': error }, { 'notify-info-success': !error });
  return (
    <div className="notify-content">
      <div className={notifyIconContainer}>
        <div className="notify-icon">
          <Icon icon={icon} size={2} fw spin={spin} />
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
  error: PropTypes.bool,
};

Notification.defaultProps = {
  spin: false,
  error: false,
  info: '',
};

export default Notification;
