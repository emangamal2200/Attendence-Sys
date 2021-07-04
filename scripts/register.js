var randNum =0;
var password="";
window.addEventListener('load', function() {

    (function() {
        console.log('hello');
        var forms = document.querySelectorAll('.needs-validation')
        var btn2= document.getElementById("send");
        Array.prototype.slice.call(forms)
            .forEach(function(form) {
                btn2.addEventListener('click', function(event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            
                        } else {
                            user_inputs();
                            sendEmail();
                            console.log("sent");
                            
                        }
                        form.classList.add('was-validated')
                    },
                    false)
            })
    })()

});

let fname= document.getElementById('fname');
let lname= document.getElementById('lname');
randNum =Math.floor(Math.random() * 1000) + 1;;
password = Math.random().toString(36).slice(-8);
function sendEmail(){
    console.log("sss")
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "emangamal2200@gmail.com",
        Password : "804A3B4C08008072BBB7144DC32A4F2BC72A",
        To : `${email.value}`,
        From : "emangamal2200@gmail.com",
        Subject : "Attendence username and password ",
        Body : `Hello ${fname.value} welcome to our attendence system your Username:${fname.value.substring(0,4)+randNum+lname.value.substring(0,2)},Password:${password}`
    
    }).then(function(){
        alert("mail sent successfully");
        window.location.replace('login.html');
        
    });
    
}

function user_inputs() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", 'alldata.json');
    xhr.onload = function() {
        arr = JSON.parse(xhr.responseText);
        arr.push({
            'firstname': $('#fname').val(),
            'lastname': $('#lname').val(),
            'Address': $('#address').val(),
            'Email': $('#email').val(),
            'Age': $('#age').val(),
            'UserName':`${fname.value.substring(0,4)+randNum+lname.value.substring(0,2)}`,
            'Password':`${password}`,
            'flag': 'false',
            'attendence': [],
            'day': 0,
            'time': 0,
            'status': ""
        });
        SaveData(arr);
        console.log("hello");
    
    };
    xhr.send();
    
}

function SaveData() {
    var _StoreData = new Blob([JSON.stringify(arr)], { type:"appliction/json" });
    var Linkelement = document.createElement("a");
    Linkelement.href = window.webkitURL.createObjectURL(_StoreData);
    Linkelement.setAttribute("download", "alldata.json");
    document.body.appendChild(Linkelement);
    Linkelement.click();
    document.body.removeChild(Linkelement);
    
}