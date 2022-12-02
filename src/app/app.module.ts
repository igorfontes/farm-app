import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GlebeListComponent } from './glebes/glebe-list/glebe-list.component';
import { ProductionListComponent } from './productions/production-list/production-list.component';
import { FarmListComponent } from './farms/farm-list/farm-list.component';
import { FormsModule } from '@angular/forms';
import { FarmDialogsComponent } from './farms/farm-dialogs/farm-dialogs.component';
import { GlebeDialogsComponent } from './glebes/glebe-dialogs/glebe-dialogs.component';
import { ProductionDialogsComponent } from './productions/production-dialogs/production-dialogs.component';
import { RouterModule, Routes } from '@angular/router';
import { AddFarmComponent } from './farms/add-farm/add-farm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateGlebeComponent } from './glebes/add-update-glebe/add-update-glebe.component';
import { AddUpdateProductionComponent } from './productions/add-update-production/add-update-production.component';

const appRoutes: Routes = [
  { path: 'farms', component: FarmListComponent },
  { path: 'farms/:farmId/glebes', component: GlebeListComponent },
  { path: 'farms/:farmId/glebes/:glebeId/productions', component: ProductionListComponent }, 
];

@NgModule({
  declarations: [
    AppComponent,
    GlebeListComponent,
    ProductionListComponent,
    FarmListComponent,
    FarmDialogsComponent,
    GlebeDialogsComponent,
    ProductionDialogsComponent,
    AddFarmComponent,
    AddUpdateGlebeComponent,
    AddUpdateProductionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
