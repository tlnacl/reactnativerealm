import Realm from 'realm';

const repository = new Realm({
  schema: [
    {
      name: 'Todo',
      primaryKey: '_id',
      properties: {
        _id: { type: 'string', indexed: true },
        name: 'string',
        completed: 'string',
        createdAt: 'date',
        updatedAt: 'date?'
      }
    }
  ]
});

const TodoService = {
  findAll: function() {
    return repository.objects('Todo');
  },
  save: function(todo) {
    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    });
  },
  upsert: function(todo) {
    repository.write(() => {
      repository.create('Todo', todo, true);
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

export default TodoService;
