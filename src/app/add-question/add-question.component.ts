import { Component, OnInit, Inject, Input } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray } from  '@angular/forms';  
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../services/question.service';
import { Question } from '../model/question';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  private selectedNumOfOptions: number;
  optionNumbers: string[] = ['2','3','4'];
  
  //action = new Subject();


  questionForm : FormGroup;
  //optionList: FormArray;


  constructor(
    private fb :FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddQuestionComponent>
    ) {

      

     }

  ngOnInit() {
    //this.createform();    
    this.questionForm = this.fb.group({
      description : ['', [
        Validators.required,
      ]], 
      quiz_id: this.data.quiz_id,
      optionDetails: this.fb.array([this.fb.group({option:''})])
    })
  }

  get optionDetails() {
    return this.questionForm.get('optionDetails') as FormArray;
  }

  handleChange(mrChange: MatRadioChange) {
    //this.optionDetails.clear();
    //console.log(mrChange.value)
    this.questionForm.setControl('optionDetails', this.fb.array([]));
    //this.optionDetails.push(this.fb.group({option:''}));
    for(let i=0;i< mrChange.value;i++)    
    {       
      this.optionDetails.push(this.fb.group({option:''}));
    }    
  }

  clickBack(): void {
    this.dialogRef.close();
  }
/*
  get options() {
    return this.questionForm.get('options') as FormArray;
 }

 /*
  handleChange(mrChange: MatRadioChange) {
    this.createform();
 } */

 /*
  createform()    
  {    
  //let arr=[];    
  this._optionList = this.questionForm.get('options') as FormArray;
  for(let i=0;i< this.selectedNumOfOptions;i++)    
  {       
    //arr.push(this.BuildFormDynamic())
    this._optionList.push(this.BuildFormDynamic());
       
  }    

    /*this.questionForm =  this.fb.group({    
      description : ['', [
        Validators.required,
      ]], 
      quiz_id: this.data.quiz_id,  
      optionDetails:this.fb.array(arr)    
    })    */
  //}  
/*
  BuildFormDynamic():FormGroup{    
    return this.fb.group({       
          option: ['', [
            Validators.required,
          ]],      
     })    
   }    
*/
   SaveData()    
  {    
    console.log(this.questionForm.value);    
    this.questionService.storeWithOptions(this.questionForm.value).subscribe(
      (data:Question) => {
        this._snackBar.open('Question created successfully!','',{
          duration: 2000
        })
        //this.action.next(true)
        ,
        error=> {
            console.log(error);
        }
      }
    );

    this.questionForm.reset();
  
  }  
  
  
    
}
