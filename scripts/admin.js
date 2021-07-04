window.addEventListener('load', function() {

    loadData();


    $(document).on('click', '.decline', function(e) {
        var checkboxes = document.getElementsByClassName('checkbtn');
        var table = document.getElementById('_tbl');
        for (var i = 0; i < table.rows.length; i++) {
            if (checkboxes[i].checked == true) {
                var row = checkboxes[i].parentNode.parentNode;
                var msg = row.cells[3].innerHTML;
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j].Email == msg) {
                        arr.splice(j, 1);
                    }
                }
                _tbl.deleteRow(i);
                i--;
            }
        }
        SaveData(arr);
    });
    

    $(document).on('click', '.approve', function(e) {
        var checkboxes = document.getElementsByClassName('checkbtn');
        var table = document.getElementById('_tbl');
        for (var i = 0; i < table.rows.length; i++) {
            if (checkboxes[i].checked == true) {
                var row = checkboxes[i].parentNode.parentNode;
                var msg = row.cells[3].innerHTML;
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j].Email == msg) {
                        arr[j].flag = "true";
                        arr[j].attendence.push({
                            "attend": 0,
                            "latetime": 0,
                            "abcensetime": 0
                        });
                    }
                }
                _tbl.deleteRow(i);
                i--;
            }
        }
        SaveData(arr);
    });

});


function loadData() {
    var xhr = new XMLHttpRequest();
                xhr.open("get", 'alldata.json');
                xhr.onload = function() {
                    console.log("from on load xhr");
                    arr = JSON.parse(xhr.responseText);
                    console.log(arr);
                    var tbl = document.getElementById("_tbl");
                    var full_table = document.getElementById('mytable');
                    var tblate = document.getElementById('latetab');
                    var tbexcuse = document.getElementById('excuetab');
                    for (var i = 1; i < arr.length; i++) {
                        if (arr[i].flag == "false") {
                            var _tr = "<tr><td>" + arr[i].firstname + "</td><td>" + arr[i].lastname + "</td><td>" + arr[i].Address + "</td><td>" + arr[i].Email + "</td><td>" + arr[i].Age + "</td><td><input type='checkbox' class='checkbtn'></td></tr>";
                            tbl.innerHTML += _tr;
                        } else if (arr[i].flag == "true") {
                            var _tr = "<tr><td >" + arr[i].firstname + "</td><td>" + arr[i].attendence[0].attend + "</td><td>" + arr[i].attendence[0].latetime + "</td><td>" + arr[i].attendence[0].abcensetime + "</td></tr>";
                            full_table.innerHTML += _tr;
                            var ttrt = "<tr><td>" + arr[i].firstname + "</td><td>" + arr[i].attendence[0].abcensetime + "</td></tr>";
                            tbexcuse.innerHTML += ttrt;
                        }
                    }
                    for (i = 1; i < arr.length; i++) {
                        if (arr[i].attendence.latetime != 0 && arr[i].flag == "true") {
                            var ttr = "<tr><td>" + arr[i].firstname + "</td><td>" + arr[i].attendence[0].latetime + "</td></tr>";
                            tblate.innerHTML += ttr;
                        }
        
                    }
                }
                xhr.send();
   
}


function SaveData() {
    var _StoreData = new Blob([JSON.stringify(arr)], {
        type: "appliction/json"
    });
    var Linkelement = document.createElement("a");
    Linkelement.href = window.webkitURL.createObjectURL(_StoreData);
    Linkelement.setAttribute("download", "alldata.json");
    document.body.appendChild(Linkelement);
    Linkelement.click();
    document.body.removeChild(Linkelement);
}