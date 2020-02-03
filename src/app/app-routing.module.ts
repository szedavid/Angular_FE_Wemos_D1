import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { ControllerComponent } from './controller/controller.component';


const routes: Routes = [
  {path: '', redirectTo: 'monitor', pathMatch: 'full'},
  {path: 'monitor', component: MonitorComponent},
  {path: 'controller', component: ControllerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
