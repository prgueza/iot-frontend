/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

const cx = require('classnames');

/* COMPONENT */
const Icon = ({
  icon, mr, ml, fw, size, batt, spin, mod,
}) => {
  let iconName = `fa-${icon}`;
  if (batt >= 0) iconName = `${iconName}-${Math.ceil(batt / 25)}`;
  const iconSpin = spin ? 'fa-spin' : '';
  const iconSize = size ? `fa-${size}x` : '';
  const marginLeft = ml ? `ml-${ml}` : '';
  const marginRight = mr ? `mr-${mr}` : '';
  const fullWidth = fw ? 'fa-fw' : '';
  const modifier = mod && '';
  const toggle = icon === 'toggle-on' ? 'text-display' : '';
  const className = cx('fa fa-fw', iconName, iconSize, marginLeft, marginRight, fullWidth, iconSpin, modifier, toggle);

  return (
    <i className={className} aria-hidden="true" />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  mr: PropTypes.number,
  ml: PropTypes.number,
  fw: PropTypes.bool,
  size: PropTypes.number,
  batt: PropTypes.number,
  spin: PropTypes.bool,
  mod: PropTypes.string,
};

Icon.defaultProps = {
  mr: 0,
  ml: 0,
  fw: false,
  size: 1,
  batt: -1,
  spin: false,
  mod: '',
};

export default Icon;
