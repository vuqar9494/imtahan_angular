import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LessonsComponent } from './lessons/lessons.component';
import { StudentsComponent } from './students/students.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { NewStudentComponent } from './new-student/new-student.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'less', component:LessonsComponent},
  {path:'stud', component:StudentsComponent},
  {path:'new-exam', component:NewExamComponent},
  {path:'new-less', component:NewLessonComponent},
  {path:'new-stud', component:NewStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
