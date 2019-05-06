// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyA59wgKqBfpgup5MGU8hH4gid5DTHJ5WQM",
    authDomain: "gestion-aabbb.firebaseapp.com",
    databaseURL: "https://gestion-aabbb.firebaseio.com",
    projectId: "gestion-aabbb",
    storageBucket: "gestion-aabbb.appspot.com",
    messagingSenderId: "294148972192"
  }
};


/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
