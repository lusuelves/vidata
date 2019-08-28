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
    likeOneProject = project => this.service.post(`likeOneProject`, project)
    commentOneProject = project => this.service.post(`commentOneProject`, project)
    getProjectsTopic = topic => this.service.get(`getProjects/${topic}`)
    postProject = theNewProject => this.service.post(`postProject`, theNewProject)
    myProjects = () => this.service.get(`myProjects`)
    postProjectTrends = theNewProject => this.service.post(`postProject/Trends`, theNewProject)
    postProjectWords = theNewProject => this.service.post(`postProject/Words`, theNewProject)
    updateProjectWords = theNewProject => this.service.post(`updateProject/Words`, theNewProject)  
    postProjectUser = theNewProject => this.service.post(`postProject/User`, theNewProject)
}