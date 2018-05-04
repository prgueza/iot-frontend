/* IMPORT MODULES */
import React from 'react'
const cx = require('classnames')

/* COMPONENT */
export const Tag = ({ category, tag }) => {
  const tagClass = cx("btn mr-1",
    {"btn-outline-success": category === "displays"},
    {"btn-outline-info": category === "images"},
    {"btn-outline-warning": category === "groups"},
    "btn-tiny"
  )
  return(
    <button type="button" className={tagClass}>{tag}</button>
  )
}
