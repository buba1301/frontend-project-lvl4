// @ts-nocheck
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import './lib/i18n';

import gon from 'gon';
import init from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(gon);
