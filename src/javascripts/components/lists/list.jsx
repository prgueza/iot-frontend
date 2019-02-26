/* IMPORT MODULES */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Display from './lists-components/display';
import Image from './lists-components/image';
import Group from './lists-components/group';
import Device from './lists-components/device';
import Gateway from './lists-components/gateway';
import AddButton from '../buttons/addButton';
import SplitButton from '../buttons/splitButton';

/* COMPONENT */
class List extends Component {
	filterSearch = (data, filterValue) => {
	  const filteredData = data.filter((element) => {
	    if (element) {
	      const a = element.name && element.name.indexOf(filterValue) > -1;
		    const b = element.description && element.description.indexOf(filterValue) > -1;
		    const c = element.category && element.category.indexOf(filterValue) > -1;
		    const d = element.screen && element.screen.indexOf(filterValue) > -1;
		    const e = element.location && element.location.name && element.location.name.indexOf(filterValue) > -1;
		    const f = element.mac && element.mac.indexOf(filterValue) > -1;
		    const g = element.initcode && element.initcode.indexOf(filterValue) > -1;
		    return a || b || c || d || e || f || g;
	    }
	    return false;
	  });
	  return filteredData;
	}

	render() {
	  const {
	    category, devices, filterValue, filterFoundValue, filterFound, filterConfigured, filterConfiguredValue,
	  } = this.props;
	  let { content } = this.props;
	  let elements;
	  let elementName;
	  if (category === 'devices') content = content.filter(element => !filterFoundValue || element.found);
	  if (category === 'displays' && !filterConfiguredValue) content = devices;
	  content = this.filterSearch(content, filterValue).sort((a, b) => b.found - a.found);
	  if (category === 'displays' && filterConfiguredValue) {
	    elements = content.map(element => <Display display={element} key={element._id} />);
	    elementName = 'displays configurados';
	  } else if (category === 'displays') {
	    elements = content.map(element => (!element.display && <Device device={element} key={element._id} editDisplay />));
	    elementName = 'dispositivos sin configurar';
	  } else if (category === 'images') {
	    elements = content.map(element => <Image image={element} key={element._id} />);
	    elementName = 'imágenes';
	  } else if (category === 'groups') {
	    elements = content.map(element => <Group group={element} key={element._id} />);
	    elementName = 'grupos';
	  } else if (category === 'devices') {
		  elements = content.map(element => <Device device={element} key={element._id} />);
	    elementName = 'dispositivos';
	  } else if (category === 'gateways') {
	    elements = content.map(element => <Gateway gateway={element} key={element._id} />);
	    elementName = 'puertas de enlace';
	  }

	  let button = false;
	  switch (category) {
	    case 'devices':
	      button = (
					<div className="custom-control custom-checkbox">
	          <input onChange={() => filterFound()} id="filter" type="checkbox" defaultChecked={filterFoundValue} name="found" className="custom-control-input" />
	          <label className="custom-control-label" htmlFor="filter">Mostrar únicamente dispositivos localizados</label>
	        </div>
	      );
	      break;
	    case 'displays':
	      button = (<SplitButton filterConfigured={filterConfigured} filterConfiguredValue={filterConfiguredValue} />);
	      break;
	    default:
	      button = (<AddButton category={category} />);
	  }

	  return (
  <div className="list">
    <div className="list-group mb-3">
      {elements}
      <div className="list-group-item-action list-group-item flex-column align-items-start">
        <div className="text-center elemento">
          <h4 className="mb-1">
						No se han encontrado
            {content.length > 0 && ' más'}
            {` ${elementName}`}
          </h4>
          <hr className="element-division" />
          <small>
						Número de
            {` ${elementName}`}
						:
            {` ${elements.filter(element => element).length}`}
          </small>
        </div>
      </div>
    </div>
    { button }
  </div>
	  );
	}
}

List.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  devices: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string.isRequired,
  filterValue: PropTypes.string,
  filterFoundValue: PropTypes.bool,
  filterFound: PropTypes.func,
  filterConfigured: PropTypes.func,
  filterConfiguredValue: PropTypes.bool,
};

List.defaultProps = {
  content: [],
  devices: [],
  filterValue: '',
  filterFoundValue: false,
  filterFound: () => false,
  filterConfigured: () => false,
  filterConfiguredValue: false,
};

export default List;
