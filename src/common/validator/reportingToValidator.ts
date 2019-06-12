import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
/**
 * Validate reporting structure for an employee
 *
 * @export
 * @class ReportingToValidator
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'reportingToValidator', async: false })
export class ReportingToValidator implements ValidatorConstraintInterface {

    validate(reportingUserId: string, args: ValidationArguments) {
        const obj: any = args.object;

        console.log(obj);

        return false; // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return 'Reporting user does not exist';
    }

}