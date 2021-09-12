
function forwardForImage(id, postloc) {
    console.log("askldjf");
    let form_elem = document.getElementById(id).children;
    let data = [];
    for (i = 0; i < form_elem.length; i++) {
        console.log(form_elem[i]);
        if (form_elem[i].type == "text") {
            data.push(form_elem[i].name + "=" + encodeURIComponent(form_elem[i].value));
        }
        if (form_elem[i].type == "select-one") {
            data.push(form_elem[i].name + "=" + encodeURIComponent(form_elem[i].value));
        }
        if (form_elem[i].type == "file") {
            var file = document.getElementById(form_elem[i].id).files[0];
            getBase64(file, form_elem, i, data,  function(form_elem, i, data, res) {
                data.push(form_elem[i].name + "=" + encodeURIComponent(res));
            });
        }
    }
    console.log(data);
    console.log(data[3]);
    var params = data.join("&");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", postloc);
    console.log(params);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
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

