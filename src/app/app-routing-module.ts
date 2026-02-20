import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './features/main-layout/main-layout';
import { Inventory } from './features/inventory/inventory';
import { Clients } from './features/clients/clients';
import { AuthGuard } from './core/guards/auth.guard';
import { Sales } from './features/sales/sales';
import { Desktop } from './features/desktop/desktop';

const routes: Routes = [
 { 
    path: 'login',
    component: Dashboard 
  },

  { 
    path: '', 
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },

      { 
        path: 'inventory', 
        component: Inventory,
        data: { title: 'Moduł Magazynowy' }
      },

      {
        path: 'sales',
        component: Sales,
        data: { title: 'Moduł Sprzedażowy' }
      },

      {
        path: 'desktop',
        component: Desktop,
        data: { title: 'Pulpit' }
      },

      {
        path: 'clients',
        component: Clients,
        data: { title: 'Moduł Kliencki' }
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
