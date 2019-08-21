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
    postProject = theNewProject => {
        console.log(this.service.post(`postProject`, theNewProject))
        return this.service.post(`postProject`, theNewProject)}
    postProjectTrends = theNewProject => this.service.post(`postProject/Trends`, theNewProject)
    updatePostTrends = theNewProject => this.service.post(`updatePost/Trends`, theNewProject)
}