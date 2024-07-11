import { Answers } from "./answers.js";

export class Question extends Answers{
    constructor(title,a,b,c,d,e,tf){
        super(a,b,c,d,e);
        this.question = title,
        this.flag = tf;
    }
}