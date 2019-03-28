export class ValidationStatusDTO {
    constructor() {
        this.valid = false;
        this.message = new Array<String>();
    }

    valid: boolean;
    message: Array<String>;
}