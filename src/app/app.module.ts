import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NaviComponent } from './components/navi/navi.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { ArchivedOperationsComponent } from './components/archived-operations/archived-operations.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AnalyzesComponent } from './components/analyzes/analyzes.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { LoginGuardService } from "./services/login-guard.service";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RecentOperationFilterPipe } from './pipes/recent-operation-filter.pipe';
import { ArchivedOperationFilterPipe } from './pipes/archived-operation-filter.pipe';
import { WalletDetailComponent } from './components/wallet-detail/wallet-detail.component';
import {Ng2OrderModule} from 'ng2-order-pipe'


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    NaviComponent,
    WalletsComponent,
    ArchivedOperationsComponent,
    SummaryComponent,
    AnalyzesComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    WelcomeComponent,
    RecentOperationFilterPipe,
    ArchivedOperationFilterPipe,
    WalletDetailComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SelectDropDownModule,
    Ng2OrderModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
