import uuid from 'react-native-uuid'

class TodoModel {
  constructor(title, completed) {
    this.id = uuid.v4();
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default TodoModel;
