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
    if (monthNeeded.text == "MAR") {
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

    let today = new Date ("17 Feb 2017");
    let yearNeeded = await getYearNeededFromSeries(timeSeries, monthNeeded, today)
    if (yearNeeded == "2017") {
        console.log("Test 6: Pass")
    }else {
        console.log("Test 6: Fail")
        console.log(yearNeeded)
    };
}