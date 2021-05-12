import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AnalyzesComponent } from './components/analyzes/analyzes.component';
import { ArchivedOperationsComponent } from './components/archived-operations/archived-operations.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SummaryComponent } from './components/summary/summary.component';
import { WalletDetailComponent } from './components/wallet-detail/wallet-detail.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {path : '', component:WelcomeComponent, children: [
    { path: '',pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent }
  ]},
  {path:"home", component:HomeComponent,canActivate: [LoginGuardService], children: [
    {path : "dashboard", pathMatch: 'full', component:DashboardComponent, canActivate: [LoginGuardService]},
    {path : "summary", pathMatch: 'full', component:SummaryComponent, canActivate: [LoginGuardService]},
    {path : "wallets", pathMatch: 'full', component:WalletsComponent, canActivate: [LoginGuardService]},
    {path : "archivedops", pathMatch: 'full', component:ArchivedOperationsComponent, canActivate: [LoginGuardService]},
    {path : "analyzes", pathMatch: 'full', component:AnalyzesComponent, canActivate: [LoginGuardService]},
    {path : "wallets/:walletid", pathMatch: 'full', component:WalletDetailComponent, canActivate: [LoginGuardService]}
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
