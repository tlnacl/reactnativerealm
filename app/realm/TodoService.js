import Realm from 'realm';
import TodoModel from './TodoModel';

const repository = new Realm({
  schema: [
    {
      name: 'Todo',
      primaryKey: '_id',
      properties: {
        _id: { type: 'string', indexed: true },
        name: 'string',
        completed: 'bool',
        createdAt: 'date',
        updatedAt: 'date'
      }
    }
  ]
});

const TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    return repository.objects('Todo').sorted(sortBy);
  },
  save: function(todo) {
    if (
      repository.objects('Todo').filtered("name = '" + todo.name + "'").length
    )
      return;
    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    });
  },
  update: function(todo, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  }
};

TodoService.save(new TodoModel('Hello Koding'));
TodoService.save(new TodoModel('Make a Todo App with React Native'));
TodoService.save(new TodoModel('Check to complete a todo'));
TodoService.save(new TodoModel('Long press, drag and drop a todo to sort'));
TodoService.save(new TodoModel('Save data with Realm'));
TodoService.save(new TodoModel('Sync data with Firebase'));

export default TodoService;
