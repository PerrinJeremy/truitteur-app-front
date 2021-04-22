import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteComponent } from './complete-profile/complete-profile.component';
import { RedactionComponent } from './redaction/redaction.component';
import { AbonnementsComponent } from './abonnements/abonnements.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { PublicationComponent } from './publication/publication.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { AccountPreviewComponent } from './account-preview/account-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleComponent,
    NavigationComponent,
    SidebarComponent,
    SignupComponent,
    LoginComponent,
    CompleteComponent,
    RedactionComponent,
    AbonnementsComponent,
    ImageLoaderComponent,
    UserPageComponent,
    UserHeaderComponent,
    PublicationComponent,
    ModalComponent,
    HomeComponent,
    AccountPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    MatDialogModule,
    NoopAnimationsModule 
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
