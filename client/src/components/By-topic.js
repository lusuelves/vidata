import React from 'react'
import {Link} from 'react-router-dom'
const ByTopic = ({topic}) => {
    return <>
    <h1>By trends</h1>
    <Link className="btn btn-sm btn-dark" to={`/projects/${'out'}`}>Ver topics out</Link>
    <Link className="btn btn-sm btn-dark" to={`/projects/${'baby'}`}>Ver topics baby</Link>
    
    </>
}

export default ByTopic