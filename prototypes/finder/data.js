fetch("data/data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        for (i = 0; i < myJson.length; i++) {
            tr = createNode("tr");
            tr.innerHTML = "<tr><td class='align-left' ><a href = " + myJson[i].URL + ">" + myJson[
                    i].Dataset + "</a></td><td class='align-left' >" + myJson[i].Domain +
                "</td><td class='align-left'>" + myJson[i].Frequency +
                "</td><td class='align-left'>" + myJson[i].Geographicalcoverage +
                "</td><td class='align-left'>" + myJson[i].Dimensions + "</td></tr>"
            append(equalities, tr);
        }

    });