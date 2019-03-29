// export const ENTITLEMENTTYPE = [
//     {
//         "id":1,
//         "name":"Entitled in full"
//     },
//     {
//         "id":2,
//         "name":"Prorated from date-of-join to current month",
//     },
//     {
//         "id":3,
//         "name":"Prorated from date-of-join to end of year"
//     },
//     {
//         "id":4,
//         "name":"Prorated from date-of-confirm to current month"
//     },
//     {
//         "id":5,
//         "name":"Prorated from date-of-confirm to end of year"
//     }
// ]

export enum ENTITLEMENTTYPE {
    "Entitled in full",
    "Prorated from date-of-join to current month",
    "Prorated from date-of-join to end of year",
    "Prorated from date-of-confirm to current month",
    "Prorated from date-of-confirm to end of year"
}