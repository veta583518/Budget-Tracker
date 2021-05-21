// create variable to hold db connection
let db;
// establish a connection to IndexDB database called 'budget_tracker' and set it to version 1
const request = indexedDB.open("budget_tracker", 1);
// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called 'new_transaction', set it to have an auto incrementing primary key of sorts
  db.createObjectStore("new_transaction", { autoIncrement: true });
  // upon a successful request
  request.onsuccess = function (event) {
    // when db is successfully created with it's object store (from onupgradeneeded event above) or simply establish a connrction, save referemce to db in global variable
    db = event.target.result;

    // check if an app is online, if yes run uploadTransaction()function to send all local data to api
    if (navigator.onLine) {
      // we haven't created this yet, but we will soon, so let's comment it out for now
      // upload Pizza();
    }
  };

  request.onerror = function (event) {
    // log error here
    console.log(event.target.errorCode);
  };
};
