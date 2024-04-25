import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

const BASE_URL = new InjectionToken<string>('');

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve: any) => {
      authService
        .getUserByToken()
        .subscribe()
        .add(() => resolve(null));
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatDialogModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    // {
    //   provide: BASE_URL,
    //   useValue: environment.apiUrl,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
