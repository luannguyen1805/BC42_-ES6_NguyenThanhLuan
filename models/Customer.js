import Person from "../models/Person.js";
export class Customer extends Person {
    constructor(id, name, address, email, company, bill, rate){
        super(id, name, address, email);
        this.company = company;
        this.bill = bill;
        this.rate = rate
    }
}