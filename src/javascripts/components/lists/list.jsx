/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Display } from './lists-components/display.jsx';
import { Image } from './lists-components/image.jsx';
import { Group } from './lists-components/group.jsx';
import { AddButton } from '../buttons/addButton.jsx';

/* COMPONENT */
export const List = ({ categoria, contenido }) => {
  if (categoria === "displays"){
    var elementos = contenido.map(elemento => <Display display={elemento} key={elemento.id}/>);
  } else if (categoria === "images"){
    var elementos = contenido.map(elemento => <Image image={elemento} key={elemento.id}/>);
  } else if (categoria === "groups"){
    var elementos = contenido.map(elemento => <Group group={elemento} key={elemento.id}/>);
  }
  return(
    <div className="lista">
      <div className="list-group mb-3">
        {elementos}
      </div>
      <div>
        <AddButton categoria={categoria}/>
      </div>
    </div>
  );
};
