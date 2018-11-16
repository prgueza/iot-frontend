/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import List from './list';
import Title from '../tags/title';

/* COMPONENTS */
const Panel = ({
  category, size, content, devices, appearance, icon, filterValue, filterFound, filterFoundValue, filterConfigured, filterConfiguredValue,
}) => (
  <div className={size === 'small' ? 'col-4 panel' : 'col-6 panel'}>
    <Title total={content.length} appearance={appearance} icon={icon} />
    <div className="row controls">
      <div className="col">
        <List filterValue={filterValue} filterFoundValue={filterFoundValue} filterFound={filterFound} filterConfigured={filterConfigured} filterConfiguredValue={filterConfiguredValue} category={category} content={content} devices={devices} />
      </div>
    </div>
  </div>);

Panel.propTypes = {
  category: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.object),
  devices: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.string.isRequired,
  appearance: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  filterValue: PropTypes.string,
  filterFound: PropTypes.func,
  filterFoundValue: PropTypes.bool,
  filterConfigured: PropTypes.func,
  filterConfiguredValue: PropTypes.bool,
};

Panel.defaultProps = {
  content: null,
  devices: null,
  filterValue: '',
  filterFound: () => false,
  filterFoundValue: () => false,
  filterConfigured: () => false,
  filterConfiguredValue: false,
};


export default Panel;
