import TodoService from '../realm/TodoService';

class TodoApi {
  static async getTasks() {
    const response = await fetch('http://10.0.2.2:3000/tasks');
    const tasks = await response.json();
    console.log(tasks);
    if (tasks) {
      tasks.data.forEach((task) => {
        try {
          TodoService.upsert(task);
        } catch (e) {
          console.log(`upsert ${task} error: ${e.message} `);
        }
      });
    }
  }
}

module.exports = TodoApi;
