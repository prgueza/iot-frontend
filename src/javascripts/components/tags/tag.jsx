/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

const cx = require('classnames');

/* COMPONENT */
const Tag = ({ category, tag, filterData }) => {
  const tagClass = cx('btn mr-1', { 'btn-success': category === 'displays' }, { 'btn-info': category === 'images' }, { 'btn-warning': category === 'groups' },
    'btn-tiny');
  return <button onClick={() => filterData && filterData(tag)} type="button" className={tagClass}>{tag}</button>;
};

Tag.propTypes = {
  category: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  filterData: PropTypes.shape.isRequired,
};

export default Tag;
