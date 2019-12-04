const btns = domainButtons.getElementsByClassName("btn")
const showAll = document.getElementById('showall')

function selectDomain() {

    // Declare variables 
    let input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("myInput");
    if (input.value === "All domains") {
        filter = ""
    } else {
        filter = input.value.toUpperCase();
    }
    table = document.getElementById("equalities");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterSelection(data) {
    // Declare variables 
    let input, filter, table, tr, td, i, txtValue;

    input = data;
    filter = input.toUpperCase();
    table = document.getElementById("equalities");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                //tr[i].style.display = "";                             
            } else {
                tr[i].style.display = "none";
                if (data === "showall") {
                    tr[i].style.display = "";
                }
            }
        }
    }

    if (data === "showall") {
        showAll.className += " btn--secondary-active";
    }

    for (b = 0; b < btns.length; b++) {
        if (data === "showall") {
            btns[b].className = btns[b].className.replace(" btn--secondary-active", "")
        } else if (btns[b].name === data) {
            btns[b].className += " btn--secondary-active";
            showAll.className = showAll.className.replace(" btn--secondary-active", "")
        }
    }
}