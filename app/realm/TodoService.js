import RealmDb from "./RealmDb";

const TodoService = {
  findAll: function() {
    return RealmDb.get().objects('Todo');
  },
  save: function(todo) {
    console.log(`save todo: ${todo.name}`);
    RealmDb.get().write(() => {
      todo.updatedAt = new Date();
      RealmDb.get().create('Todo', todo);
    });
  },
  upsert: function(todo) {
    RealmDb.get().write(() => {
      RealmDb.get().create('Todo', todo, true);
    });
  },
  update: function(todo, callback) {
    if (!callback) return;
    RealmDb.get().write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  }
};

export default TodoService;
