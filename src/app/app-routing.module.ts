import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CompleteComponent } from './complete-profile/complete-profile.component';
import { UserPageComponent } from './user-page/user-page.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  },
  {
    path: 'user/:name',
    component: UserPageComponent,
    canActivate: [AuthGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
