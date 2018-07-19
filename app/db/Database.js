import { Config } from './config';
import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',//UUID
    task: 'string',
    done: 'bool'
  }
};


export default class Database {

  static realmInstance = null; // Use a singleton connection to realm for performance.

  static async getRealmInstance(options = {}) {

    // Connect to realm if database singleton instance has not already been created.
    if (Database.realmInstance === null) {

      Database.realmInstance = await Realm.open({
        schema: [TaskSchema]

        // Look up shouldCompactOnLaunch to auto-vacuum https://github.com/realm/realm-js/pull/1209/files

      });

    }
    return Database.realmInstance;
  }
}
