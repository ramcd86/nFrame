import * as $ from 'jquery';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Import 3rd party TS files.

import { TestTS } from '../../webTS/_source/tstest-ng';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


if (document.querySelector('#testTag')) {
  new TestTS().init();
}

