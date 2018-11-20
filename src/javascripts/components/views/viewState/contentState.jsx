/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Title from '../../tags/title';
import Log from '../../lists/log';

/* COMPONENTS */
const ContentState = ({ data, ...rest }) => {
  const { displays } = data;
  const logs = displays && displays.map(display => <Log key={display._id} display={display} {...rest} />);
  return (
		<div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>ESTADO DEL SISTEMA</h1>
          </div>
          <hr />
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title appearance="card title-displays" icon="cloud-upload" />
          <div className="row controls">
						<div className="col-12">
            	{logs}
						</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContentState.propTypes = {
  data: PropTypes.shape({}),
};

ContentState.defaultProps = {
  data: null,
};

export default ContentState;
