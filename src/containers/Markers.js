import React from 'react'
import MarkerListItem from '../components/MarkerListItem'

const Markers = (props) =>{
    return(
        props.markers.map((markerInfo, index) => {
        return <MarkerListItem key={index} data={markerInfo} />
        })
    )
}


export default Markers