import uuid from 'react-native-uuid'

class TodoModel {
  constructor(name, completed) {
    this._id = uuid.v4();
    this.name = name;
    this.completed = completed || 'false';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default TodoModel;
