import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

const appConfigProvider = { provide: 'appConfig', useValue: appConfig };

// Bootstrap the application with AppComponent and provide appConfig
bootstrapApplication(AppComponent, {
  providers: [
    appConfigProvider,
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(), provideCharts(withDefaultRegisterables())
  ],
}).catch((err) => console.error(err));
 
