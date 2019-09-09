document.getElementById("fallback").style = "display:none";

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

async function getInflationMeasureAndDate(data) {
    const measure = await setMeasure(data);
    const monthNeeded = await workOutMonthNeeded(data);
    getInflationFigure ()
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
    //Look up preformatted text version of that month
    monthNeeded = monthMap [month];
    return monthNeeded;
    
}

//Sometimes we cant automatically guess the date they need so ask for it
function askForDate () {
    document.getElementById("date").style = "";
}

function dateSelection (data) {
    monthNeeded = monthMap [data]
    getInflationFigure ()
}


async function getInflationFigure() {
    const cdid = await getCDID (measure);
    const timeSeries = await getDataforSeries(cdid);
    console.log(monthNeeded);
    console.log(timeSeries);
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




async function test() {
    let choice = "student";

    let measure = await setMeasure(choice);
    if (measure == "rpi") {
        console.log("Test 1: Pass")
    } else {
        console.log("Test 1: Fail")
        console.log(measure)
    };

    const monthNeeded = await workOutMonthNeeded(choice);
    if (monthNeeded == "MAR") {
        console.log("Test 2: Pass")
    } else {
        console.log("Test 2: Fail")
        console.log(monthNeeded)
    };

    measure = "rpi";
    let cdid = await getCDID (measure);
    if (cdid == "czbh") {
        console.log("Test 3: Pass")
    } else {
        console.log("Test 3: Fail")
        console.log(timeSeries.date)
    };

    cdid = "kvr9";
    let timeSeries = await getDataforSeries(cdid);
    if (timeSeries.date == "20170515") {
        console.log("Test 4: Pass")
    } else {
        console.log("Test 4: Fail")
        console.log(timeSeries.date)
    };
    if (timeSeries.data[0].date == "1998 FEB") {
        console.log("Test 5: Pass")
    } else {
        console.log("Test 5: Fail")
        console.log(timeSeries.data[0].date)
    };


    // productMonth = "APR"
    // const monthNeeded = await workOutMonthNeeded(timeSeries, productMonth);
    // if (monthNeeded == "2016 APR") {
    //     console.log("Test 1: Pass")
    // } else {
    //     console.log("Test 1: Fail")
    //     console.log(monthNeeded)
    // }
}