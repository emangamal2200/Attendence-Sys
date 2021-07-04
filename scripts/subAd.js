window.addEventListener('load', function() {
    loadData();
    userAttNm = document.getElementById('confirnattend');
    empfn = document.getElementById('lblusername');
    attenTime = document.getElementById('lbltimeatten');
});

function attenbtn() {
    var k = 0;
    for (var i = 0; i <= arr.length; i++) {
        if (k == 0) {
            if (userAttNm.value == arr[i].UserName) {
                var attTb = arr[i];
                 empfn.innerText = arr[i].firstname;
                var today = new Date()
                var _time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                arr[i].time = _time;
                attenTime.innerText = _time;
                k = 1;
            }
        }
    }
    if (attTb.day == 0) {
        if (today.getHours() == 8 && today.getMinutes() >= 0 && today.getMinutes() < 58) {
            attTb.day = 1;
            attTb.attendence[0].attend++;
            attTb.status = "You attended today";
            SaveData(arr);
        } else if (today.getHours() == 9 && today.getMinutes() >= 10 && today.getMinutes() < 58) {
            attTb.day = 1;
            attTb.attendence[0].attend++;
            attTb.attendence[0].latetime++;
            attTb.status = "You are late today";
            SaveData(arr);
        }
    } else {
        alert("You have confirmed attendence..");
    }
}

function btnsubadmin() {
    localStorage.clear();
    localStorage.setItem('username', 'jiji5000');
    window.location.href = 'empdet.html';
}

function finishday() {
    for (i = 0; i < arr.length; i++) {
        if (arr[i].flag == "true") {
            if (arr[i].day == 0) {
                arr[i].attendence[(arr[i].attendence.length) - 1].abcensetime++;
            } else {
                arr[i].day = 0;
                arr[i].time = 0;
                arr[i].status = "";
            }
        }

    }
    SaveData(arr);
}

function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", 'alldata.json');
    xhr.onload = function() {
        console.log("from on load xhr");
        arr = JSON.parse(xhr.responseText);
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