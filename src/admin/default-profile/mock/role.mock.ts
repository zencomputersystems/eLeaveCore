export const roleMock = {
  code: "Default",
  description: "Default",
  property: {
    allowLeaveSetup: {
      allowLeaveTypeSetup: {
        value: true
      },
      allowLeaveEntitlementSetup: {
        value: true
      },
      allowApprovalGroupSetup: {
        value: true
      },
      allowYearEndClosingSetup: {
        value: true
      }
    },
    allowViewReport: {
      value: true,
      level: "All"
    },
    allowViewCalendar: {
      value: true,
      level: "All"
    },
    allowLeaveManagement: {
      allowLeaveAdjustmant: {
        value: true,
        level: "All"
      },
      allowApplyOnBehalf: {
        value: true,
        level: "All"
      },
      allowApprovalOverride: {
        value: true,
        level: "All"
      }
    },
    allowProfileManagement: {
      allowViewProfile: {
        value: true,
        level: "All"
      },
      allowEditProfile: {
        value: true,
        level: "All"
      },
      allowChangePassword: {
        value: true,
        level: "All"
      },
      allowProfileAdmin: {
        value: true,
        level: "All"
      }
    }
  }
}