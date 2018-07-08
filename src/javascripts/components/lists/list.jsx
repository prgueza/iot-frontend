/* IMPORT MODULES */
import React, { Component } from 'react'

/* IMPORT COMPONENTS */
import { Display } from './lists-components/display.jsx'
import { Image } from './lists-components/image.jsx'
import { Group } from './lists-components/group.jsx'
import { Device } from './lists-components/device.jsx'
import { Gateway } from './lists-components/gateway.jsx'
import { AddButton } from '../buttons/addButton.jsx'

/* COMPONENT */
export class List extends Component {

	filterSearch = ( data, filterValue ) => {
		const filteredData = data.filter( ( element ) => {
			var a = element.name && element.name.indexOf( filterValue ) > -1
			var b = element.description && element.description.indexOf( filterValue ) > -1
			var c = element.category && element.category.indexOf( filterValue ) > -1
			var d = element.screen && element.screen.indexOf( filterValue ) > -1
			var e = element.location && element.location.name.indexOf( filterValue ) > -1
			var f = element.mac && element.mac.indexOf( filterValue ) > -1
			var g = element.initcode && element.initcode.indexOf( filterValue ) > -1
			return a || b || c || d || e || f || g
		} )
		return filteredData
	}

	render() {
		const { category, filterValue, filterFoundValue } = this.props
		let { content } = this.props
		if ( category == 'devices' ) content = this.props.content.filter( element => !filterFoundValue || element.found )
		content = this.filterSearch( content, filterValue )
			.sort( ( a, b ) => b.found - a.found )
		if ( category === 'displays' ) {
			var elements = content.map( element => <Display display={element} key={element._id}/> )
			var elementName = 'displays'
		} else if ( category === 'images' ) {
			var elements = content.map( ( element, index ) => <Image image={element} index={index} key={element._id}/> )
			var elementName = 'imágenes'
		} else if ( category === 'groups' ) {
			var elements = content.map( ( element, index ) => <Group group={element} index={index} key={element._id}/> )
			var elementName = 'grupos'
		} else if ( category === 'devices' ) {
			var elements = content.map( element => <Device device={element} key={element._id}/> )
			var elementName = 'dispositivos'
		} else if ( category === 'gateways' ) {
			var elements = content.map( element => <Gateway gateway={element} key={element._id}/> )
			var elementName = 'puertas de enlace'
		}
		return (
			<div className='list'>
        <div className='list-group mb-3'>
          {elements}
          <div className='list-group-item-action list-group-item flex-column align-items-start'>
              <div className='text-center elemento'>
                <h4 className='mb-1'>No se han encontrado {content.length > 0 && 'más'} {elementName}</h4>
                <hr className='element-division'></hr>
                <small>Número de {elementName}: {content.length}</small>
              </div>
          </div>
        </div>
        { category != 'devices' ?
          <AddButton category={category}/> :
					<div className='custom-control custom-checkbox'>
						<input onChange={() => this.props.filterFound()} id='filter' type='checkbox' defaultChecked={this.props.filterFoundValue} name='found' className='custom-control-input'></input>
						<label className='custom-control-label' htmlFor='filter'>Mostrar únicamente dispositivos localizados</label>
					</div>
        }
      </div>
		)
	}
}
