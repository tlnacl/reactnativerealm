import RealmDb from './RealmDb';

const LocationService = {
  getLocation() {
    return RealmDb.get().objects('Location').filtered('name = "location"');
  },
  upsertLocation(location) {
    RealmDb.get().write(() => {
      RealmDb.get().create('Location', { name: 'location', ...location, updatedAt: new Date() }, true);
    });
  },
};

export default LocationService;
