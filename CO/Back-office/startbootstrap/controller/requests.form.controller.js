function updateRequest(id, data) {
    return fetch(`https://safeandsoundpw.herokuapp.com/requests/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }).then(function(response) {
        if (!response.ok) {
            if (response.status === 409) {
                Swal.fire(
                    'Dados duplicados.',
                    'Reintroduza corretamente os dados',
                    'warning'
                )
            }
            else {
                throw Error(response.statusText);
            }
        }
        else {
            Swal.fire(
                'Pedido atualizado com sucesso.',
                '',
                'success'
            )
        }

        return response
    }).catch(function(err) {
        Swal.fire(
            'Oops!',
            `Erro:${err}. Pedido não submetido.Erro na alteraçao.Tente novamente.`,
            'error'
        )
    });
}

function saveRequest(request, complainer) {
    //criar dicionario
    var dataRequest = {};
    dataRequest.status = "Não Validado"
    dataRequest.status1 = "on"
    dataRequest.date = document.getElementById("dateOcurrence").value;
    dataRequest.time = document.getElementById("timeOcurrence").value;
    var inputOptionLocal = document.getElementById("inputOptionLocal");
    var place = inputOptionLocal.options[inputOptionLocal.selectedIndex].text;
    dataRequest.place = place;
    dataRequest.entity = document.getElementById("inputEntity").value;
    dataRequest.locality = document.getElementById("inputLocality").value;
    dataRequest.address = document.getElementById("inputAdress").value;
    dataRequest.type = document.getElementById("type").checked;
    dataRequest.urgency = document.getElementById("inputUrgency").value;
    if (document.getElementById('roubo').checked) {
        dataRequest.type = "roubo"
    }
    else {
        dataRequest.type = "furto"
    }

    dataRequest.description = document.getElementById("TextareaDescription").value;
    console.log(document.getElementById('anonimo').checked)
    if (document.getElementById('anonimo').checked) {
        var anonimityValue = document.getElementById('anonimo').value;
        dataRequest.anonymity = anonimityValue;
        updateRequest(request.request_id, dataRequest)
            .then(response => {
                Swal.fire(
                    'Pedido submetido com sucesso.',
                    '',
                    'success'
                )
            })
    }
    else {
        const dataComplainer = {}
        var anonimityValue = document.getElementById('naoAnonimo').value;
        dataRequest.anonymity = anonimityValue;

        dataComplainer.complainer_cc = document.getElementById("inputCC").value;
        dataComplainer.name = document.getElementById("inputName").value;
        dataComplainer.email = document.getElementById("inputEmail").value;
        dataComplainer.address = document.getElementById("inputComplainerAddress").value;
        dataComplainer.phone_number = document.getElementById("inputContact").value;
        dataComplainer.birth_date = document.getElementById("birth").value;
        dataComplainer.postal_code = document.getElementById("inputCode").value;
        dataComplainer.gender = document.getElementById('gender').value

        //submeter dados do queixoso no servidor
        fetch(`https://safeandsoundpw.herokuapp.com/complainers/${complainer.complainer_cc}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(dataComplainer)
        }).then(function(response) {
            if (!response.ok) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.url);
                if (response.status === 409) {
                    Swal.fire(
                        'Dados duplicados.',
                        'Reintroduza corretamente os dados',
                        'warning'
                    )
                }
                else {
                    throw Error(response.statusText);
                }

            }
            else {
                dataRequest.complainer_cc = dataComplainer.complainer_cc
                updateRequest(dataRequest)
                    .then(response => {
                        document.getElementById("formNewRequest").reset(); //limpeza dos dados do form
                        Swal.fire(
                            'Pedido atualizado e submetido com sucesso.',
                            '',
                            'success'
                        )
                    })

            }
        }).catch(function(err) {
            Swal.fire(
                'Oops!',
                `Erro:${err}. Pedido não submetido.Tente mais tarde.`,
                'error'
            )
        });
    }
}




window.onload = function() {
    //id passado no URL do browser e que corresponde ao id do pedido
    var urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    var request
    var complainer

    fetch(`https://safeandsoundpw.herokuapp.com/requests/${urlParams.get('id')}`)
        .then(response => response.json())
        .then(requests => {
            //todos os input por defeitos estao readOnly = true
            document.querySelectorAll('input').forEach(input => {
                input.readOnly = true
            })
            var dateOcurrenceInput = document.getElementById('dateOcurrence')
            request = requests[0]
            if (request.status == "Validado") {
                document.getElementById("changes").style.display = "none"
            }

            dateOcurrenceInput.valueAsDate = new Date(request.date)

            console.log(new Date(request.date))
            var timeOcurrenceInput = document.getElementById('timeOcurrence')
            timeOcurrenceInput.value = request.time


            var localInput = document.getElementById('inputOptionLocal')
            localInput.value = request.place
            localInput.disabled = true

            var entityInput = document.getElementById('inputEntity')
            entityInput.value = request.entity


            var localityInput = document.getElementById('inputLocality')
            localityInput.value = request.locality


            var addressInput = document.getElementById('inputAdress')
            addressInput.value = request.address


            var urgencyInput = document.getElementById('inputUrgency')
            urgencyInput.value = request.urgency


            if (request.type == "furto") {
                var furto = document.getElementById('furto')
                furto.checked = true
                roubo.disabled = true
                var roubo = document.getElementById('roubo')
            }
            else {
                var roubo = document.getElementById('roubo')
                roubo.checked = true
                var furto = document.getElementById('furto')
                furto.disabled = true
            }
            var descriptionInput = document.getElementById('TextareaDescription')
            descriptionInput.value = request.description;
            descriptionInput.readOnly = true

            if (request.anonymity == "Anonimo") {

                document.getElementById("complainer").style.display = "none"
                var anonymity = document.getElementById('anonimo')
                anonymity.checked = true
                var noAnonymity = document.getElementById('naoAnonimo')
                noAnonymity.disabled = true


            }
            else {
                var naoAnonimo = document.getElementById('naoAnonimo')
                naoAnonimo.checked = true
                var anonymity = document.getElementById('anonimo')
                anonymity.disabled = true
                document.getElementById("complainer").style.display = "block"
                //dados do queixoso
                fetch(`https://safeandsoundpw.herokuapp.com/complainers/${request.fk_Requests_complainer_cc}`)
                    .then(response => response.json())
                    .then(complainers => {
                        console.log(complainers)
                        var complainer = complainers[0]
                        //dados provenientes do servidor sao introduzidos no formulario 
                        if (request.fk_Requests_complainer_cc == complainers[0].complainer_cc) {
                            var ccInput = document.getElementById('inputCC')

                            ccInput.value = complainer.complainer_cc
                            var nameInput = document.getElementById('inputName')
                            nameInput.value = complainer.name

                            var emailInput = document.getElementById('inputEmail')
                            emailInput.value = complainer.email

                            var complainerAdressInput = document.getElementById('inputComplainerAddress')
                            complainerAdressInput.value = complainer.address

                            var contactInput = document.getElementById('inputContact')
                            contactInput.value = complainer.phone_number

                            var birthInput = document.getElementById('birth')
                            birthInput.valueAsDate = new Date(complainer.birth_date)

                            var codeInput = document.getElementById('inputCode')
                            codeInput.value = complainer.postal_code

                            var gender = document.getElementById('gender')
                            gender.disabled = true

                            if (complainer.gender == "M") {
                                var male = document.getElementById('male')
                                male.selected = true
                            }
                            else {
                                var female = document.getElementById('female')
                                female.selected = true
                            }



                        }

                    })
            }
            //initValidator criado no request.validator.js
            let validator = initValidator(() => saveRequest(request, complainer))


        })
    
    //quando se carrega no botao para editar:
    document.getElementById("changes").onclick = function(e) {
        //nao será possivel alterar o anonimato o pedido
        //para editar dados do pedido --> todas as tags input e textarea passam a input.readOnly = false
        document.getElementById('formNewRequest').querySelectorAll('input, textarea').forEach(input => {
            input.readOnly = false
        })
        //todas tags select deixam de estar disabled
        document.getElementById('formNewRequest').querySelectorAll('select, input[name="type"]').forEach(select => {
            select.disabled = false
        })
        //botao de guardar alteraçoes surge 
        document.getElementById("submit").style.display = 'block'


    }

}
