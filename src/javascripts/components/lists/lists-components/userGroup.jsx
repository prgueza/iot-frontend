/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const UserGroup = ({
  userGroup: {
    _id, name, description, createdAt, devices, displays, groups, images, users,
  }, edit, active,
}) => {
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start', { active });
  return (
    <div className={elementClass} role="button" tabIndex={0} onClick={() => edit(_id)} onKeyDown={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <strong>
              <i className="fa fa-users mr-2" aria-hidden="true" />
              {name}
            </strong>
          </h5>
          <small>
            <i className="fa fa-user-o mr-2" aria-hidden="true" />
            {users ? users.length : '0'}
          </small>
        </div>
        <p className="mb-1">{description}</p>
        <div className="d-flex w-100 justify-content-between">
          <small>
            <i className="fa fa-tablet mr-2" aria-hidden="true" />
            {devices ? devices.length : '0'}
            <i className="fa fa-television mr-2 ml-2" aria-hidden="true" />
            {displays ? displays.length : '0'}
            <i className="fa fa-picture-o mr-2 ml-2" aria-hidden="true" />
            {images ? images.length : '0'}
            <i className="fa fa-list mr-2 ml-2" aria-hidden="true" />
            {groups ? groups.length : '0'}
          </small>
          <small>
            <i className="fa fa-calendar-o mr-2" aria-hidden="true" />
            {moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')}
          </small>
        </div>
      </div>
    </div>
  );
};

UserGroup.propTypes = {
  userGroup: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func,
  active: PropTypes.bool,
};

UserGroup.defaultProps = {
  edit: () => false,
  active: false,
};

export default UserGroup;
