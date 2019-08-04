import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from  '@angular/forms';  
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  selectedNumOfOptions: number = 0;
  options: string[] = ['2','3','4'];
  


  questionForm : FormGroup;

  constructor(private fb :FormBuilder) { }

  ngOnInit() {
    this.createform();    
  }

  handleChange(mrChange: MatRadioChange) {
    this.createform();
 } 

  createform()    
  {    
  let arr=[];    
  for(let i=0;i< this.selectedNumOfOptions;i++)    
  {       
    arr.push(this.BuildFormDynamic())
       
  }    

    this.questionForm =  this.fb.group({    
      description : ['', [
        Validators.required,
      ]],    
      optionDetails:this.fb.array(arr)    
    })    
  }  

  BuildFormDynamic():FormGroup{    
    return this.fb.group({       
          option: ['', [
            Validators.required,
          ]],      
     })    
   }    

   SaveData()    
  {    
    console.log(this.questionForm.value);    
    //pass this data to service and api node/webapi  
  
  }   
    
}
