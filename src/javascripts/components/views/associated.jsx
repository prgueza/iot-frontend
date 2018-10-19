/* IMPORT MODULES */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Icon from '../icons/icon';

/* COMPONENT */
const Associated = ({
  content, category, active, appearance, icon,
}) => {
  if (category === 'devices') content.sort((a, b) => b.found - a.found);

  if (content.length > 0) {
    return (
      <div className="list-group list-group-small mb-3">
        {content.map((element) => {
          const className = `d-flex elemento ${appearance}`;
          const location = {
            pathname: `/${category}/${element._id}`,
          };
          return (
            <div key={element._id} className="list-group-item flex-column align-items-start">
              <div className={active && active === element._id ? 'active' : ''}>
                <Link to={location}>
                  { category === 'devices'
                    ? (
                      <div className="d-flex elemento elemento-dispositivo w-100 justify-content-between align-items-center">
                        <div className="mb-0">
                          <Icon icon={icon} mr={3} />
                          {element.name}
                        </div>
                        { element.found
                          ? (
                            <span>
                              <small className="mb-0">
                                <Icon icon="battery" mr="1" />
                                {element.batt}
                                <Icon icon="signal" mr="1" ml="2" />
                                {element.rssi}
                              </small>
                            </span>
                          )
                          : <span><small className="mb-0"><Icon icon="chain-broken" mr="1" /></small></span>
                      }
                      </div>
                    )
                    : (
                      <div className={className}>
                        <p className="mb-0">
                          <Icon icon={icon} mr={3} />
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
  content: PropTypes.shape.isRequired,
  category: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  appearance: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Associated;
