import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  id: number;

  gameForm : FormGroup;

  QuizList: any[] = []; 

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private qService: QuizService,
    private sService: ScoreService,
    private fb :FormBuilder,
    private _snackBar: MatSnackBar,
    //private stepper: MatStepper
    ) {
      
     }

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id'));
    this.setQuizList(this.id);
    //this.QuizList.reverse();
    setTimeout(_=> {
      //this.shuffle(this.QuizList);
      for (let item of this.QuizList) {
        this.shuffle(item[0])
      } 
      this.createform()
    },1000);
    //this.QuizList.reverse();
/*
    this.gameForm = this.fb.group({
      gameAnswers: this.fb.array([this.addItem()])
    })
    this.addItem();*/
    
    //this.gameForm.setControl('gameAnswers', this.fb.array([]));
    //this.optionDetails.push(this.fb.group({option:''}));
    
  }

 /* init():FormGroup {
    return this.fb.group({
      option: ['', Validators.required]
    });
  }*/

 /* addItem() {
    //return this.fb.group({ option: ['', Validators.required] });
    for(let i=0;i< this.QuizList.length;i++)    
    {       
      this.gameAnswers.push(this.init());
    }    
  }*/

  shuffle(array:any[]): any[] {
    var i,
        j,
        temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;  
  }

  get gameAnswers() {
    return this.gameForm.get('gameAnswers') as FormArray;
  }

  createform()    
  {    
    let arr: any[] = [];  
    let count = this.QuizList.length; 
  //this._optionList = this.questionForm.get('options') as FormArray;
  for(let i=0;i< count;i++)    
  {       
    arr.push(this.BuildFormDynamic());
    //this.gameAnswers.push(this.BuildFormDynamic());
  }    
  //console.log(arr.values)

    this.gameForm =  this.fb.group({      
      gameAnswers:this.fb.array(arr)    
    })    
  }  

  BuildFormDynamic():FormGroup{    
    return this.fb.group({       
          option: ['', [
            Validators.required,
          ]],      
     })    
   }    


  setQuizList(id: number)
  {
    this.qService.getQuestionsAndOptions(id).subscribe(
      (data) => {
        this.QuizList = data
        },
        error => console.log(error)
      
    )
  }

  SaveData()    
  {    
    this.loading = true;
    let sum = 0;
    //console.log(this.gameAnswers.value);
    let arr: any[] = this.gameAnswers.value;
    /*Array.prototype.forEach.call(arr, child => {
      console.log(child)
    });*/
    let count = arr.length;
    for(let i=0;i<count;i++)
    {
      sum += arr[i].option;
    }

    this.sService.storeScore(sum, this.id).subscribe(
      data => {
        /*this.submitted = true;*/
        this.loading = false;
        this.gameForm.reset();
        //this.stepper.reset()
        if(data.amount >= 5)
        { 
          this._snackBar.open('Congrats!','',{
            duration: 2000
          });
        }
        else
        {
          this._snackBar.open("Come back when you're ready!",'',{
            duration: 2000
          });
        }
      }
    )
    
    
    
    /*this.qService.storeWithOptions(this.questionForm.value).subscribe(
      (data) => {
        this._snackBar.open('Quiz created successfully!','',{
          duration: 2000
        }),
        error=> {
            console.log(error);
        }
      }
    );*/

  }
}
