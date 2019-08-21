import axios from 'axios'

export default class projectTrendsServices {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        })
    }

    // getProjects = () => this.service.get('getAllProjects')
    // getOneProject = id => this.service.get(`getOneProject/${id}`)
    postProjectTrends = theNewProject => this.service.post(`postProjectTrends`, theNewProject)

}