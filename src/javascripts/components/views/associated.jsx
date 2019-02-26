/* IMPORT MODULES */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENT */
const Associated = ({
  content, category, active, appearance, icon,
}) => {
  if (category === 'devices') content.sort((a, b) => b.found - a.found);

  if (content.length > 0) {
    return (
      <div className="list-group list-group-small mb-3">
        {content.map((element) => {
          const battery = [
            { icon: 'battery-empty', set: element.batt < 20 },
            { icon: 'battery-quarter', set: element.batt >= 20 && element.batt < 40 },
            { icon: 'battery-half', set: element.batt >= 40 && element.batt < 60 },
            { icon: 'battery-three-quarters', set: element.batt >= 60 && element.batt < 80 },
            { icon: 'battery-full', set: element.batt >= 80 },
          ];
          const className = `d-flex elemento ${appearance}`;
          const location = {
            pathname: `/${category}/${element._id}`,
          };
          return (
            <div key={element._id} className="list-group-item flex-column align-items-start">
              <div className={active && active._id === element._id ? 'active' : ''}>
                <Link to={location}>
                  { category === 'devices'
                    ? (
                      <div className="d-flex elemento elemento-dispositivo w-100 justify-content-between align-items-center">
                        <div className="mb-0">
                          <FontAwesomeIcon icon={icon} className="mr-3" />
                          {element.name}
                        </div>
                        { element.found
                          ? (
                            <span>
                              <small className="mb-0">
                                {element.batt}
                                <FontAwesomeIcon icon={battery.find(bat => bat.set).icon} className="mr-3 ml-1" fixedWidth />
                                {element.rssi}
                                <FontAwesomeIcon icon="wifi" className="ml-1" fixedWidth />
                              </small>
                            </span>
                          )
                          : <span><small className="mb-0"><FontAwesomeIcon icon="unlink" fixedWidth /></small></span>
                      }
                      </div>
                    )
                    : (
                      <div className={className}>
                        <p className="mb-0">
                          <FontAwesomeIcon icon={icon} className="mr-3" />
                          {element.name}
                        </p>
                      </div>
                    )
                }
                </Link>
              </div>
            </div>);
        })}
      </div>);
  }
  return null;
};

Associated.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.shape({}),
  category: PropTypes.string.isRequired,
  appearance: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Associated.defaultProps = {
  content: null,
  active: null,
};

export default Associated;
