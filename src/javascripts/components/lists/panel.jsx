/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { List } from './list.jsx';
import { Title } from '../tags/title.jsx';
import { AddButton } from '../buttons/addButton.jsx';

/* COMPONENTS */
export const Panel = ({ category, content, size, appearance, icon, filterValue }) => {
  return(
    <div className={ size == "small" ? "col-4 panel" : "col-6 panel" }>
      <Title total={content.length} appearance={appearance} icon={icon}/>
      <div className="row controls">
        <div className="col">
          <List filterValue={filterValue} category={category} content={content}/>
        </div>
      </div>
    </div>
  );
};
