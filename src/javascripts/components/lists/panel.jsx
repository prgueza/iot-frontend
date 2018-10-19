/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import List from './list';
import Title from '../tags/title';

/* COMPONENTS */
const Panel = ({
  category, content, size, appearance, icon, filterValue, filterFound, filterFoundValue,
}) => (
  <div className={size === 'small' ? 'col-4 panel' : 'col-6 panel'}>
    <Title total={content.length} appearance={appearance} icon={icon} />
    <div className="row controls">
      <div className="col">
        <List filterValue={filterValue} filterFoundValue={filterFoundValue} filterFound={filterFound} category={category} content={content} />
      </div>
    </div>
  </div>
);

Panel.propTypes = {
  category: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  appearance: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  filterFound: PropTypes.shape.isRequired,
  filterFoundValue: PropTypes.bool.isRequired,
};

export default Panel;
