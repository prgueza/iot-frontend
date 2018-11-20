/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Icon from '../icons/icon';

/* COMPONENT */
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { timeline, result } = this.props;
    const list = timeline.split('>').map((element, index) => {
      const icon = result && index < timeline.length ? 'check' : 'times';
      const color = result && index < timeline.length ? 'text-success' : 'text-error';
      if (element !== '') {
        return (<p className={color}><Icon icon={icon} />{element}</p>);
      }
      return false;
    });
    return (
      <div className="timeline">{list}</div>
    );
  }
}

Timeline.propTypes = {
  timeline: PropTypes.string,
  result: PropTypes.bool,
};

Timeline.defaultProps = {
  timeline: '',
  result: false,
};

export default Timeline;
