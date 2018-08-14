import Realm from 'realm';

const TodoSchema = {
  name: 'Todo',
  primaryKey: '_id',
  properties: {
    _id: { type: 'string', indexed: true },
    name: 'string',
    completed: 'string',
    createdAt: 'date',
    updatedAt: 'date?',
  },
};

const LocationSchema = {
  name: 'Location',
  primaryKey: 'name',
  properties: {
    name: 'string',
    latitude: 'float',
    longitude: 'float',
    updatedAt: 'date',
  },
};

export default class RealmDb {
  static realmInstance = null;

  static get() {
    if (RealmDb.realmInstance === null) {
      RealmDb.realmInstance = new Realm({
        // path: options.realmPath || Config.REALM_PATH,
        // schemaVersion: Config.REALM_SCHEMA_VERSION,
        schema: [TodoSchema, LocationSchema],
      });
    }
    return RealmDb.realmInstance;
  }
}
