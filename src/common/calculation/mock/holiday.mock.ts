/**
    * holidayMock
    */
export let holidayMock = {
    "holiday":
        [
            // {
            //     "name": "Holiday 1",
            //     "date": "2019-04-02"
            // },
            // {
            //     "name": "Holiday 2",
            //     "date": "2019-05-07"
            // },
            // {
            //     "name": "Holiday 3",
            //     "date": "2019-05-08"
            // }
            {
                "start": "2020-01-25",
                "end": "2020-01-25",
                "title": "Chinese Lunar New Year\'s Day",
                "holidayName": "Chinese Lunar New Year\'s Day"
            },
            {
                "start": "2020-05-01",
                "end": "2020-05-01",
                "title": "Labour Day",
                "holidayName": "Labour Day"
            },
            {
                "start": "2020-05-07",
                "end": "2020-05-07",
                "title": "Wesak Day",
                "holidayName": "Wesak Day"
            }
        ],
    "rest":
        [
            {
                "name": "SAT",
                "fullname": "SATURDAY"
            },
            {
                "name": "SUN",
                "fullname": "SUNDAY"
            }
        ]
}

export function setHoliday(data) {
    holidayMock = data;
}

export function getHoliday() {
    return holidayMock;
}