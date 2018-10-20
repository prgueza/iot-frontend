/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Icon from '../icons/icon';

/* COMPONENTS */
const Notification = ({
  text, icon, spin, info,
}) => (
  <div className="notify-content">
    <Icon icon={icon} mr="1" spin={spin} />
    <strong>{text}</strong>
    { info
				&& (
			<div>
  <hr className="notify-division" />
  <small className="notify-info">{info}</small>
			</div>
				)
			}
  </div>
);

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  info: PropTypes.string,
};

Notification.defaultProps = {
  spin: false,
  info: '',
};

export default Notification;
