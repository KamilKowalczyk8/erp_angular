import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MaterialModule } from '../shared/material/material.module';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './features/main-layout/main-layout';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Inventory } from './features/inventory/inventory';
import { Clients } from './features/clients/clients';
import { Sales } from './features/sales/sales';
import { Desktop } from './features/desktop/desktop';
import { AddProductDialog } from './features/inventory/add-product-dialog/add-product-dialog';
import { DeleteConfirmDialog } from './features/inventory/delete-confirm-dialog/delete-confirm-dialog';

@NgModule({
  declarations: [
    App,
    Dashboard,
    MainLayout,
    Inventory,
    Clients,
    Sales,
    Desktop,
    AddProductDialog,
    DeleteConfirmDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
