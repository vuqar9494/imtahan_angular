import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppService } from '../app.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent {
  dropdownSettings:IDropdownSettings={};
  spinner=false;
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
      lessonId: [, Validators.required],
      studentId: [, [Validators.required]],
      examDate: [, [Validators.required]],
      point: [, [Validators.required]],
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

  onChange(e){
    console.log(e,this.options);
    this.options=this.dropdownList.filter(x=>x.class==this.less.filter(x=>x.id==e).map(x=>{return x.class})[0])
console.log(this.less.filter(x=>x.id==e).map(x=>{return x.class})[0],this.options);

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

      public filterOptions(filter): void {
       
        
        this.options = this.dropdownList.filter(x => x.name.toLowerCase().includes(filter.value.toLowerCase()));
       }

    getStudentInfo(){
      this.cabinet.getAllDetail(this.id).subscribe(res => {
        if (!(res.Status && res.Status.errorCode == 1)) {
          this.newExam.get("id").setValue(res.response.examId);
          this.newExam.get("lessonId").setValue(+res.response.lesId);
          this.newExam.get("studentId").setValue(+res.response.studId);
          this.newExam.get("examDate").setValue(res.response.examDate);
          this.newExam.get("point").setValue(res.response.point);
        }
      });
    }
    
     createStudent(){

    this.newExam.get('examDate').setValue(this.cabinet.convertToLocalDate(this.newExam.get('examDate').value));
    this.spinner=true;
    
    this.buttonDisabled = true
    this.cabinet.creOrUpdExam(this.newExam.getRawValue()).subscribe(res => {
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
      this.router.navigate(['']);
    }

    onSubmit() {
      
      this.submitted = true; 
      console.log(this.newExam);
      
      if (this.newExam.valid) {
   
        this.createStudent()
        this.router.navigate(['']);
      }
    }
 
 
}
