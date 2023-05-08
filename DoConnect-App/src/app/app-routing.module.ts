import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AnswerListComponent } from './answer-list/answer-list.component';


export const routes: Routes = [
    { path: 'answer/:id', component: AnswerListComponent },
    { path: 'search/:keyword', component: QuestionListComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'questions', component: QuestionListComponent },
    { path: 'question/detail', component: QuestionDetailComponent },
    { path: 'createquestion', component: CreateQuestionComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
