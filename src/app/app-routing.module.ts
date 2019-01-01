import { HomeComponent } from './components/home/home.component';
import { ApplicationsComponent } from './components/applications/applications.component'

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailsComponent } from './components/application/application.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { path: 'applications', component: ApplicationsComponent },
    { path: 'application/:name', component: ApplicationDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
