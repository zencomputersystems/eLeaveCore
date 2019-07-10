/**
 * Data for validation status
 *
 * @export
 * @class ValidationStatusDTO
 */
export class ValidationStatusDTO {
    /**
     *Creates an instance of ValidationStatusDTO.
     * @memberof ValidationStatusDTO
     */
    constructor() {
        this.valid = false;
        this.message = new Array<String>();
    }

    /**
     * Valid status
     *
     * @type {boolean}
     * @memberof ValidationStatusDTO
     */
    valid: boolean;
    /**
     * Message detail
     *
     * @type {Array<String>}
     * @memberof ValidationStatusDTO
     */
    message: Array<String>;
}