import { Answers } from "./answers.js";

export class Question extends Answers{
    constructor(title,a,b,c,d,tf){
        super(a,b,c,d);
        this.question = title,
        this.flag = tf;
    }
}