/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Display } from './lists-components/display.jsx';
import { Image } from './lists-components/image.jsx';
import { Group } from './lists-components/group.jsx';
import { Device } from './lists-components/device.jsx';
import { Gateway } from './lists-components/gateway.jsx';
import { AddButton } from '../buttons/addButton.jsx';

/* COMPONENT */
export const List = ({ category, content }) => {
  content  = content.sort((a, b) => a.id - b.id);
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
    <div className="lista">
      <div className="list-group mb-3">
        {elementos}
        <div className="list-group-item-action elemento-display list-group-item flex-column align-items-start">
            <div className="text-center elemento elemento-display">
              <h4 className="mb-1">No se han encontrado {content.length > 0 && 'más'} {elementName}</h4>
              <hr></hr>
              <small>Número de {elementName}: {content.length}</small>
            </div>
        </div>
      </div>
      <div>
        {button}
      </div>
    </div>
  );
};
