/* IMPORT MODULES */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');
const cx = require('classnames');

moment.locale('es');

/* COMPONENT */
const Group = ({
  group: {
    _id, name, description, tags, updatedAt,
  },
}) => {
  const updated = moment(updatedAt).from(moment());
  const tagsIcon = [
    { icon: 'tags', set: tags.length > 1 },
    { icon: 'tag', set: tags.length < 2 },
  ];
  const elementClass = cx('list-group-item-action list-group-item flex-column align-items-start');
  const location = {
    pathname: `/groups/${_id}`,
  };
  return (
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-grupo">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="w-75"><strong>{name}</strong></h5>
            <small>
              <FontAwesomeIcon icon="layer-group" fixedWidth />
            </small>
          </div>
          <hr className="element-division" />
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small>
              <FontAwesomeIcon icon={tagsIcon.filter(tag => tag.set)[0].icon} size="sm" flip="horizontal" className="mr-1" fixedWidth />
              {tags.length}
            </small>
            <small>
              {updated}
              <FontAwesomeIcon icon={['far', 'calendar']} className="ml-2" fixedWidth />
            </small>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

Group.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    updatedAt: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Group;
