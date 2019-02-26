/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = require('classnames');

/* COMPONENT */
const Tag = ({ category, tag, filterData }) => {
  const tagClass = cx('btn mr-1', { 'btn-success': category === 'displays' }, { 'btn-info': category === 'images' }, { 'btn-warning': category === 'groups' },
    'btn-tiny');
  return <button onClick={() => filterData && filterData(tag)} type="button" className={tagClass}><FontAwesomeIcon icon="tag" className="mr-1" fixedWidth />{tag}</button>;
};

Tag.propTypes = {
  category: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  filterData: PropTypes.func,
};

Tag.defaultProps = {
  filterData: () => false,
};

export default Tag;
