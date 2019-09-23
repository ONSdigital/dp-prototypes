document.getElementById("fallback").style = "display:none";
document.getElementById("js-enabled").style = "display:";

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}
const result = document.getElementById("result");
const url = "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/";
const productMeasure = {
    pension: "cpi",
    student: "rpi",
    rpi: "rpi",
    cpi: "cpi",
    cpih: "cpih"
};
const productMonth = {
    pension: 4,
    student: 3,
    rpi: "pickdate",
    cpi: "pickdate",
    cpih: "pickdate"
};
const inflationIDMap = {
    cpi: "d7g7",
    rpi: "czbh",
    cpih: "l55o"
};
const monthMap = {
    "1": "JAN",
    "2": "FEB",
    "3": "MAR",
    "4": "APR",
    "5": "MAY",
    "6": "JUN",
    "7": "JUL",
    "8": "AUG",
    "9": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DEC"
};

let releaseDate = ""
let today = new Date();

//gives us the inflation measure a user needs and gets the date or asks user for it
async function getInflationMeasureAndDate(data) {
    const measure = await setMeasure(data);
    const monthNeeded = await workOutMonthNeeded(data);

    //only contine if we no the month, otherwise wait for user input
    if (monthNeeded.text != null) {
        getInflationFigure()
    }
}

//Takes choice made in select and returns the appropriate measure of Inflation
function setMeasure(data) {
    let choice = data;
    measure = productMeasure[choice];
    return measure;
}

//Takes choice made in select and returns the month figure related to that measure of inflation
function workOutMonthNeeded(data) {
    //look up month required
    month = productMonth[data];
    if (month == "pickdate") {
        askForDate();
    }
    monthNeeded = {
        text: monthMap[month],
        integer: month
    };
    return monthNeeded;
}

//Sometimes we cant automatically guess the date they need so ask for it
function askForDate() {
    document.getElementById("date").style = "";
    //User date selection will then kick off another function
}

function dateSelection(month) {
    monthNeeded = {
        text: monthMap[month],
        integer: month
    };
    getInflationFigure()
}

//function for after we know what date a user needs
async function getInflationFigure() {
    const cdid = await getCDID(measure);
    const timeSeries = await getDataforSeries(cdid);
    const yearNeeded = await getYearNeededFromSeries(timeSeries, monthNeeded)
    console.log(yearNeeded + " " + monthNeeded.text);
}

//Takes a measure of inflation and gets the CDID
function getCDID(measure) {
    cdid = inflationIDMap[measure];
    return cdid;
}

//Get the time series data for the series related to the one selected
function getDataforSeries(cdid) {
    return fetch(url + cdid + "/data", {
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            //Date does not include a useful time element so just take the date bit.
            const releaseDate = response.description.releaseDate.split("T")[0].replace(/-/g, "");
            const timeSeriesDataMonths = response.months;
            return {
                data: timeSeriesDataMonths,
                date: releaseDate
            };
        }).catch(error => {
            console.error(error)
            return;
        })
}


function getYearNeededFromSeries(timeSeries, monthNeeded, today) {

    let publishedYear = timeSeries.date.substring(0, 4);
    let publishedMonth = timeSeries.date.substring(4, 6);
    let publishedDay = timeSeries.date.substring(6, 8);
    let timeSeriesDate = new Date(publishedYear, publishedMonth - 1, publishedDay, "09", "30");

    //logic to work out if you need this years or last years figure based on current date and publish date
    if (monthNeeded.integer - publishedMonth > 0) {
        yearNeeded = publishedYear - 1
        return yearNeeded

        //deal with the case of if being this month
    } else if ((monthNeeded.integer - publishedMonth) == 0) {
        if (today - timeSeriesDate > 0) {
            yearNeeded = publishedYear - 1
            return yearNeeded
        } else {
            yearNeeded = publishedYear
            return yearNeeded
        }
    } else {
        yearNeeded = publishedYear
        return yearNeeded
    }
}