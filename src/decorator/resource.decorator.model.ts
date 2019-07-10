/**
 * Model resource decorator
 *
 * @export
 * @class ResourceDecoratorModel
 */
export class ResourceDecoratorModel {
    //, public resourceOperation: string
    /**
     *Creates an instance of ResourceDecoratorModel.
     * @param {string} resourceRef Resource referrence 
     * @param {string} resourceName Resource name
     * @memberof ResourceDecoratorModel
     */
    constructor(public resourceRef: string, public resourceName: string) { }
}