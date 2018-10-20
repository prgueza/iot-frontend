/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import Icon from '../icons/icon';

/* IMPORT COMPONENTS */
const NavButton = ({
  linkTo, text, count, number, icon, exact,
}) => {
  const location = { pathname: `/${linkTo}` };
  return (
    <NavLink tabIndex={-1} exact={!!exact} to={location}>
      <li>
        <button type="button" className="btn btn-nav btn-block mb-1 d-flex justify-content-between align-items-center">
          <div>
            <Icon icon={icon} mr="2" />
            {text}
          </div>
          {count && <span>{number}</span> }
        </button>
      </li>
    </NavLink>
  );
};

NavButton.propTypes = {
  linkTo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.bool,
  number: PropTypes.string,
  icon: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavButton.defaultProps = {
  count: false,
  number: '',
  exact: false,
};

export default NavButton;
