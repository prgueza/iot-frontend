/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* COMPONENT */
const SplitButton = ({ filterConfigured, filterConfiguredValue }) => {
  const configuredClassName = !filterConfiguredValue ? 'btn btn-block btn-split btn-small w-50' : 'btn btn-block btn-split btn-split-active btn-small w-50';
  const unConfiguredClassName = filterConfiguredValue ? 'btn btn-block btn-split btn-small w-50' : 'btn btn-block btn-split btn-split-active btn-small w-50';
  return (
  <div className="d-flex">
    <button type="button" className={configuredClassName} onClick={() => filterConfigured(true)}>
      Configurados
    </button>
    <button type="button" className={unConfiguredClassName} onClick={() => filterConfigured(false)}>
      Sin configurar
    </button>
  </div>);
};

SplitButton.propTypes = {
  filterConfigured: PropTypes.func,
  filterConfiguredValue: PropTypes.bool,
};

SplitButton.defaultProps = {
  filterConfigured: () => false,
  filterConfiguredValue: false,
};

export default SplitButton;
