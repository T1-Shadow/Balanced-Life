import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { closeCircleOutline } from 'ionicons/icons';

addIcons(allIcons);

addIcons({
  'close-circle-outline': closeCircleOutline
});

export function storageFactory() {
  const storage = new Storage({
    name: '__mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });
  storage.create();
  return storage;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    provideMarkdown(),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Storage, useFactory: storageFactory },
    
  ],
});
