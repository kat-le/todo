export default class ProjectManager {
    constructor() {
        this.projects = []
        this.activeProject = null
    }

    addProject(project) {
        this.projects.push(project)
        if (!this.activeProject) {
            this.activeProject = project;
        }
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

    setActiveProject(id) {
        this.activeProject = this.projects.find(
            project => project.id === id
        );
    }
}