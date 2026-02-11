import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './features/main-layout/main-layout';

const routes: Routes = [
  { 
    path: 'login',
    component: Dashboard 
  },

  { 
    path: '', 
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
