import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { NotificationService } from './notification.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppConfig } from 'src/app.config';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ConfirmDeleteDialogComponent } from './shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MessageDialog } from './messageDialog/message-dialog';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { LessonsComponent } from './lessons/lessons.component';
import { StudentsComponent } from './students/students.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoaderComponent } from './shared/loader/loader.component';
export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ConfirmDeleteDialogComponent,
    MessageDialog,
    LessonsComponent,
    StudentsComponent,
    NewExamComponent,
    NewStudentComponent,
    LoaderComponent,
    NewLessonComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,

MatSelectModule,
MatMenuModule,
MatIconModule,
MatDividerModule,
MatDatepickerModule,
ToastrModule.forRoot({
  closeButton: true,
  timeOut: 3000, // 15 seconds
  progressBar: true,
}),

  ],
  providers: [
    DatePipe,
    AppConfig,
    AppService,
    NotificationService,
    HttpClientModule,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig, HttpClientModule],
      multi: true,
    },
    provideAnimations(), 
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
