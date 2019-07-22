import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Create company site dto
 *
 * @export
 * @class CreateCompanySiteDTO
 */
export class CreateCompanySiteDTO {
    /**
     * id company
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company guid', example: '323bdfa7-eed2-8bf2-2274-b1cd9390c9ca' })
    @IsNotEmpty()
    @IsString()
    companyId: string;

    /**
     * name company site
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site name', example: 'Zen Computer 2' })
    @IsNotEmpty()
    @IsString()
    siteName: string;

    /**
     * reg no company site
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site registration no', example: 'REG-0099812XX' })
    @IsString()
    registrationNo: string;

    /**
     * address
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site address', example: 'Lot No A-09-03, Jalan Lily' })
    @IsString()
    address: string;

    /**
     * address 2
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site address 2', example: 'Taman Lily, Cyberjaya' })
    @IsString()
    address2: string;

    /**
     * address 3
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site address 3', example: '43650, Selangor, Malaysia' })
    @IsString()
    address3: string;

    /**
     * contact no
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site contact no', example: '03-99912214' })
    @IsString()
    contactNo: string;

    /**
     * email
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site email', example: 'zen computer 2' })
    @IsString()
    email: string;

    /**
     * contact person name
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'contact person name', example: 'Mr. Wantan' })
    @IsString()
    contactPersonName: string;

    /**
     * contact person contact no
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'contact person contact no', example: '019-33124412' })
    @IsString()
    contactPersonContactNo: string;

    /**
     * contact person email
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'contact person email', example: 'wantan@zen2.com.my' })
    @IsString()
    contactPersonEmail: string;

    /**
     * website url
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site website', example: 'http://zencomputersystem2.com.my' })
    @IsString()
    website: string;

    /**
     * is site HQ
     *
     * @type {number}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'company site is headquarters', example: '0' })
    @IsString()
    isHQ: number;

    /**
     * tenant guid
     *
     * @type {string}
     * @memberof CreateCompanySiteDTO
     */
    @ApiModelProperty({ description: 'tenant guid', example: '58a035ca-b22f-1b4e-79c6-7e13ec15d2d2' })
    @IsString()
    tenantId: string;
}