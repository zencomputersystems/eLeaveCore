import { Injectable } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { Observable } from 'rxjs';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { UpdateApprovalDTO } from './dto/update-approval.dto';
import { Resource } from 'src/common/model/resource.model';

@Injectable()
export class ApprovalOverrideService {
  constructor(
    private readonly leaveTransactionDbService: LeaveTransactionDbService,
    private readonly commonFunctionService: CommonFunctionService) {
  }

  public findAllPendingLeave(TENANT_GUID: string): Observable<any> {
    let result = this.leaveTransactionDbService.findAll(TENANT_GUID);
    return this.commonFunctionService.getListData(result);
  }

  public updateToEmployee(user: any, data: UpdateApprovalDTO) {
    console.log(user);
    let result = this.leaveTransactionDbService.updateToEmployee(user, data);
    return result;
  }


}