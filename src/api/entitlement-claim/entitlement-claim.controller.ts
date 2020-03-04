import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EntitlementClaimService } from './entitlement-claim.service';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * Entitlement claim controller
 *
 * @export
 * @class EntitlementClaimController
 */
@Controller('api/entitlement-claim')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EntitlementClaimController {
  /**
   *Creates an instance of EntitlementClaimController.
   * @param {EntitlementClaimService} entitlementClaimService entitlement claim service
   * @memberof EntitlementClaimController
   */
  constructor(
    private readonly entitlementClaimService: EntitlementClaimService
  ) { }

  /**
   * Request entitlement claim
   *
   * @param {EntitlementClaimRequestDto} entitlementClaimRequestDto
   * @param {*} req
   * @param {*} res
   * @memberof EntitlementClaimController
   */
  @Post('request')
  @ApiOperation({ title: 'Entitlement claim request' })
  requestEntitlementClaim(@Body() entitlementClaimRequestDto: EntitlementClaimRequestDto, @Req() req, @Res() res) {
    console.log(req.user);
    this.entitlementClaimService.entitlementClaimProcess([entitlementClaimRequestDto, req.user]).subscribe(
      data => {
        console.log(data);
        res.send(data.data.resource);
      }, err => {
        console.log(err);
        res.send(err);
      }
    );
  }

}