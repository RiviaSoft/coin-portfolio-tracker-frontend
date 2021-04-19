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
import { SummaryComponent } from './components/summary/summary.component';
import { AnalyzesComponent } from './components/analyzes/analyzes.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    NaviComponent,
    WalletsComponent,
    WalletDetailComponent,
    ArchivedOperationsComponent,
    SummaryComponent,
    AnalyzesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
