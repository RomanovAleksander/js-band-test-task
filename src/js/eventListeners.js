import {
  cancel,
  create,
  filter,
  form,
  inputDescription,
  inputTitle,
  options,
  search,
  todoList
} from "./constants";
import Action from './todoActions';

const hideMenu = (key) => {
  document.querySelector(`[data-id='${key}']`).classList.toggle('display_none');
};

todoList.addEventListener('click', event => {
  const itemKey = event.target.parentElement.dataset.id;
  if (event.target.classList.contains('task-delete')) {
    Action.delete(itemKey);
  }
  if (event.target.classList.contains('task-done')) {
    Action.close(itemKey);
    Action.filter();
    document.querySelector(`[data-check='${itemKey}']`).classList.remove('display_none');
    hideMenu(itemKey);
  }
  if (event.target.classList.contains('task-edit')) {
    Action.edit(itemKey);
    hideMenu(itemKey);
  }
  if (event.target.classList.contains('todo__button')) {
    const key = event.target.dataset.menu;
    document.querySelector(`[data-id='${key}']`).classList.toggle('display_none')
  }
  if (event.target.classList.contains('todo__check')) {
    Action.open(event.target.parentElement.id);
    Action.filter();
  }
});

filter.addEventListener('change', (event) => {
  const target = event.target;
  if (target.classList.contains('select-status')) {
    options.completed = target.value;
    Action.filter();
  }
  if (target.classList.contains('select-priority')) {
    options.priority = target.value;
    Action.filter();
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (options.index !== '') {
    Action.rewrite();
  } else {
    Action.create();
  }
  form.classList.add('display_none');
  Action.filter();
});

create.addEventListener('click', () => {
  form.classList.remove('display_none');
  inputTitle.value = '';
  inputDescription.value = '';
});

cancel.addEventListener('click', () => {
  form.classList.add('display_none');
  options.index = '';
});

search.addEventListener('input', (event) => {
  options.searchText = event.target.value.trim().toLowerCase();
  Action.filter(options);
});
