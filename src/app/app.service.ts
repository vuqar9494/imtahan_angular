import { Routes, Route, Router } from '@angular/router';
import { Injectable, Component, Inject } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app.config';
import { MatDialog } from '@angular/material/dialog';
//import { LoadingDialogComponent } from './dialogs/loading/loading.component';


@Injectable({
  providedIn: 'root',
})


export class AppService extends BaseService {
  myAppUrl: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

getAll(name,insname,lessname,clas,page,limit): Observable<any> {
 // console.log(AppConfig.settings);
  
  this.myAppUrl = AppConfig.settings.other.resourceApiURI;
  let url =this.myAppUrl + '/Lessons/get-exam-list?name='+name+'&insname='+insname+'&lessname='+lessname+'&clas='+clas+'&page='+page+'&limit='+limit
  return this.http.get<any>(url);
}

getStudent(name,surname,clas,page,limit): Observable<any> {
  // console.log(AppConfig.settings);
   
   this.myAppUrl = AppConfig.settings.other.resourceApiURI;
   let url =this.myAppUrl + '/Lessons/get-student-list?name='+name+'&surname='+surname+'&clas='+clas+'&page='+page+'&limit='+limit
   return this.http.get<any>(url);
 }

 getLessons(name,insname,clas,page,limit): Observable<any> {
  // console.log(AppConfig.settings);
   
   this.myAppUrl = AppConfig.settings.other.resourceApiURI;
   let url =this.myAppUrl + '/Lessons/get-lesson-list?name='+name+'&insname='+insname+'&clas='+clas+'&page='+page+'&limit='+limit
   return this.http.get<any>(url);
 }
 

 getAllDetail(id): Observable<any> {
  // console.log(AppConfig.settings);
   
   this.myAppUrl = AppConfig.settings.other.resourceApiURI;
   let url =this.myAppUrl + '/Lessons/get-all-detail?id='+id
   return this.http.get<any>(url);
 }
 
 getStudentDetail(id): Observable<any> {
   // console.log(AppConfig.settings);
    
    this.myAppUrl = AppConfig.settings.other.resourceApiURI;
    let url =this.myAppUrl +  '/Lessons/get-student-detail?id='+id
    return this.http.get<any>(url);
  }
 
  getLessonsDetail(id): Observable<any> {
   // console.log(AppConfig.settings);
    
    this.myAppUrl = AppConfig.settings.other.resourceApiURI;
    let url =this.myAppUrl +  '/Lessons/get-lesson-detail?id='+id
    return this.http.get<any>(url);
  }



  deleteAll(id): Observable<any> {
    // console.log(AppConfig.settings);
     
     this.myAppUrl = AppConfig.settings.other.resourceApiURI;
     let url =this.myAppUrl + '/Lessons/delete-exam?id='+id
     return this.http.get<any>(url);
   }
   
   deleteStudent(id): Observable<any> {
     // console.log(AppConfig.settings);
      
      this.myAppUrl = AppConfig.settings.other.resourceApiURI;
      let url =this.myAppUrl +  '/Lessons/delete-student?id='+id
      return this.http.get<any>(url);
    }
   
    deleteLesson(id): Observable<any> {
     // console.log(AppConfig.settings);
      
      this.myAppUrl = AppConfig.settings.other.resourceApiURI;
      let url =this.myAppUrl +  '/Lessons/delete-lesson?id='+id
      return this.http.get<any>(url);
    }
 

    creOrUpdLesson(model): Observable<any> {
      // console.log(AppConfig.settings);
       
       this.myAppUrl = AppConfig.settings.other.resourceApiURI;
       let url =this.myAppUrl +  '/Lessons/cre-or-upd-lesson'
       return this.http.post<any>(url,model);
     }
     creOrUpdStudent(model): Observable<any> {
      // console.log(AppConfig.settings);
       
       this.myAppUrl = AppConfig.settings.other.resourceApiURI;
       let url =this.myAppUrl +  '/Lessons/cre-or-upd-student'
       return this.http.post<any>(url,model);
     }
     creOrUpdExam(model): Observable<any> {
      // console.log(AppConfig.settings);
       
       this.myAppUrl = AppConfig.settings.other.resourceApiURI;
       let url =this.myAppUrl +  '/Lessons/cre-or-upd-exam'
       return this.http.post<any>(url,model);
     }
     convertToLocalDate(responseDate: any) {
      try {
        if (responseDate != null) {
          if (typeof (responseDate) === 'string') {
            if (String(responseDate.indexOf('T') >= 0)) {
              responseDate = responseDate.split('T')[0];
                }
              if (String(responseDate.indexOf('+') >= 0)) {
                responseDate = responseDate.split('+')[0];
              }
            }
        
            responseDate = new Date(responseDate);
            const newDate = new Date(responseDate.getFullYear(), responseDate.getMonth(), responseDate.getDate(), 0, 0, 0);
            const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;
        
            const finalDate: Date = new Date(newDate.getTime() - userTimezoneOffset);
            return finalDate;
            } else {
              return null;
            }
        } catch (error) {
          return responseDate;
      }
    }
}
