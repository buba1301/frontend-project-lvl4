// @ts-nocheck
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import './lib/i18n';

import gon from 'gon';
import app from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app(gon);

console.log('it works!');
console.log('gon', gon);
