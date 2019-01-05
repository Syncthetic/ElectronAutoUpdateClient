import { HomeComponent } from './components/home/home.component';
import { ApplicationsComponent } from './components/applications/applications.component'

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailsComponent } from './components/application/application.component';

import { AuthenticatedGuard as AuthGuard } from './authenticated.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
    { path: 'application/:name', component: ApplicationDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
