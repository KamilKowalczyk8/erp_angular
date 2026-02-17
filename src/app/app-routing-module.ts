import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './features/main-layout/main-layout';
import { Inventory } from './features/inventory/inventory';

const routes: Routes = [
 { 
    path: 'login',
    component: Dashboard 
  },

  { 
    path: '', 
    component: MainLayout, 
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },

      { 
        path: 'inventory', 
        component: Inventory 
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
