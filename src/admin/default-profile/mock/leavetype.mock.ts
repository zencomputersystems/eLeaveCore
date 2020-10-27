export const leavetypeMock = [
  {
    abbr: 'AL',
    code: 'Annual Leave',
    description: 'Annual leave',
    property: {
      applyInAdvance: true,
      applyNextYear: false,
      claimEntitlement: true,
      applyFractionUnit: true,
      includeOtherLeaveType: "NONE",
      attachmentRequired: false,
      excludeDayType: {
        isExcludeHoliday: true,
        isExcludeRestDay: true
      },
      applyBeforeProperties: {
        numberOfDays: 5,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowShortNotice: {
          isCheck: false,
          textValue: "SHORT NOTICE APPLICATION"
        },
        markAsEmergency: false
      },
      applyWithinProperties: {
        numberOfDays: 3,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowBackdated: {
          isCheck: false,
          textValue: "BACK DATED APPLICATION"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "CONVERT TO UNPAID LEAVE"
      },
      convertExceedLeaveAmount: "UNPAID LEAVE",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "APPLY AFTER JOIN DATE"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "LEAVE CANCELLATION"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "BRING FORWARD LEAVE"
      },
      leaveEntitlementType: "Entitled in full",
      leaveEntitlementRounding: "Round Down 0.25",
      levels: {
        leaveEntitlement: [
          {
            id: 1,
            serviceYearFrom: 0,
            serviceYearTo: 2,
            entitledDays: 8,
            carryForward: 3
          },
          {
            id: 2,
            serviceYearFrom: 2,
            serviceYearTo: 4,
            entitledDays: 12,
            carryForward: 3
          },
          {
            id: 3,
            serviceYearFrom: 4,
            serviceYearTo: 99,
            entitledDays: 16,
            carryForward: 3
          }
        ]
      }
    }
  },
  {
    abbr: 'ML',
    code: 'Medical Leave',
    description: 'Medical leave',
    property: {
      applyInAdvance: true,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: true,
      includeOtherLeaveType: "HOSPITALIZATION LEAVE",
      attachmentRequired: true,
      excludeDayType: {
        isExcludeHoliday: true,
        isExcludeRestDay: true
      },
      applyBeforeProperties: {
        numberOfDays: 5,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowShortNotice: {
          isCheck: false,
          textValue: "SHORT NOTICE APPLICATION"
        },
        markAsEmergency: false
      },
      applyWithinProperties: {
        numberOfDays: 3,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowBackdated: {
          isCheck: false,
          textValue: "BACK DATED APPLICATION"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "CONVERT TO UNPAID LEAVE"
      },
      convertExceedLeaveAmount: "UNPAID LEAVE",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "APPLY AFTER JOIN DATE"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "LEAVE CANCELLATION"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "NO BRING FORWARD LEAVE"
      },
      leaveEntitlementType: "Entitled in full",
      leaveEntitlementRounding: "Round Down 0.5",
      levels: {
        leaveEntitlement: [
          {
            id: 1,
            serviceYearFrom: 0,
            serviceYearTo: 2,
            entitledDays: 14,
            carryForward: 3
          },
          {
            id: 2,
            serviceYearFrom: 2,
            serviceYearTo: 4,
            entitledDays: 18,
            carryForward: 3
          },
          {
            id: 3,
            serviceYearFrom: 4,
            serviceYearTo: 99,
            entitledDays: 22,
            carryForward: 3
          }
        ]
      }
    }
  },
  {
    abbr: 'MTL',
    code: 'Maternity Leave',
    description: 'Maternity leave',
    property: {
      applyInAdvance: true,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: false,
      includeOtherLeaveType: "NONE",
      attachmentRequired: false,
      excludeDayType: {
        isExcludeHoliday: true,
        isExcludeRestDay: true
      },
      applyBeforeProperties: {
        numberOfDays: 5,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowShortNotice: {
          isCheck: false,
          textValue: "SHORT NOTICE APPLICATION"
        },
        markAsEmergency: false
      },
      applyWithinProperties: {
        numberOfDays: 3,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowBackdated: {
          isCheck: false,
          textValue: "BACK DATED APPLICATION"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "CONVERT TO UNPAID LEAVE"
      },
      convertExceedLeaveAmount: "UNPAID LEAVE",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "APPLY AFTER JOIN DATE"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "LEAVE CANCELLATION"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "NO BRING FORWARD LEAVE"
      },
      leaveEntitlementType: "Entitled in full",
      leaveEntitlementRounding: "Round Down 1.00",
      levels: {
        leaveEntitlement: [
          {
            id: 1,
            serviceYearFrom: 0,
            serviceYearTo: 99,
            entitledDays: 60,
            carryForward: 0
          }
        ]
      }
    }
  },
  {
    abbr: 'HL',
    code: 'Hospitalization Leave',
    description: 'Hospitalization leave',
    property: {
      applyInAdvance: true,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: true,
      includeOtherLeaveType: "MEDICAL LEAVE",
      attachmentRequired: false,
      excludeDayType: {
        isExcludeHoliday: true,
        isExcludeRestDay: true
      },
      applyBeforeProperties: {
        numberOfDays: 5,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowShortNotice: {
          isCheck: false,
          textValue: "SHORT NOTICE APPLICATION"
        },
        markAsEmergency: false
      },
      applyWithinProperties: {
        numberOfDays: 3,
        excludeDayType: {
          isExcludeHoliday: true,
          isExcludeRestDay: true
        },
        isAllowBackdated: {
          isCheck: false,
          textValue: "BACK DATED APPLICATION"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "CONVERT TO UNPAID LEAVE"
      },
      convertExceedLeaveAmount: "UNPAID LEAVE",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "APPLY AFTER JOIN DATE"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "LEAVE CANCELLATION"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "BRING FORWARD LEAVE"
      },
      leaveEntitlementType: "Entitled in full",
      leaveEntitlementRounding: "Round Down 1.00",
      levels: {
        leaveEntitlement: [
          {
            id: 1,
            serviceYearFrom: 0,
            serviceYearTo: 99,
            entitledDays: 60,
            carryForward: 0
          }
        ]
      }
    }
  }
]