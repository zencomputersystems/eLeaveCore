import { Injectable } from '@nestjs/common';
import { switchMap, flatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/admin/user/user.service';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from 'src/admin/user/model/user.model';
import { ActivatedResultDTO } from './dto/activated-result.dto';
import { InvitationDbService } from './db/invitation.db.service';

/**
 *
 *
 * @export
 * @class InvitationService
 */
@Injectable()
export class InvitationService {

    constructor(
        private readonly inviteDbService: InvitationDbService,
        private readonly userService: UserService
        ) {}

    // user accept an invitation
    public acceptInvitation(token: string) {

        // check the invitation table
        // we only allow invitation with status = 1
        const filters = ['(INVITATION_GUID='+token+')','(STATUS=1)'];
        return this.inviteDbService.findOne(filters)
                .pipe(
                    flatMap(res => this.validateInvitedUser(res.data.resource[0])),
                    flatMap(res => {
                        
                        if(res.status==false) {
                            return of(res);
                        } else {
                            return this.authMethodPicker(res);
                        }
                        
                    })
                )

    }

    // for DB user, once set, activate the user
    public setNewUserPassword(invitationId: string,password: string) {
        // hash the password

        //const filters = ['(USER_GUID='+token+')','(STATUS=1)'];

        //get the user detail
        const filters = ['(INVITATION_GUID='+invitationId+')','(STATUS=1)'];
        return this.inviteDbService.findOne(filters)
                .pipe(
                    flatMap(res => this.validateInvitedUser(res.data.resource[0])),
                    flatMap(res => {

                        if(res.status==false) {
                            return of(res);
                        }
                        // set user model data to update user password
                        const userData = new UserModel();
                        userData.USER_GUID = res.userId;
                        userData.PASSWORD = password;
                        userData.ACTIVATION_FLAG = 1


                        return this.activateValidatedUser(res.invitationId,userData)
                                    .pipe(map(()=>{
                                        return res;
                                    }));
                    })
                )
    }

    // Validate the invited user
    private validateInvitedUser(invitationData: any) {

        const activatedResult = new ActivatedResultDTO();

        //validated the invitation data
        if(invitationData==null||invitationData==undefined) {
            activatedResult.message = "Invalid User";
            activatedResult.status = false;

            return of(activatedResult);
        }

        // validate the user data
        const filters = ['(USER_GUID='+invitationData.USER_GUID+')','(ACTIVATION_FLAG=0)'];

        return this.userService.findByFilterV2([],filters)
            .pipe(
                map(res => {

                    const result = res[0];

                    if(result==null) {
                        activatedResult.message = "Invalid User";
                        activatedResult.status = false;

                        return activatedResult;
                    }

                    activatedResult.status = true;
                    activatedResult.message = "Valid User";
                    activatedResult.email = result.EMAIL;
                    activatedResult.invitationId = invitationData.INVITATION_GUID;
                    activatedResult.name = "My Name";
                    activatedResult.userId = result.USER_GUID;
                    return activatedResult;
                })
            )
    }

    // For AD, activate automatically once validated
    // For DB, user need to update their password before activated. They need extra step
    private authMethodPicker(data: ActivatedResultDTO) {
        let companyLoginSetting = "AD";
        
        data.authMethod = companyLoginSetting;

        // activate the user if AD
        if(companyLoginSetting==="AD") {

            // build the user model data to update
            const userData = new UserModel();
            userData.USER_GUID = data.userId;
            userData.ACTIVATION_FLAG = 1;

            return this.activateValidatedUser(data.invitationId,userData)
                .pipe(map(()=>{
                    return data;
                }));
        } else {
            return of(data);
        }

    }

    // activate user that has been validated
    private activateValidatedUser(invitationId: string, userData: UserModel) {

        return this.inviteDbService.update(invitationId,2)
                .pipe(switchMap(() => {

                    const resource = new Resource(new Array);
                    resource.resource.push(userData);

                    return this.userService.updateByModel(resource,[],[],[]);
                }));
    }

    
}
