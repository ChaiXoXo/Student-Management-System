import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/shared/division.service';
import { StudentService } from "../../shared/student.service";
import { NotificationService } from "../../shared/notification.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private service : StudentService,
              private divisionService : DivisionService,
              private notificationService : NotificationService,
              public dialogRef : MatDialogRef<StudentComponent>) { }

  ngOnInit() {
    this.service.getStudents();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeForm();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
        this.service.insertStudent(this.service.form.value);
      }else{
        this.service.updateStudent(this.service.form.value);
      }

      this.service.form.reset();
      this.service.initializeForm();
      this.notificationService.success("Submitted successfully");
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeForm();
    this.dialogRef.close();
  }

}
