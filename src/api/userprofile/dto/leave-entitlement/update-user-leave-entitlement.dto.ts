// import { ApiModelProperty } from '@nestjs/swagger';
// import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';

// export class UpdateUserLeaveEntitlementDTO {

//   /**
//    * User leave eentitlement guid
//    *
//    * @type {string}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'User leave entitlement guid', example: '55db45c0-b4d8-11e9-8b11-cddd8db33c78' })
//   @IsNotEmpty()
//   @IsString()
//   userLeaveEntitlementGuid: string;

//   /**
//    * Leavetype entitlement guid
//    *
//    * @type {string}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Leave type entitlement guid', example: '271a8e10-b417-11e9-89a1-2d60ffe7b9ee' })
//   @IsNotEmpty()
//   @IsString()
//   leavetypeEntitlementGuid: string;

//   /**
//    * Leavetype guid
//    *
//    * @type {string}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Leave type guid', example: '238fc8fa-6e70-fa83-7c9b-17f77108b691' })
//   @IsNotEmpty()
//   @IsString()
//   leavetypeGuid: string;

//   /**
//    * Remarks
//    *
//    * @type {string}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Remarks for this user leave entitlement', example: 'This is advance special leave' })
//   @IsNotEmpty()
//   @IsString()
//   remarks: string;

//   /**
//    * Properties xml
//    *
//    * @type {string}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'User leave policy', example: '{}' })
//   @IsNotEmpty()
//   @IsString()
//   propertiesXML: string;

//   /**
//    * Parent flag - to mark whether this main leavetypeEntitlement
//    *
//    * @type {number}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Parent flag - (0: no , 1: yes)', example: 1 })
//   @IsNotEmpty()
//   @IsNumber()
//   parentFlag: number;

//   /**
//    * CF Flag - to show that this is a carry forward leave from last year
//    *
//    * @type {number}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Carry forward flag - (0: no , 1: yes)', example: 0 })
//   @IsNotEmpty()
//   @IsNumber()
//   cfFlag: number;

//   /**
//    * Days added to this user leave entitlement
//    *
//    * @type {number}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Days added for this leave', example: 1 })
//   @IsNotEmpty()
//   @IsNumber()
//   daysAdded: number;

//   /**
//    * Assigned year for this user leave entitlement
//    *
//    * @type {number}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Year of user leave entitlement', example: 2019 })
//   @IsNotEmpty()
//   @IsNumber()
//   year: number;

//   /**
//    * Expired date for leave appliance - usually used for carry forward leave
//    *
//    * @type {Date}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Expired date of this leave', example: '2019-04-30' })
//   @IsNotEmpty()
//   @IsDate()
//   expiredDate: Date;

//   /**
//    * Active flag for this user leave entielement
//    *
//    * @type {number}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'Active flag', example: 1 })
//   @IsNotEmpty()
//   @IsNumber()
//   activeFlag: number;

//   /**
//    * User guid for this leave entitlement
//    *
//    * @type {string}
//    * @memberof UpdateUserLeaveEntitlementDTO
//    */
//   @ApiModelProperty({ description: 'User guid', example: 'bb8b692b-aca9-3a47-180c-68a139d47a35' })
//   @IsNotEmpty()
//   @IsString()
//   userGuid: string;

// }