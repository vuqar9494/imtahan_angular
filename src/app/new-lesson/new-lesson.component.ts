import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppService } from '../app.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent {
  dropdownSettings:IDropdownSettings={};
  
  id:any
  update:boolean = false
  studentsList:any[]
  coursesList:any[]
  activeStatuses:any[]
  newExam : FormGroup;
  buttonDisabled: boolean = false
  statusId:number;

  submitted = false;
  categor: any;
  departmen: any;
  sectio: any;
  dropdownList: any;
  filteredList: any;
  _unfilteredOptions: any;
  options: any;
  less: any;
  spinner: boolean;
  constructor(
    private cabinet :AppService,
    private notify: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    console.log(params['id']);
    
    })
    this.newExam = this.fb.group({
      id: [this.id, [Validators.required]],
      name: [, Validators.required],
      class: [, [Validators.required]],
      instructorName: [, [Validators.required]],
      instructorSurname: [, [Validators.required]],
    });
    this.newExam.get("id").setValue(this.id);
   }

  ngOnInit(): void {
    
    if(this.id != 0){
      this.update = true
      this.getStudentInfo()
    }
     this.students()
     this.lessons()
   
    

  }


  students() {
    this.cabinet.getStudent("","","",1,10000).subscribe(data => {
      console.log(data.response);
      
      this.dropdownList=data.response.data
      this.options = this.dropdownList
    });}

    lessons() {
      this.cabinet.getLessons("","","",1,10000).subscribe(data => {
        console.log(data.response);
        
        this.less=data.response.data
       
      });}

      

    getStudentInfo(){
      this.cabinet.getLessonsDetail(this.id).subscribe(res => {
        if (!(res.Status && res.Status.errorCode == 1)) {
          this.newExam.get("name").setValue(res.response.name);
          this.newExam.get("class").setValue(+res.response.class);
          this.newExam.get("instructorName").setValue(res.response.instructorName);
          this.newExam.get("instructorSurname").setValue(res.response.instructorSurname);
        }
      });
    }
    
     createStudent(){


      this.spinner=true;
    
    this.buttonDisabled = true
    this.cabinet.creOrUpdLesson(this.newExam.getRawValue()).subscribe(res => {
    console.log(res);
    if(res.status.errorCode !=1) {
    this.buttonDisabled = false
    this.notify.showSuccess(res.status.message,"")

    }else{
      this.buttonDisabled = false
      this.notify.showError(res.status.message,"")
    }
    this.spinner=false;
  });
    }

  
    back(){
      this.router.navigate(['less']);
    }

    onSubmit() {
      this.submitted = true; 
      console.log(this.newExam);
      
      if (this.newExam.valid) {
   
        this.createStudent()
        this.router.navigate(['less']);
      }
    }
 
 
}
