/**
 * Access permission decorator model
 *
 * @export
 * @class AccessPermissionDecoratorModel
 */
export class AccessPermissionDecoratorModel {
  /**
   *Creates an instance of AccessPermissionDecoratorModel.
   * @param {string} rulesName rulesname
   * @param {string} rulesDetail rules detail
   * @memberof AccessPermissionDecoratorModel
   */
  constructor(public rulesName: string, public rulesDetail: string) { }
}