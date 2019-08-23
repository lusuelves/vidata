import axios from 'axios'

export default class projectServices {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        })
    }

    getProjects = () => this.service.get('getAllProjects')
    getOneProject = id => this.service.get(`getOneProject/${id}`)
    postProject = theNewProject => this.service.post(`postProject`, theNewProject)
    postProjectTrends = theNewProject => this.service.post(`postProject/Trends`, theNewProject)
    postProjectWords = theNewProject => this.service.post(`postProject/Words`, theNewProject)
    postProjectUser = theNewProject => this.service.post(`postProject/User`, theNewProject)
}