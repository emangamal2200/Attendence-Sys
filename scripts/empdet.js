window.addEventListener('load', function() {
    load_data();
});



function load_data() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", 'alldata.json');
    xhr.onload = function() {
        console.log("from on load xhr");
        arr = JSON.parse(xhr.responseText);
        console.log(arr);
        var message = localStorage.getItem('username');
        for (var j = 0; j < arr.length; j++) {
            if (arr[j].UserName == message) {
                {
                    document.getElementById('lbl_name').innerText = arr[j].firstname;
                    document.getElementById('attendence_report').innerText = arr[j].attendence[0].attend;
                    document.getElementById('late_report').innerText = arr[j].attendence[0].latetime;
                    document.getElementById('absence_report').innerText = arr[j].attendence[0].abcensetime;
                    document.getElementById('lbl_time').innerText = arr[j].time;
                    if (arr[j].day == 1) {
                        document.getElementById('attendence_lbl').innerText = arr[j].status;
                    } else {
                        document.getElementById('attendence_lbl').innerText = "You are absent today";
                    }
                }
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