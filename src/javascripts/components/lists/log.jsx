/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* IMPORT COMPONENTS */
import Icon from '../icons/icon';
import Timeline from '../tags/timeline';

/* COMPONENT */
class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimeline: false,
    };
  }

  showTimeline = () => {
    const { display: { updating } } = this.props;
    if (updating) {
      return;
    }
    const { showTimeline } = this.state;
    this.setState({ showTimeline: !showTimeline });
  }

  handleSendImage = () => {
    const { display } = this.props;
	  const { token, notify } = this.props;
    this.setState({ showTimeline: false });
	  if (!display.updating) {
	    axios({
	    timeout: 50000,
	    method: 'post',
	    url: `update/${display._id}`,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  }).then((res) => {
	    if (res.status === 200 || res.status === 201) { // with success
	       notify('Cambios realizados', 'notify-success', 'cloud-upload', res.data.notify); // notify success
	    } else {
	      notify('Error al realizar los cambios', 'notify-error', 'times', res.data.notify, true); // notify error
	    }
	  }).catch((err) => {
	      notify('Error al realizar los cambios', 'notify-error', 'times', err.response.data.notify, true); // notify error
	    });
	  }
  }

  render() {
    const { display } = this.props;
    const { showTimeline } = this.state;
    let result;
    let spin = false;
    let icon;
    let mod;
    if (display.updating) {
      result = 'updating';
      spin = true;
      icon = 'refresh';
      mod = 'text-warning';
    } else if (display.lastUpdateResult) {
      result = 'success';
      icon = 'check-circle-o';
      mod = 'text-success';
    } else {
      result = 'error';
      icon = 'times-circle-o';
      mod = 'text-error';
    }
    return (
      <div className={`card log card-${result}`}>
        <div className="card-body row">
          <div className={`col-1 d-flex align-items-center justify-content-center ${mod}`}>
            <Icon icon={icon} fw size={3} spin={spin} />
          </div>
          <div className="col-8 d-flex align-items-center">
            <h4 onClick={this.showTimeline} className="mb-0"><Icon icon={showTimeline ? 'caret-down' : 'caret-right'} mr={1} />{display && display.name}</h4>
          </div>
          <div className={`col-3 d-flex align-items-center justify-content-end ${mod}`}>
            {!display.updating && <button onClick={this.handleSendImage} type="button" className="btn btn-primary"><Icon icon="cloud-upload" fw mr={2} />Enviar imagen</button>}
          </div>
          {showTimeline && !display.updating
            && (
            <div className="col-12">
              <Timeline timeline={display.timeline} result={display.lastUpdateResult} />
            </div>
            )}
        </div>
      </div>
    );
  }
}

Log.propTypes = {
  display: PropTypes.shape({}),
  token: PropTypes.string,
  notify: PropTypes.func,
};

Log.defaultProps = {
  display: null,
  token: '',
  notify: () => false,
};

export default Log;
