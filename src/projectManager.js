export default class ProjectManager {
    constructor() {
        this.projects = []
    }

    addProject(project) {
        this.projects.push(project)
    }

    removeProject(id) {
        this.projects = this.projects.filter(
            project => project.id !== id
        );
    }

    findProject(id) {
        return this.projects.find(
            project => project.id === id
        );

    }
}