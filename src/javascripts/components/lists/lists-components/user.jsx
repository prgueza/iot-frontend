/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const User = ({
  user: {
    _id, name, login, email, admin, userGroup,
  }, edit, active,
}) => {
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start', { active });
  return (
    <div className={elementClass} role="button" tabIndex={0} onClick={() => edit(_id)} onKeyDown={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <strong>
              { admin
                ? <FontAwesomeIcon icon="user-tie" className="mr-2" fixedWidth />
                : <FontAwesomeIcon icon="user" className="mr-2" fixedWidth />
              }
              {name}
            </strong>
          </h5>
          {admin ? <small>administrador</small> : ''}
        </div>
        <p className="mb-1">{email}</p>
        <div className="d-flex w-100 justify-content-between">
          <small>{login}</small>
          <small className={userGroup || 'text-danger'}>
            <FontAwesomeIcon icon="users" className="mr-2" fixedWidth />
            {userGroup ? userGroup.name : 'Sin asignar'}
          </small>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func,
  active: PropTypes.bool,
};

User.defaultProps = {
  edit: () => false,
  active: false,
};

export default User;
