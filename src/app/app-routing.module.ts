import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedOperationsComponent } from './components/archived-operations/archived-operations.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SummaryComponent } from './components/summary/summary.component';
import { WalletDetailComponent } from './components/wallet-detail/wallet-detail.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { WhaleAlertComponent } from './components/whale-alert/whale-alert.component';

const routes: Routes = [
  {path : "", component:DashboardComponent},
  {path : "summary", component:SummaryComponent},
  {path : "wallets", component:WalletsComponent},
  {path : "wallets/:walletId", component:WalletDetailComponent},
  {path : "archivedops", component:ArchivedOperationsComponent},
  {path : "whalealert", component:WhaleAlertComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
