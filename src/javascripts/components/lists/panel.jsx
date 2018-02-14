/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { List } from './list.jsx';
import { Title } from '../tags/title.jsx';

/* COMPONENTS */
export const Panel = ({ category, content, size }) => {
  return(
    <div className={ size == "small" ? "col-4" : "col-8" }>
      <Title total={content.length} category={category}/>
      <List category={category} content={content}/>
    </div>
  );
};
