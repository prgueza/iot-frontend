/* IMPORT MODULES */
import React, { Component } from 'react';

/* IMPORT COMPONENTS */
import { Display } from './lists-components/display.jsx';
import { Image } from './lists-components/image.jsx';
import { Group } from './lists-components/group.jsx';
import { Device } from './lists-components/device.jsx';
import { Gateway } from './lists-components/gateway.jsx';
import { AddButton } from '../buttons/addButton.jsx';

/* COMPONENT */
export class List extends Component{

  filter = (data, filterValue) => {
    const filteredData = data.filter((element) => {
      var a = element.name && element.name.indexOf(filterValue) > -1;
      var b = element.description && element.description.indexOf(filterValue) > -1;
      var c = element.category && element.category.indexOf(filterValue) > -1;
      var d = element.resolution && element.resolution.name.indexOf(filterValue) > -1;
      var e = element.resolution && element.resolution.size.width.indexOf(filterValue) > -1;
      var f = element.resolution && element.resolution.size.height.indexOf(filterValue) > -1;
      var g = element.location && element.location.name.indexOf(filterValue) > -1;
      return a || b || c || d || e || f || g;
    });
    return filteredData;
  }

  render(){
    const { category, filterValue } = this.props;
    var content = this.props.content.filter((e) => e.name.indexOf(filterValue) > -1).sort((a, b) => a.id - b.id);
    var content = this.filter(this.props.content, filterValue).sort((a, b) => a.id - b.id);
    if (category === "displays"){
      var elementos = content.map(elemento => <Display display={elemento} key={elemento._id}/>);
      var elementName = "displays";
    } else if (category === "images"){
      var elementos = content.map(elemento => <Image image={elemento} key={elemento._id}/>);
      var elementName = "imágenes";
    } else if (category === "groups"){
      var elementos = content.map(elemento => <Group group={elemento} key={elemento._id}/>);
      var elementName = "grupos";
    } else if (category === "devices"){
      var elementos = content.map(elemento => <Device device={elemento} key={elemento._id}/>);
      var elementName = "dispositivos";
    } else if (category === "gateways"){
      var elementos = content.map(elemento => <Gateway gateway={elemento} key={elemento._id}/>);
      var elementName = "puertas de enlace";
    }
    const button = <AddButton category={category}/>;
    return(
      <div className="list">
        <div className="list-group mb-3">
          {elementos}
          <div className="list-group-item-action list-group-item flex-column align-items-start">
              <div className="text-center elemento">
                <h4 className="mb-1">No se han encontrado {content.length > 0 && 'más'} {elementName}</h4>
                <hr className="element-division"></hr>
                <small>Número de {elementName}: {content.length}</small>
              </div>
          </div>
        </div>
        <div>
          {button}
        </div>
      </div>
    );
  }
};
