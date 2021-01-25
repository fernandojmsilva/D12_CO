window.onload = function() {
    $(document).ready(function() {
        fetch('https://safeandsoundpw.herokuapp.com/requests')
            .then(response => response.json())
            .then(requests => requests.filter(
                request => request.filed == "No"))
            .then(requests => {
                var tableBody = document.getElementById('tableBody');
                var $table = $('#dataTableRequests').DataTable({
                    data: requests,
                    columns: [
                        { title: "#Id", data: 'request_id' },
                        {
                            title: "Data",
                            data: 'date',
                            "render": function(value, cell, request) {
                                return formatDate(value)
                            }
                        },
                        {
                            title: "Status",
                            data: 'status',
                            "render": function(value, cell, request) {
                                //cell propriedades da celula
                                return `<span class="btn btn-${value == "Validado" ? 'success':'warning'} btn-icon-split">${value}</span>`
                            }
                        },
                        { title: "Urgência", data: 'urgency' },
                        { title: "Tipo", data: 'type' },
                        {
                            title: "Ações",
                            data: null,
                            "render": function(value, cell, request) {

                                var action = `<a class="btn btn-primary btn-icon-split " href="anonymous.1.html?id=${request.request_id}" style="color:#091A44">
                                        <span class="icon text-white">
                                            <i class="fas fa-eye"></i>
                                        </span>
                                        </a>
                                        <button class="btn btn-primary btn-icon-split archive-action">
                                            <span class="icon text-white">
                                                <i class="fas fa-folder-open"></i>
                                            </span>
                                        </button>`

                                if (request.status != "Validado") {
                                    action += `<button class="btn btn-primary btn-icon-split validate-action" >
                                        <span class="icon text-white">
                                            <i class="fas fa-check"></i>
                                        </span>
                                       </button>`
                                }
                                return action
                            }
                        }
                    ]
                });
                let selectedRequest
                //validate request actions
                $table.on('click', 'button.validate-action', function() {
                    var closestRow = $(this).closest('tr');
                    var data = $table.row(closestRow).data();
                    selectedRequest = data
                    document.getElementById('requestIdValidate').value = data.request_id
                    document.getElementById('requestStartDate').value = parseDate(data.date)
                    document.getElementById('requestLocality').value = data.locality
                    $('#requestValidateModal').modal('show')
                })

                document.getElementById('requestValidate').onclick = function(e) {
                    var data = {}
                    data.evaluation = document.getElementById('occurrenceEvaluation').value
                    //data.start_date = data.date
                    var start_date = document.getElementById('requestStartDate').value
                    data.filed = "No"
                    data.start_date = start_date
                    data.status1 = "A decorrer"
                    data.local = document.getElementById('requestLocality').value
                    data.status2 = "on"
                    data.fk_Occ_request_id = document.getElementById('requestIdValidate').value
                    fetch(`https://safeandsoundpw.herokuapp.com/occurrences`, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify(data)
                    }).then(function(response) {
                        if (!response.ok) {
                            if (response.status === 409) {
                                Swal.fire(
                                    'Dados duplicados.',
                                    'Introduza corretamente os dados',
                                    'warning'
                                )
                            }
                            else {
                                throw Error(response.statusText);
                            }

                        }
                        else {
                            //spread Operator - copia dos dados do request
                            var data = { ...selectedRequest }
                            data.status = "Validado"
                            var id = document.getElementById('requestIdValidate').value
                            fetch(`https://safeandsoundpw.herokuapp.com/requests/${id}`, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'PUT',
                                body: JSON.stringify(data)
                            }).then(function(response) {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                }
                                Swal.fire(
                                    'Pedido validado com sucesso.',
                                    '',
                                    'success'
                                ).then((result => {
                                    window.location = "occurrences.html"
                                }))
                                return response
                            }).catch(function(err) {
                                Swal.fire(
                                    'Oops!',
                                    `Erro:${err} Pedido não validado.Tente mais tarde.`,
                                    'error'
                                )
                            });

                        }
                    }).catch(function(err) {
                        Swal.fire(
                            'Oops!',
                            `Erro:${err} Pedido não validado.Tente mais tarde.`,
                            'error'
                        )
                    });
                }
                //archive request action
                $table.on('click', 'button.archive-action', function() {
                    var closestRow = $(this).closest('tr');
                    var data = $table.row(closestRow).data();
                    data.filed = "Yes"
                    data.date = parseDate(data.date)
                    var id = data.request_id
                    delete data.request_id
                    fetch(`https://safeandsoundpw.herokuapp.com/requests/${id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'PUT',
                        body: JSON.stringify(data)
                    }).then(function(response) {
                        if (!response.ok) {
                            throw Error(response.statusText);
                            Swal.fire(
                                'Pedido arquivado com sucesso.',
                                '',
                                'success'
                            ).then((result => {
                                window.location = "archived-requests.html"
                            }))
                            return response
                        }
                    }).catch(function(err) {

                        Swal.fire(
                            'Oops!',
                            `Erro:${err}.Pedido não arquivado.Tente mais tarde.`,
                            'error'
                        )
                    });
                })


            })


    });
}
