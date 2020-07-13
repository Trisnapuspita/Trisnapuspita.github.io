var dbPromised = idb.open("fb", 1, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team added");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function checkFav(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (fav) {
        if (fav !== undefined) {
          resolve(true);
        } else {
          reject();
        }
      });
  });
}

function deleteFav(teamId) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(teamId);
      return tx.complete;
    })
    .then(function () {
      console.log("Deleted successfully");
      M.toast({html: 'Favorite team deleted successfully!'});
      getFavoriteTeams();
    });
}

function deleteFavInside(teamId) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(teamId);
      return tx.complete;
    })
    .then(function () {
      console.log("Deleted successfully");
    });
}