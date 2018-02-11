/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Display } from './lists-components/display.jsx';
import { Image } from './lists-components/image.jsx';
import { Group } from './lists-components/group.jsx';
import { Device } from './lists-components/device.jsx';
import { AddButton } from '../buttons/addButton.jsx';

/* COMPONENT */
export const List = ({ category, content }) => {
  content  = content.sort((a, b) => a.id - b.id);
  if (category === "displays"){
    var elementos = content.map(elemento => <Display display={elemento} key={elemento.id}/>);
  } else if (category === "images"){
    var elementos = content.map(elemento => <Image image={elemento} key={elemento.id}/>);
  } else if (category === "groups"){
    var elementos = content.map(elemento => <Group group={elemento} key={elemento.id}/>);
  } else if (category === "devices"){
    var elementos = content.map(elemento => <Device device={elemento} key={elemento.id}/>);
  }
  const button = <AddButton category={category}/>;
  return(
    <div className="lista">
      <div className="list-group mb-3">
        {elementos}
      </div>
      <div>
        {button}
      </div>
    </div>
  );
};
