import RealmDb from "./RealmDb";

const LocationService = {
  getLocation: function() {
    return RealmDb.get().objects('Location').filtered('name = "location"');
  },
  upsertLocation: function(location) {
    RealmDb.get().write(() => {
      RealmDb.get().create('Location', {name:'location', ...location, updatedAt: new Date()}, true);
    });
  },
  addListener: function(callback) {
    RealmDb.get().addListener('change', callback);
  },
  removeListener: function() {
    RealmDb.get().removeAllListeners('change');
  }
};

export default LocationService;
