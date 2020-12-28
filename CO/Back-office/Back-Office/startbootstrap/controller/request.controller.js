//pedir dados
//iterar tabela :linha e celula 
//colocar dados que vem no sitio certo 

fetch('https://safeandsoundpw.herokuapp.com/requests')
    .then(response => response.json())
    .then(requests => {
        console.log(requests);
        var tableBody = document.getElementById('tableBody');
        requests.map(request => {
            console.log(request.anonymity)
            var row = tableBody.insertRow(tableBody.rows.length)
            var idCell = row.insertCell()
            idCell.innerHTML = request.request_id;
            var dateCell = row.insertCell()
            dateCell.innerHTML = request.date;
            var statusCell = row.insertCell()
            var statusCellContent = `<span class="btn btn-${request.status == "Validado" ? 'success':'warning'} btn-icon-split">${request.status}</span>`
            statusCell.innerHTML = statusCellContent;
            var urgencyCell = row.insertCell()
            urgencyCell.innerHTML = request.urgency;
            var typeCell = row.insertCell()
            typeCell.innerHTML = request['type'];
            console.log(request.type)
            var actionsCell = row.insertCell()
            var actionsCellContent = `<a class="btn btn-primary btn-icon-split " href="anonymous.html?id=${request.request_id}" style="color:#091A44">
                                        <span class="icon text-white">
                                            <i class="fas fa-eye"></i>
                                        </span>
                                        </a>
                                        <a class="btn btn-primary btn-icon-split ">
                                            <span class="icon text-white">
                                                <i class="fas fa-folder-open" data-toggle="modal" data-target="#archiveRequestsModal"></i>
                                            </span>
                                        </a>`
            if (request.status != "Validado") {
                actionsCellContent += `<a class="btn btn-primary btn-icon-split ">
                                        <span class="icon text-white">
                                            <i class="fas fa-check" data-toggle="modal" data-target="#successModal"></i>
                                        </span>
                                       </a>`
            }
            actionsCell.innerHTML = actionsCellContent;
        })
    })

/*


        }
        else {
            anonimityValue = document.getElementById('naoAnonimo').value;
            data.inputCC = document.getElementById("inputCC").value;
            data.inputName = document.getElementById("inputName").value;
            data.inputEmail = document.getElementById("inputEmail").value;
            data.inputComplainerAddress = document.getElementById("inputComplainerAddress").value;
            data.inputContact = document.getElementById("inputContact").value;
            data.inputBirth = document.getElementById("inputBirth").value;
            data.inputZip = document.getElementById("inputZip").value;
            data.anonimity = anonimityValue;
            data.date = document.getElementById("dateOcurrence").value;
            data.time = document.getElementById("timeOcurrence").value;
            data.gender = document.getElementById("genero").checked.value;
            var inputOptionLocal = document.getElementById("inputOptionLocal");
            var local = inputOptionLocal.options[inputOptionLocal.selectedIndex].text;
            data.local = local;
            data.entity = document.getElementById("inputEntity").value;
            data.locality = document.getElementById("inputLocality").value;
            data.inputAdress = document.getElementById("inputAdress").value;
            data.type = document.getElementById("type").checked.value;
        }

    }*/

