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
  content: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.string.isRequired,
  appearance: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  filterValue: PropTypes.string,
  filterFound: PropTypes.func,
  filterFoundValue: PropTypes.bool,
};

Panel.defaultProps = {
  content: null,
  filterValue: '',
  filterFound: () => false,
  filterFoundValue: () => false,
};


export default Panel;
