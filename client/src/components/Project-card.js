import React from 'react'
import { Link } from 'react-router-dom'

//import '../styles/project-card.css'


const ProjectCard = ({ title, topic, description, imageUrl, creatorId, _id }) => {

    return (
        <div className="col-3">
            <article>
                <img src={imageUrl} alt={title} />
                <h4>{title}</h4>
                <h5>{topic}</h5>
                <hr></hr>
                <Link className="btn btn-sm btn-dark" to={`/projects/${_id}`}>Ver detalles</Link>
                <p>{description}</p>
            </article>
        </div>
    )
}

export default ProjectCard