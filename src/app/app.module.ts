import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NaviComponent } from './components/navi/navi.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { WalletDetailComponent } from './components/wallet-detail/wallet-detail.component';
import { ArchivedOperationsComponent } from './components/archived-operations/archived-operations.component';
import { WhaleAlertComponent } from './components/whale-alert/whale-alert.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    NaviComponent,
    WalletsComponent,
    WalletDetailComponent,
    ArchivedOperationsComponent,
    WhaleAlertComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
