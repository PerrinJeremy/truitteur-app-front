import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CompleteComponent } from './complete-profile/complete-profile.component';
import { ArticlesComponent } from './articles/articles.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ArticlesContainerComponent } from './articles-container/articles-container.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: ArticlesContainerComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ArticlesComponent
          }
        ]
      }
    ],
  },
  {
    path: 'complete-profile',
    component: CompleteComponent
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