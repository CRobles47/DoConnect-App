import { Question } from "../question-list/question";

export class Answer {
  
    constructor(
        public id: number,
        public answer_body: string,
        public img_src: string,
        public approved: boolean,
        public datetime: Date,
        public created_by: string,
        public approved_by: string,
        public question: Question
    ) {}
}
