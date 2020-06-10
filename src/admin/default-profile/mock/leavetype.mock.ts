export const leavetypeMock = [
  {
    abbr: 'AL',
    code: 'Annual Leave',
    description: 'Annual leave',
    property: {
      applyInAdvance: false,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: false,
      includeOtherLeaveType: "Some value",
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
          textValue: "Some value"
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
          textValue: "Some value"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "Some value"
      },
      convertExceedLeaveAmount: "Some value",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "Some value"
      },
      leaveEntitlementType: "Some value",
      leaveEntitlementRounding: "Round Up 0.5",
      levels: {
        leaveEntitlement: [
          {
            id: 1,
            serviceYearFrom: 0,
            serviceYearTo: 1,
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
            serviceYearFrom: 5,
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
      applyInAdvance: false,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: false,
      includeOtherLeaveType: "Some value",
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
          textValue: "Some value"
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
          textValue: "Some value"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "Some value"
      },
      convertExceedLeaveAmount: "Some value",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "Some value"
      },
      leaveEntitlementType: "Some value",
      leaveEntitlementRounding: "Round Up 0.5",
      levels: {
        leaveEntitlement: [
          {
            id: 1,
            serviceYearFrom: 0,
            serviceYearTo: 1,
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
            serviceYearFrom: 5,
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
      applyInAdvance: false,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: false,
      includeOtherLeaveType: "Some value",
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
          textValue: "Some value"
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
          textValue: "Some value"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "Some value"
      },
      convertExceedLeaveAmount: "Some value",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "Some value"
      },
      leaveEntitlementType: "Some value",
      leaveEntitlementRounding: "Round Up 0.5",
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
      applyInAdvance: false,
      applyNextYear: false,
      claimEntitlement: false,
      applyFractionUnit: false,
      includeOtherLeaveType: "Some value",
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
          textValue: "Some value"
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
          textValue: "Some value"
        }
      },
      isAllowAppliedMoreThanBalance: {
        isCheck: false,
        textValue: "Some value"
      },
      convertExceedLeaveAmount: "Some value",
      maxDayPerLeave: 0,
      isAllowAfterJoinDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isAllowLeaveCancelAfterDate: {
        isCheck: false,
        textValue: "Some value"
      },
      isLimitApplicationToCarryForward: {
        isCheck: false,
        textValue: "Some value"
      },
      leaveEntitlementType: "Some value",
      leaveEntitlementRounding: "Round Up 0.5",
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