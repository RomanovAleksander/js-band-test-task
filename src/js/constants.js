export const todoList = document.querySelector('.todo-list'),
             filter = document.querySelector('.filter'),
             search = document.querySelector('.filter__search'),
             create = document.querySelector('.filter__create-btn'),
             cancel = document.querySelector('.cancel-btn'),
             form = document.querySelector('.form-wrapper'),
             inputTitle = document.querySelector('.title_input'),
             inputDescription = document.querySelector('.description_input'),
             changePriority = document.querySelector('.change-priority'),
             options = {
               searchText: '',
               priority: 'all',
               completed: 'all',
               index: ''
             };
