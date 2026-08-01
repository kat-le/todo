import { format, isBefore, isToday, parseISO } from "date-fns";

export default class Todo {
  constructor(title, desc, date, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.date = date ? parseISO(date) : null;
    this.priority = priority;
    this.completed = false;
  }

  formatDate() {
    return format(this.date, "EEE MM/dd/yy");
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  edit({ title, desc, date, priority }) {
    if (title !== undefined) this.title = title;
    if (desc !== undefined) this.desc = desc;
    if (date !== undefined) this.date = parseISO(date);
    if (priority !== undefined) this.priority = priority;
  }
}
