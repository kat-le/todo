export default class Project {
  constructor(title, desc) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  findTodo(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  edit({ title, desc }) {
    if (title !== undefined) this.title = title;
    if (desc !== undefined) this.desc = desc;
  }

  getCompletionPercentage() {
    if (this.todos.length === 0) return 0;

    const completed = this.todos.filter((todo) => todo.completed).length;

    return Math.round((completed / this.todos.length) * 100);
  }
}
