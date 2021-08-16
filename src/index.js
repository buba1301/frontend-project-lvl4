// @ts-nocheck
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import WebFontLoader from 'webfontloader';
import '../assets/application.scss';
import './lib/i18n';

import gon from 'gon';
import init from './init';

WebFontLoader.load({
  google: {
    families: ['Open Sans:300,400,700'],
  },
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(gon);
