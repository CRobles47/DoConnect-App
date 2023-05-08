export class Question {

    constructor(
        public id: number,
        public category: string,
        public approved: boolean,
        public title: string,
        public questionBody: string,
        public qcreated_by: number,
        public qapproved_by: number,
        public datetime: Date,
        public image_src: string
    ){}       
}