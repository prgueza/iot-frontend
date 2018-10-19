/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import Icon from '../icons/icon.jsx';

/* COMPONENT */
const Title = ({ appearance, total, icon }) => (
  <div className="title">
    <div className={appearance}>
      <div className="card-body text-right">
        <div className="card-text d-flex w-100 justify-content-between">
          <h1 className="mb-0 display-3"><Icon icon={icon} /></h1>
          <h1 className="mb-0 display-3">{total}</h1>
        </div>
      </div>
    </div>
  </div>
);

export default Title;
