
function forwardForImage(id, postloc) {
    console.log("askldjf");
    let form_elem = document.getElementById(id).children;
    let data = [];
    var base64=""
    for (i = 0; i < form_elem.length; i++) {
        console.log(form_elem[i]);
        if (form_elem[i].type == "text") {
            data.push(form_elem[i].name + "=" + encodeURIComponent(form_elem[i].value));
        }
        if (form_elem[i].type == "select-one") {
            data.push(form_elem[i].name + "=" + encodeURIComponent(form_elem[i].value));
        }
        if (form_elem[i].type == "file") {
            var file = document.querySelector('input[type=file]')['files'][0]
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload=function() {
                base64 = reader.result
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    var file = document.querySelector('input[type=file]')['files'][0]
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload=function() {
        data.push(reader.result)
        console.log(data)
        var params = data.join("&");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", postloc);
        console.log(params);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    console.log(data);
    
}

function getBase64(file, form_elem, i, data, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callback(form_elem, i, data, reader.result);
   };
    reader.onerror = function (error) {
        console.log('Error: ', error);
   };
}

