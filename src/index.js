// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import init from './app'

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(gon)

console.log('it works!');
console.log('gon', gon);
