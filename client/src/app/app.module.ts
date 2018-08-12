// ANGULAR NATIVE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ROUTING MODULES
import { AppRoutingModule, routingComponents } from './app.routing-module';

// CUSTOM MODULES
import { ModalsModules } from './modals/modals.module';
import { IconModule } from './icon.module';

// INTERCEPTORS
import { httpInterceptorProviders } from './services/interceptors';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoggerComponent } from './components/logger/logger.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { LoginComponent } from './components/login/login.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoggerComponent,
    LoginComponent,
    CardsListComponent,
    SubscriptionsListComponent,
    PlansListComponent,
    routingComponents
  ],
  imports: [
    IconModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ModalsModules
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
