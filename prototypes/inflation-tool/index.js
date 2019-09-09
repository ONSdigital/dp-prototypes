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


async function getInflationFigure() {
    const timeSeries = await getDataforSeries();
    console.log(timeSeries.date)
    console.log(timeSeries.data)
}

let cdid = "chaw"


//Get the time series data for the series related to the one selected
function getDataforSeries() {
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
    let cdid = "kvr9"
    const timeSeries = await getDataforSeries(cdid);
    if (timeSeries.date == "20190813") {
        console.log("Test 1: Pass")
    } else {
        console.log("Test 1: Fail")
        console.log(timeSeries.date)
    }
    if (timeSeries.data[0].date == "1987 JAN") {
        console.log("Test 1: Pass")
    } else {
        console.log("Test 1: Fail")
        console.log(timeSeries.data[0].date)
    }
}