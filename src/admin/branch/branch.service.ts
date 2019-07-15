import { Injectable } from '@nestjs/common';
import { BranchDbService } from './db/branch.db.service';
import { map } from 'rxjs/operators';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

// var azure = require('azure-storage');

/**
 * Service for branch
 *
 * @export
 * @class BranchService
 */
@Injectable()
export class BranchService {
    /**
     *Creates an instance of BranchService.
     * @param {BranchDbService} branchDbService
     * @param {CommonFunctionService} commonFunctionService
     * @memberof BranchService
     */
    constructor(private readonly branchDbService: BranchDbService,
        private readonly commonFunctionService: CommonFunctionService) { }

    /**
     * Method to get list branch
     *
     * @param {string} tenantId
     * @returns
     * @memberof BranchService
     */
    public getList(tenantId: string) {
        return this.commonFunctionService.getListData(this.branchDbService.findAll(tenantId));
        // return this.branchDbService.findAll(tenantId)
        //     .pipe(map(res => {
        //         if (res.status == 200) {
        //             return res.data.resource;
        //         }
        //     }))
    }

    public getListTest(tenantId: string) {
        // return this.commonFunctionService.getListData(this.branchDbService.findAll(tenantId));
        return this.branchDbService.findAll(tenantId)
            .pipe(map(res => {
                if (res.status == 200) {
                    return res.data.resource;
                }
            }))
    }

    // public generateSasToken(container, blobName, permissions) {
    //     var connString = process.env.AzureWebJobsStorage;
    //     var blobService = azure.createBlobService(connString);

    //     // Create a SAS token that expires in an hour
    //     // Set start time to five minutes ago to avoid clock skew.
    //     var startDate = new Date();
    //     startDate.setMinutes(startDate.getMinutes() - 5);
    //     var expiryDate = new Date(startDate);
    //     expiryDate.setMinutes(startDate.getMinutes() + 60);

    //     permissions = permissions || azure.BlobUtilities.SharedAccessPermissions.READ;

    //     var sharedAccessPolicy = {
    //         AccessPolicy: {
    //             Permissions: permissions,
    //             Start: startDate,
    //             Expiry: expiryDate
    //         }
    //     };

    //     var sasToken = blobService.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);

    //     return {
    //         token: sasToken,
    //         uri: blobService.getUrl(container, blobName, sasToken, true)
    //     };
    // }

}