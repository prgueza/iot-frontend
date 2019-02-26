/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { Shapes } from '../../util';

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
          <Title appearance="card title-displays" icon="cloud-upload-alt" />
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
  data: PropTypes.shape(Shapes.data),
};

ContentState.defaultProps = {
  data: null,
};

export default ContentState;
