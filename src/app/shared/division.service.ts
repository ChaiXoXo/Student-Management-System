import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as lodash from "lodash";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  divisionList : AngularFireList<any>;
  array = [];

  constructor(private firebase : AngularFireDatabase) {
    this.divisionList = this.firebase.list('Divisions');
    this.divisionList.snapshotChanges()
    .subscribe(list =>{
      this.array = list.map(item =>{
        return{
          $key : item.key,
          ...item.payload.val()
        }
      })
    })
   }

   getDivisonName($key){
    if($key=="0"){
      return "";
    }else{
      return lodash.find(this.array, (obj) => {return obj.$key == $key});
    }
   }
}
