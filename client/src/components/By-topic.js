import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/profile.css'

const ByTopic = ({topic}) => {
    return <>
    <h1>By trends</h1>
    <Link className="btn-profile" to={{pathname: `/projects/${topic}`, state: topic}}>Ver topics {topic}</Link>
    <Link className="btn-profile" to={`/projects/${'baby'}`}>Ver topics baby</Link>
    
    </>
}

export default ByTopic