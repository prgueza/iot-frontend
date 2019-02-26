/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function parseTimeline(element) {
  let message;

  console.log(element);

  if (element.match(/(target)/)) message = `Dirección del dispositivo: ${element.split(': ')[1]}`;
  else if (element.match(/(scan)/)) message = 'Buscando...';
  else if (element.match(/(Device found)/)) message = 'Dispositivo encontrado';
  else if (element.match(/(connected)/)) message = 'Dispositivo conectado';
  else if (element.match(/(Image)/)) message = 'Cargando imagen...';
  else if (element.match(/(Notifying)/)) message = 'Avisando al dispositivo';
  else if (element.match(/(Start)/)) message = 'Iniciando la transmisión';
  else if (element.match(/(finished)/)) message = 'Transmisión finalizada!';
  else if (element.match(/(Device not found)/)) message = 'Dispositivo no encontrado';
  else message = 'Código no reconocido';

  return message;
}

/* COMPONENT */
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { timeline, result } = this.props;
    const list = timeline.split('>').map((element, index) => {
      const icon = result && index !== timeline.length - 1 ? 'check' : 'times';
      const color = result && index !== timeline.length - 1 ? 'text-success' : 'text-error';
      if (element !== '') {
        return (<p key={element} className={color}><FontAwesomeIcon icon={icon} className="mr-1" fixedWidth />{parseTimeline(element)}</p>);
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
