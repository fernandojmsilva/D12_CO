var urlParams = new URLSearchParams(window.location.search)
console.log(urlParams.get('id'))


fetch(`https://safeandsoundpw.herokuapp.com/requests/${urlParams.get('id')}`)
    .then(response => response.json())
    .then(requests => {
        var dateOcurrenceInput = document.getElementById('dateOcurrence')
        var request = requests[0]
        console.log(request)
        dateOcurrenceInput.valueAsDate = new Date(request.date)
        dateOcurrenceInput.readOnly = true

        console.log(new Date(request.date))
        var timeOcurrenceInput = document.getElementById('timeOcurrence')
        timeOcurrenceInput.value = request.time
        timeOcurrenceInput.readOnly = true

        var localInput = document.getElementById('inputOptionLocal')
        localInput.value = request.place
        localInput.disable = true

        var entityInput = document.getElementById('inputEntity')
        entityInput.value = request.entity
        entityInput.readOnly = true

        var localityInput = document.getElementById('inputLocality')
        localityInput.value = request.locality
        localityInput.readOnly = true

        var addressInput = document.getElementById('inputAdress')
        addressInput.value = request.address
        addressInput.readOnly = true


        if (request.type == "furto") {
            var furto = document.getElementById('furto')
            furto.checked = true
        }
        else {
            var roubo = document.getElementById('roubo')
            roubo.checked = true
        }
        var descriptionInput = document.getElementById('TextareaDescription')
        descriptionInput.value = request.description;
        descriptionInput.readOnly = true

        if (request.anonymity == "Anonimo") {
            var anonymity = document.getElementById('anonimo')
            anonymity.checked = true
        }
        else {
            var naoAnonimo = document.getElementById('naoAnonimo')
            naoAnonimo.checked = true
            //dados do queixoso
            fetch(`https://safeandsoundpw.herokuapp.com/complainers`)
                .then(response => response.json())
                .then(complainers => {
                    complainers.map(complainer => {
                        if (request.fk_Requests_complainer_cc == complainer.complainer_cc) {
                            var ccInput = document.getElementById('inputCC')
                            ccInput.readOnly = true
                            ccInput.value = complainer.complainer_cc
                            var nameInput = document.getElementById('inputName')
                            nameInput.value = complainer.name
                            nameInput.readOnly = true
                            var emailInput = document.getElementById('inputEmail')
                            emailInput.value = complainer.email
                            emailInput.readOnly = true
                            var complainerAdressInput = document.getElementById('inputComplainerAddress')
                            complainerAdressInput.value = complainer.address
                            complainerAdressInput.readOnly = true
                            var contactInput = document.getElementById('inputContact')
                            contactInput.value = complainer.phone_number
                            contactInput.readOnly = true
                            var birthInput = document.getElementById('birth')
                            birthInput.valueAsDate = new Date(complainer.birth_date)
                            birthInput.readOnly = true
                            var codeInput = document.getElementById('inputCode')
                            codeInput.value = complainer.postal_code
                            codeInput.readOnly = true
                            if (complainer.gender == "M") {
                                var male = document.getElementById('male')
                                male.checked = true
                            }
                            else {
                                var female = document.getElementById('female')
                                female.checked = true
                            }



                        }
                    })
                })
        }


    })
