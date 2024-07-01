import { JSDOM } from 'jsdom';
import * as register from 'node:module';
import { pathToFileURL } from 'node:url';

register.register('ts-node/esm', pathToFileURL('./'));

const jsdom = new JSDOM('<body><div id="app"></div></body>', { url: 'https://example.org' });

global.window = jsdom.window;
global.document = jsdom.window.document;



