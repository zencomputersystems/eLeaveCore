export const roles = {
    "RoleName":"Supervisor",
    "Description":"This is description",
    "Properties":
        [
            {
                "ResourceName":"ViewProfile",
                "Level":"All",
                "Operation":
                    [
                        {"name":"GETALL"},

                    ]
            },
            {
                "ResourceName":"EditProfile",
                "Level":"All",
                "Operation":
                    [
                        {"name":"GET"},
                        {"name":"UPDATE"}
                    ]
            }
        ]
}