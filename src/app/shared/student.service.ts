import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as lodash from "lodash";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firebase: AngularFireDatabase, public datePipe : DatePipe) { }

  studentList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    rollNo: new FormControl(''),
    age: new FormControl(''),
    ParentsMobileNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
    division: new FormControl(0),
    gender: new FormControl('1'),
    //joiningDate: new FormControl('')
  })

  initializeForm() {
    this.form.setValue({
      $key: null,
      fullName: '',
      rollNo: '',
      age: '',
      ParentsMobileNumber: '',
      division: 0,
      gender: '1',
      //joiningDate: ''
    })
  }

  //Fetching all the students from firebase 
  getStudents() {
    this.studentList = this.firebase.list('students');
    return this.studentList.snapshotChanges();
  }

  //Insertion of new student
  insertStudent(student) {
    this.studentList.push({
      fullName: student.fullName,
      rollNo: student.rollNo,
      age: student.age,
      ParentsMobileNumber: student.ParentsMobileNumber,
      division: student.division,
      gender: student.gender,
      //joiningDate: student.joiningDate == "" ? "" : this.datePipe.transform(student.joiningDate, 'yyyy-MM-dd')
    })
  }

  //update student
  updateStudent(student) {
    this.studentList.update(student.$key, {
      fullName: student.fullName,
      rollNo: student.rollNo,
      age: student.age,
      ParentsMobileNumber: student.ParentsMobileNumber,
      division: student.division,
      gender: student.gender,
      //joiningDate: student.joiningDate == "" ? "" : this.datePipe.transform(student.joiningDate, 'yyyy-MM-dd')
    })
  }

  //Delete Student
  deleteStudent($key){
    this.studentList.remove($key);
  }

  populateForm(student){
    this.form.setValue(lodash.omit(student, 'divisionName'));
  }
}
