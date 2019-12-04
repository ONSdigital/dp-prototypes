fetch("data/setup.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("page-title").innerHTML = data.title;
        document.getElementById("description").innerHTML = data.description;
        document.getElementById("domain1").innerHTML = data.toplevellabel;
        document.getElementById("domain2").innerHTML = data.toplevellabel;

        for (i = 0; i < data.toplevel.length; i++) {
            option = document.createElement("option")
            option.innerHTML = data.toplevel[i]
            myInput.append(option)
        }

        for (i = 0; i < data.secondarylevel.length; i++) {
            domain = document.createElement("span")
            onClickLabel = "filterSelection('" + data.secondarylevel[i] + "')"
            domain.innerHTML = "<button name='" + data.secondarylevel[i] + "' class='btn btn--secondary btn--small margin-top-lg--1 margin-top-md--1 margin-top-sm--1' onclick=" + onClickLabel + ">" + data.secondarylevel[i] + "</button>"
            domainButtons.append(domain)
        }
    });