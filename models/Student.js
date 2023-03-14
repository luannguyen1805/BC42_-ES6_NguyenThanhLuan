import Person from "../models/Person.js";
export class Student extends Person {
    constructor(id, name, address, email, math, physics, chemistry ){
        super(id, name, address, email);
        this.math = math;
        this.physics = physics;
        this.chemistry = chemistry;
    }
    calcAveScore(){
        return Math.round(((+this.math) + (+this.physics) + (+this.chemistry)) / 3);
    }
}