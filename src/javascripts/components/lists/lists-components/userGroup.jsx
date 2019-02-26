/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const UserGroup = ({
  data: {
    devices, displays, images, groups, users,
  },
  userGroup: {
    _id, name, description, createdAt,
  }, edit, active,
}) => {
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start', { active });
  return (
    <div className={elementClass} role="button" tabIndex={0} onClick={() => edit(_id)} onKeyDown={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <strong>
              <FontAwesomeIcon icon="users" className="mr-2" fixedWidth />
              {name}
            </strong>
          </h5>
          <small>
            <i className="fa fa-user-o mr-2" aria-hidden="true" />
            {users ? users.filter(user => user.userGroup._id === _id).length : '0'}
          </small>
        </div>
        <p className="mb-1">{description}</p>
        <div className="d-flex w-100 justify-content-between">
          <small>
            <FontAwesomeIcon icon="tablet-alt" className="mr-1" fixedWidth />
            {devices ? devices.filter(device => device.userGroup === _id).length : '0'}
            <FontAwesomeIcon icon="tv" className="mr-1 ml-2" fixedWidth />
            {displays ? displays.filter(display => display.userGroup === _id).length : '0'}
            <FontAwesomeIcon icon={['far', 'images']} className="mr-1 ml-2" fixedWidth />
            {images ? images.filter(image => image.userGroup === _id).length : '0'}
            <FontAwesomeIcon icon="layer-group" className="mr-1 ml-2" fixedWidth />
            {groups ? groups.filter(group => group.userGroup === _id).length : '0'}
          </small>
          <small>
            <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />
            {moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')}
          </small>
        </div>
      </div>
    </div>
  );
};

UserGroup.propTypes = {
  data: PropTypes.shape({

  }),
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
  data: null,
  edit: () => false,
  active: false,
};

export default UserGroup;
