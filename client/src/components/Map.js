import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'

export class MapContainer extends Component {
    constructor(props){
        super(props)
    }
    
  render() {   
    return (
      <>
      {console.log(this.props)}
      <Map google={this.props.google} initialCenter={{lat: 40.854885, lng: -1.081807}} zoom={5}>
      {this.props.places.map(elm => <Marker
                          title={'The marker`s title will appear as a tooltip.'}
                          name={'SOMA'}
                          position={{lat: elm.lat, lng: elm.lng}} />)} 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
      </>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAQn79ofulVcJxbKOb1tGmPG6GuA7bPojM'
})(MapContainer)