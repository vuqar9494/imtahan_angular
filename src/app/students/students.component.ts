import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { ConfirmDeleteDialogComponent } from '../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

 
  courseList:Array<any>;
  courseStatus:Array<any>;
  
  isStudent:boolean=false;
  isInstructor:boolean=false;
  isAdmin:boolean=false;
  roles:Array<string>;
  
  total: number;
  pageSize: number = 8;
  currentPage: number = 0;
  
  //filter fields
  insname:any=""
  name :any="";
  lessname:string="";
  clas:any="";
  
  
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  courseType: any;
  activeStatus: any;
    class: any;
    less: unknown[];
    inst: unknown[];
  surname: any;
  spinner: boolean;
  
  constructor(private service:AppService,public dialog: MatDialog,private notify: NotificationService,private route: ActivatedRoute, private router: Router,private datePipe: DatePipe) { }
  
  ngOnInit(): void {
    this.getclass()
   this.getCourseList(1,this.pageSize);
  }
  gotoNewCourse(id=null){
    console.log(id);
  
   
       this.router.navigate(['/new-course']);
   
   
  }
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getNextData((this.currentPage + 1), this.pageSize);
  }
  getNextData(page, limit) {
    this.getCourseList(page,limit);
  }
  getCourseList(page,limit){
    this.spinner=true;
    this.service.getStudent(this.name.split(' ')[0],(this.name.split(' ')[1]==undefined ?'':this.name.split(' ')[1]),this.clas,page,limit).subscribe(
      res=>{
        this.courseList=res.response.data;
        this.total=res.response.total;
            this.paginator.length=this.total;
            if(this.paginator.pageIndex>0&&this.paginator.pageIndex*this.paginator.pageSize==this.total){
              this.paginator.previousPage();
            }
            this.spinner=false;
      }
      
    )
  }
  
  getclass(){
    this.service.getLessons("","","",1,10000).subscribe(
      res=>{
  
        let arr=res.response.data.map(x=>x.class)
       this.class=[...new Set(arr)];
        console.log(this.class);
        let arrr=res.response.data.map(x=>x.name)
        this.less=[...new Set(arrr)];
         console.log(this.less);
        
          arr=res.response.data.map(x=>x.instructorName+' '+x.instructorSurname)
       this.inst=[...new Set(arr)];
        console.log(this.class);
        //this.class=new set(res.result)
  
      }
    )
  
  
  }
 
  
  filter(){
    this.getCourseList(1,this.pageSize);
  }
  
  changeFormatDate(date) {
    if(date){
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    return ""
    
  }
  
  deleteCourse(id){
    this.spinner=true;
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(dialogResult => { 
    if(dialogResult){
      this.service.deleteStudent(id).subscribe(
        res=>{
          this.notify.showSuccess(res.status.message,"")
          this.getNextData(this.paginator.pageIndex+1, this.pageSize.toString());
          this.spinner=false;
        },
        err=>{
          this.notify.showError("System error occurred!","")
        }
      )
    }
  });
  }
  
}
