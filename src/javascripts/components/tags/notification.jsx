/* IMPORT MODULES */
import React, { Component } from 'react';

/* IMPORT COMPONENTS */
import { Icon } from '../icons/icon.jsx';

/* COMPONENTS */
export const Notification = ({ text, icon }) => {
  return(
    <div>
      <Icon icon={icon} mr="2"/> {text}
    </div>
  );
};
