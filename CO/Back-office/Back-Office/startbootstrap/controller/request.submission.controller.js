window.onload = function() {

    let validator = new Validator(document.getElementById("formNewRequest"), function(err, res) {
        console.log(res)
        console.log(err)
        if (res) {
            saveRequest();
        }
    }, {
        errorClassName: 'help-block',
        rules: {

            birth: function(value) {
                console.log(value)
                return (new Date(value) < new Date(document.getElementById("dateOcurrence").value));
            }
        },
        messages: {
            en: {
                birth: {
                    incorrect: "Date Ocurrence must be after complainer's birth"
                }
            }
        }
    });

    function saveRequest() {
        //criar dicionario
        var data = {};
        data.date = document.getElementById("dateOcurrence").value;
        data.time = document.getElementById("timeOcurrence").value;
        var inputOptionLocal = document.getElementById("inputOptionLocal");
        var place = inputOptionLocal.options[inputOptionLocal.selectedIndex].text;
        data.place = place;
        data.entity = document.getElementById("inputEntity").value;
        data.locality = document.getElementById("inputLocality").value;
        data.address = document.getElementById("inputAdress").value;
        data.type = document.getElementById("type").checked;
        data.urgency = document.getElementById("inputUrgency").value;
        if (document.getElementById('roubo').checked) {
                data.type = "roubo"
            }
            else {
                data.type = "furto"
            }
            
        data.description = document.getElementById("TextareaDescription").value;
        if (document.getElementById('anonimo').checked) {
            var anonimityValue = document.getElementById('anonimo').value;
            data.anonymity = anonimityValue;
        }
        else {
            var anonimityValue = document.getElementById('naoAnonimo').value;
            data.anonymity = anonimityValue;
            data.complainer_cc = document.getElementById("inputCC").value;
            data.name = document.getElementById("inputName").value;
            data.email = document.getElementById("inputEmail").value;
            data.address = document.getElementById("inputComplainerAddress").value;
            data.phone_number = document.getElementById("inputContact").value;
            data.birth_date = document.getElementById("birth").value;
            data.postal_code = document.getElementById("inputCode").value;
            if (document.getElementById('male').checked) {
                data.gender = "M"
            }
            else {
                data.gender = "F"
            }
            //submeter dados do queixoso no servidor
            fetch('https://safeandsoundpw.herokuapp.com/complainers', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function(response) {
                if (!response.ok) {
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.headers);
                    console.log(response.url);
                    if (response.status === 409) {
                        alert("Duplicated Email");
                    }
                    else {
                        throw Error(response.statusText);
                    }

                }
                else {
                    document.getElementById("formNewRequest").reset(); //limpeza dos dados do form
                    alert("Complainer data submitted with success");
                }
            }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                alert("Complainer data submission error");
                console.error(err);
            });
        }
        console.log(data.time)
        //submeter dados do pedido no servidor
        fetch('https://safeandsoundpw.herokuapp.com/requests', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function(response) {
            if (!response.ok) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.url);
                if (response.status === 409) {
                    alert("Duplicated Email");
                }
                else {
                    throw Error(response.statusText);
                }

            }
            else {
                document.getElementById("formNewRequest").reset(); //limpeza dos dados do form
                alert("submitted with success");
            }
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            alert("Submission error");
            console.error(err);
        });
        console.log(data)
    }
}
