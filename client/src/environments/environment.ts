// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
  firebase: {
    projectId: 'armwrestlingbook',
    appId: '1:337243646890:web:dcc9fe586d43229a7c59d3',
    databaseURL: 'https://armwrestlingbook-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'armwrestlingbook.appspot.com',
    apiKey: 'AIzaSyADFzIRvkcdmH-_u1sVarI37tXznUcXjvw',
    authDomain: 'armwrestlingbook.firebaseapp.com',
    messagingSenderId: '337243646890',
    measurementId: 'G-8VCRVNVL7H',
  },
  production: false,
  // firebaseConfig: {
  //   apiKey: "AIzaSyADFzIRvkcdmH-_u1sVarI37tXznUcXjvw",
  //   authDomain: "armwrestlingbook.firebaseapp.com",
  //   projectId: "armwrestlingbook",
  //   storageBucket: "armwrestlingbook.appspot.com",
  //   messagingSenderId: "337243646890",
  //   appId: "1:337243646890:web:dcc9fe586d43229a7c59d3",
  //   measurementId: "G-8VCRVNVL7H"
  // }
};

// const app = initializeApp(environment.firebaseConfig);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
