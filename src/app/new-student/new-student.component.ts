import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppService } from '../app.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent {
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
      name: [null, Validators.required],
      surname: [, [Validators.required]],
      class: [, [Validators.required]],
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
     
      
      this.dropdownList=data.response.data
      this.options = this.dropdownList
    });}

    lessons() {
      this.cabinet.getLessons("","","",1,10000).subscribe(data => {
      
        
        this.less= [... new Set( data.response.data.map(x=>{return x.class}))]
       
      
      });}

      public filterOptions(filter): void {
       
        
        this.options = this.dropdownList.filter(x => x.name.toLowerCase().includes(filter.value.toLowerCase()));
       }

    getStudentInfo(){
      this.cabinet.getStudentDetail(this.id).subscribe(res => {
        if (!(res.Status && res.Status.errorCode == 1)) {
          this.newExam.get("id").setValue(res.response.id);
          this.newExam.get("name").setValue(res.response.name);
          this.newExam.get("surname").setValue(res.response.surname);
          this.newExam.get("class").setValue(res.response.class);
        }
      });
    }
    
     createStudent(){

      this.spinner=true;
    
    this.buttonDisabled = true
    this.cabinet.creOrUpdStudent(this.newExam.getRawValue()).subscribe(res => {
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
      this.router.navigate(['stud']);
    }

    onSubmit() {
      this.submitted = true; 
      console.log(this.newExam);
      
      if (this.newExam.valid) {
   
        this.createStudent()
        this.router.navigate(['stud']);
      }
    }
 
 
}
