export class GlobalComponent {

    public string: string;
    public number: number;
    public boolean: boolean;

    constructor() {
        this.string = "string";
        this.number = 1;
        this.boolean = true;
        this.init()
    }

    public init() {
        console.log(this.string);
        console.log(this.number);
        console.log(this.boolean);
    }

}