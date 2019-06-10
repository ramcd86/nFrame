export class GlobalJSComponent {

    constructor() {
        this.string = "js string";
        this.number = 2;
        this.boolean = false;
        this.init()
    }

    init() {
        console.log(this.string);
        console.log(this.number);
        console.log(this.boolean);
    }

}