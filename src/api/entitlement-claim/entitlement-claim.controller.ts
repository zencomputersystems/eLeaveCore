import { Controller, Post, Req, Res, Body, UseGuards, Get } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EntitlementClaimService } from './entitlement-claim.service';
import { EntitlementClaimRequestDto } from './dto/entitlement-claim-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { EntitlementClaimApproveDto } from './dto/entitlement-claim-approve.dto';

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

  @Get('leave-claimable')
  @ApiOperation({ title: 'Claimable leavetype' })
  claimableLeavetype(@Req() req, @Res() res) {
    this.entitlementClaimService.availableClaimLeavetype([req.user]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    );
  }

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
    this.entitlementClaimService.entitlementClaimProcess([entitlementClaimRequestDto, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    );
  }

  /**
   * Find entitlement claim
   *
   * @param {*} req
   * @param {*} res
   * @memberof EntitlementClaimController
   */
  @Get()
  @ApiOperation({ title: 'Get entitlement claim' })
  findEntitlementClaim(@Req() req, @Res() res) {
    this.entitlementClaimService.getEntitlementClaim([req.user.TENANT_GUID]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    )
  }

  /**
   * Approve entitlement claim
   *
   * @param {EntitlementClaimApproveDto} entitlementClaimApproveDTO
   * @param {*} req
   * @param {*} res
   * @memberof EntitlementClaimController
   */
  @Post('approve')
  @ApiOperation({ title: 'Approve entitlement claim' })
  approveEntitlementClaim(@Body() entitlementClaimApproveDTO: EntitlementClaimApproveDto, @Req() req, @Res() res) {
    this.entitlementClaimService.approveEntitlementClaim([entitlementClaimApproveDTO, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(err);
      }
    )
  }

}