import React from 'react'
import { Link } from 'react-router-dom'

//import '../styles/project-card.css'


const ProjectCard = ({ title, topic, description, creatorId, _id }) => {

    return (
        <div className="col-3">
            <article>
                <h4>{title}</h4>
                <h5>{topic}</h5>
                <p>{description}</p>
                {/* <small>{creatorId._id}</small> */}
                <hr></hr>
                <Link className="btn btn-sm btn-dark" to={`/project/${_id}`}>Ver detalles</Link>
            </article>
        </div>
    )
}

export default ProjectCard