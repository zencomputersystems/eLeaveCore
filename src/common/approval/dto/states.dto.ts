/**
 * Data for states
 *
 * @export
 * @class STATESDTO
 */
export class STATESDTO {
    /**
     *Creates an instance of STATESDTO.
     * @param {number} level level approval
     * @param {string} userId user id
     * @memberof STATESDTO
     */
    constructor(public level: number, public userId: string) { }
}