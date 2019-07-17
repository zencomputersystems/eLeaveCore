/**
    * rolesMock
    */
export const roles = {
  "code": "Super Admin",
  "description": "Super Admin for all staff",
  "property": {
    "allowLeaveSetup": {
      "allowLeaveTypeSetup": "true",
      "allowLeaveEntitlementSetup": "true",
      "allowApprovalGroupSetup": "true",
      "allowYearEndClosingSetup": "true"
    },
    "allowViewReport": { "value": "true", "level": "All" },
    "allowViewCalendar": { "value": "true", "level": "All" },
    "allowLeaveManagement": {
      "allowLeaveAdjustmant": { "value": "true", "level": "All" },
      "allowApplyOnBehalf": { "value": "true", "level": "Department" },
      "allowApprovalOverride": { "value": "true", "level": "All" }
    },
    "allowProfileManagement": {
      "allowViewProfile": { "value": "true", "level": "All" },
      "allowEditProfile": { "value": "true", "level": "All" },
      "allowChangePassword": { "value": "true", "level": "All" },
      "allowProfileAdmin": { "value": "true", "level": "All" }
    }
  }
}

// export const roles = {
//     "RoleName":"Supervisor",
//     "Description":"This is description",
//     "Properties":
//         [
//             {
//                 "ResourceName":"ViewProfile",
//                 "Level":"All",
//                 "Operation":
//                     [
//                         {"name":"GETALL"},

//                     ]
//             },
//             {
//                 "ResourceName":"EditProfile",
//                 "Level":"All",
//                 "Operation":
//                     [
//                         {"name":"GET"},
//                         {"name":"UPDATE"}
//                     ]
//             }
//         ]
// }