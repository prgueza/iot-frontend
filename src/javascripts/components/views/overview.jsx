/* IMPORT MODULES */
import React from 'react'

/* IMPORT COMPONENTS */
import { Panel } from '../lists/panel.jsx'

/* COMPONENT */
export const Overview = ({ data: { displays, images, groups, devices, gateways }, user, ...rest }) => {
  return(
    <div className="overview">
      <div className="row">
        <div className="col">
          <div className="mb-4 text-right">
            <h1>VISTA GENERAL</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      { !user.admin &&
        <div className="row row-panel">
          <Panel content={displays} {...rest} category="displays" appearance="card title-displays" icon="television" size="small"/>
          <Panel content={images} {...rest} category="images" appearance="card title-images" icon="picture-o" size="small"/>
          <Panel content={groups} {...rest} category="groups" appearance="card title-groups" icon="list" size="small"/>
        </div>
      }
      { user.admin &&
        <div className="row row-panel">
          <Panel content={devices} {...rest} category="devices" appearance="card title-devices" icon="tablet" size="big"/>
          <Panel content={gateways} {...rest} category="gateways" appearance="card title-gateways" icon="sitemap" size="big"/>
        </div>
      }
    </div>
  )
}
