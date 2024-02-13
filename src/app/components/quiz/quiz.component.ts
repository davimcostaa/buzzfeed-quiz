import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  finalAnswer: string = ''

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {

      this.finished = false;
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

    }
  }

  playerChoice(valor: string) {
    this.answers.push(valor)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finalAnswer = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[this.finalAnswer as keyof
          typeof quizz_questions.results]
    }
  }

  async checkResult(answers: string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })

    return result
  }

}
