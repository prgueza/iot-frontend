/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { List } from './list.jsx';
import { Title } from '../tags/title.jsx';

/* COMPONENTS */
export const Panel = ({ category, content, size, appearance, icon, filterValue }) => {
  return(
    <div className={ size == "small" ? "col-4" : "col-6" }>
      <Title total={content.length} appearance={appearance} icon={icon}/>
      <List filterValue={filterValue} category={category} content={content}/>
    </div>
  );
};
