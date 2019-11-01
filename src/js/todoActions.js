import {
  changePriority,
  form,
  inputDescription,
  inputTitle,
  options,
  todoList
} from "./constants";

class Action {
  constructor() {
    this.todoItems = [];
  }

  render(todo) {
    let isDone = todo.completed === 'done' ? 'done' : '';
    todoList.insertAdjacentHTML('afterbegin', `
    <div class="todo ${isDone}" id="${todo.id}">
      <div class="todo__check display_none" data-check="${todo.id}">✔</div>
      <h3 class="todo__title" data-title="${todo.id}">${todo.title}</h3>
      <div class="todo__description" data-description="${todo.id}">${todo.description}</div>
      <div class="todo__footer">
        <div class="todo__priority" data-priority="${todo.id}">${todo.priority}</div>
        <div class="todo__button btn" data-menu="${todo.id}">...
          <div class="todo__menu display_none" data-id="${todo.id}">
            <div class="todo__menu-item task-done">done</div>
            <div class="todo__menu-item task-edit">edit</div>
            <div class="todo__menu-item task-delete">delete</div>
          </div>
        </div>
      </div>
    </div>
  `);
  }

  filter() {
    this.todoItems.forEach(item => {
      const todo = document.getElementById(item.id);
      const todoDone = todo.classList.contains('done');

      if (options.priority !== 'all') {
        if (options.priority !== item.priority) {
          todo.classList.add('hidden');
        } else {
          todo.classList.remove('hidden');
        }
      } else {
        todo.classList.remove('hidden');
      }

      if (options.completed !== 'all') {
        if (options.completed === 'done') {
          if (!todoDone) {
            todo.classList.add('hidden');
          }
        } else if (options.completed === 'open') {
          if (todoDone) {
            todo.classList.add('hidden');
          }
        }
      }

      if (options.searchText !== '') {
        if (!item.title.toLowerCase().includes(options.searchText)) {
          todo.classList.add('hidden');
        }
      }
    });
  }

  create() {
    const todo = {
      title: '',
      description: '',
      priority: '',
      completed: 'open',
      id: Date.now()
    };
    todo.title = inputTitle.value.trim();
    todo.description = inputDescription.value.trim();
    todo.priority = changePriority.value;
    this.todoItems.push(todo);
    inputTitle.value = '';
    inputDescription.value = '';
    this.render(todo);
  }

  rewrite() {
    const index = options.index;
    const id = this.todoItems[index].id;
    const title = document.querySelector(`[data-title='${id}']`);
    const description = document.querySelector(`[data-description='${id}']`);
    const priority = document.querySelector(`[data-priority='${id}']`);

    this.todoItems[index].title = inputTitle.value.trim();
    this.todoItems[index].description = inputDescription.value.trim();
    this.todoItems[index].priority = changePriority.value;
    title.innerHTML = `${this.todoItems[index].title}`;
    description.innerHTML = `${this.todoItems[index].description}`;
    priority.innerHTML = `${this.todoItems[index].priority}`;
    options.index = '';
  }

  edit(key) {
    const index = this.todoItems.findIndex(item => item.id === Number(key));
    const item = this.todoItems[index];
    options.index = `${index}`;
    form.classList.remove('display_none');
    inputTitle.value = item.title;
    inputDescription.value = item.description;
    changePriority.value = item.priority;
    form.classList.remove('display_none');
  }

  delete(key) {
    this.todoItems = this.todoItems.filter(item => item.id !== Number(key));
    const item = document.getElementById(`${key}`);
    item.remove();
  }

  close(key) {
    const index = this.todoItems.findIndex(item => item.id === Number(key));
    const item = document.getElementById(`${key}`);
    this.todoItems[index].completed = 'done';
    item.classList.add('done');
  }

  open(key) {
    const index = this.todoItems.findIndex(item => item.id === Number(key));
    const item = document.getElementById(`${key}`);
    this.todoItems[index].completed = 'open';
    item.classList.remove('done');
    document.querySelector(`[data-check='${key}']`).classList.add('display_none');
  }
}

export default new Action();
