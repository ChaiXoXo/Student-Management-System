import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from "@angular/material";
import { StudentComponent } from '../student/student.component';
import { DivisionService } from 'src/app/shared/division.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  array;
  listData : MatTableDataSource<any>;
  displayColumns : String[] = ['fullName','rollNo','age','ParentsMobileNumber','actions'];
  @ViewChild(MatSort, {static : true}) sort : MatSort;
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  searchKey:string;

  constructor(private service: StudentService,
              private dialog : MatDialog, 
              private division : DivisionService,
              private notification : NotificationService) { }

  ngOnInit() {
    this.service.getStudents()
    .subscribe(list =>{
      this.array = list.map(item =>{
        let divisionName = this.division.getDivisonName(item.payload.val()['division'])
        return{
          $key: item.key,
          divisionName,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(this.array);
      console.log(this.listData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onCreate(){
    this.service.initializeForm();
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent, dialogConfig);
  }

  onDelete($key){
    if(confirm('Do you want to delete this record ?')){
      this.service.deleteStudent($key);
      this.notification.warn('Record deleted sucessfully !');
    }
  }

}
