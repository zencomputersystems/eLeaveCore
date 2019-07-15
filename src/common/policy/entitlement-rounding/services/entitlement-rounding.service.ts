
/**
 * Service entitlement rounding
 *
 * @export
 * @class EntitlementRoundingService
 */
export class EntitlementRoundingService {

    /**
     * Method leave entitlement rounding
     *
     * @param {number} entitleDay
     * @param {string} strategy
     * @returns {number}
     * @memberof EntitlementRoundingService
     */
    leaveEntitlementRounding(entitleDay: number, strategy: string): number {

        switch (strategy.toUpperCase()) {

            case 'ROUND DOWN 1.00':
                return Math.floor(entitleDay);
            case 'ROUND NEAREST 1.00':
                return Math.round(entitleDay);
            case 'ROUND UP 1.00':
                return Math.ceil(entitleDay);
            case 'ROUND DOWN 0.5':
                return (Math.floor(entitleDay * 2) / 2);
            case 'ROUND  NEAREST 0.5':
                return (Math.round(entitleDay * 2) / 2);
            case 'ROUND UP 0.5':
                return (Math.ceil(entitleDay * 2) / 2);
            default:
                return entitleDay;

        }

    }

}