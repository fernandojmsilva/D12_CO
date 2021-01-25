var urlParams = new URLSearchParams(window.location.search)
window.onload = function() {
    $(document).ready(function() {
        fetch('https://safeandsoundpw.herokuapp.com/occurrences')
            .then(response => response.json())
            .then(occurrences => occurrences.filter(
                occurrence => occurrence.filed == "no"))
            .then(occurrences => {
                var tableBody = document.getElementById('dataTableOccurrences');
                var $table = $('#dataTableOccurrences').DataTable({
                    data: occurrences,
                    columns: [
                        { title: "#Id", data: 'occurrence_id' },
                        {
                            title: "Local",
                            data: 'local'
                        },
                        {
                            title: "Exigência",
                            data: 'evaluation'
                        },
                        { title: "Manager", data: 'fk_Occ_manager_id' },
                        { title: "Serviços", data: 'services' },
                        {
                            title: "Ações",
                            data: null,
                            "render": function(value, cell, occurrence) {

                                var action = `<a class="btn btn-primary btn-icon-split " href="anonymous.1.html?id=${occurrence.fk_Occ_request_id}" style="color:#091A44">
                                                                <span class="icon text-white">
                                                                    <i class="fas fa-eye"></i>
                                                                </span>
                                                                
                                                            </a>
                                                            
                                                            <a class="btn btn-primary btn-icon-split " href="services.html" style="color:#091A44">
                                                               <span class="icon text-white">
                                                                     <i class="fas fa-cog"></i>
                                                                </span>
                                                               
                                                               
                                                            </a>
                                                           <button class="btn btn-primary btn-icon-split archive-action">
                                                                <span class="icon text-white">
                                                                    <i class="fas fa-folder-open"></i>
                                                                </span>
                                                                
                                                            </button>`

                                if (occurrence.fk_Occ_manager_id == null) {
                                    action += `<button class="btn btn-primary btn-icon-split manager-action"  style="color:#091A44">
                                                                 <span class="icon text-white">
                                                                    <i class="fas fa-user-tie"></i> 
                                                                </span>
                                                            </button>`
                                }
                                return action
                            }
                        }
                    ]
                });
                let selectedOccurrence
                //archive occurrence action
                $table.on('click', 'button.archive-action', function() {
                    //dados da ocorrencia de determinada linha: linha onde foi acionado o botao de arquivo  
                    var closestRow = $(this).closest('tr');
                    var data = $table.row(closestRow).data();
                    selectedOccurrence = data
                    document.getElementById('occurrenceStartDate').value = parseDate(data.start_date)
                    document.getElementById('occurrenceIdArchive').value = data.occurrence_id

                    $('#occurrenceArchiveModal').modal('show')
                })
                //manager assigned action
                $table.on('click', 'button.manager-action', function() {
                    var closestRow = $(this).closest('tr');
                    var data = $table.row(closestRow).data();
                    selectedOccurrence = data
                    document.getElementById('occurrenceStartDate').value = parseDate(data.start_date)
                    document.getElementById('occurrenceIdArchive').value = data.occurrence_id
                    var id = data.occurrence_id
                   
                    window.location = `managers.html?id=${id}`


                })
                document.getElementById('archiveOccurrence').onclick = function(e) {
                    //spread operator: copia os dados da ocorrencia selecionada
                    //dicionario para submissao do PUT, estado da ocorrencia passa a terminado e filed = yes
                    var data = { ...selectedOccurrence }
                    var id = document.getElementById('occurrenceIdArchive').value
                    var end_date = document.getElementById('endDateOcurrence').value
                    var start_date = document.getElementById('occurrenceStartDate').value
                    data.start_date = start_date
                    data.filed = "yes"
                    data.status1 = "Terminado"
                    data.end_date = end_date
                    if (new Date(start_date) < new Date(end_date)) {
                        fetch(`https://safeandsoundpw.herokuapp.com/occurrences/${id}`, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'PUT',
                            body: JSON.stringify(data)
                        }).then(function(response) {
                            if (!response.ok) {
                                throw Error(response.statusText);
                            }
                            else {
                                //ocorrencia arquivada, manager associado à mesma fica Disponivel
                                var id = data.fk_Occ_manager_id
                                var dataManager = {}
                                fetch(`https://safeandsoundpw.herokuapp.com/operation_managers/${id}`)
                                    .then(response => response.json())
                                    .then(manager => {
                                        var birth_date = manager[0].birth_date
                                        dataManager.birth_date = parseDate(birth_date)
                                        dataManager.rating = manager[0].rating
                                        dataManager.phone_number = manager[0].phone_number
                                        dataManager.email = manager[0].email
                                        dataManager.availability = "Disponivel"
                                        dataManager.status = manager[0].status
                                        data.fk_OM_user_id = manager[0].fk_OM_user_id
                                        fetch(`https://safeandsoundpw.herokuapp.com/operation_managers/${id}`, {
                                            headers: { 'Content-Type': 'application/json' },
                                            method: 'PUT',
                                            body: JSON.stringify(dataManager)
                                        }).then(function(response) {
                                            if (!response.ok) {
                                                throw Error(response.statusText);
                                            }
                                            else {
                                                Swal.fire(
                                                    'Atribuição de gestor!',
                                                    `Gestor com id=${id} está agora disponível.`,
                                                    'info'
                                                )
                                            }

                                        })
                                    })
                                Swal.fire(
                                    'Ocorrência arquivada com sucesso.',
                                    '',
                                    'success'
                                ).then((result => {
                                    window.location = "finished-occurrences.html"
                                }))

                            }
                        }).catch(function(err) {
                            Swal.fire(
                                'Oops!',
                                `Erro: Ocorrência não arquivada. Tente mais tarde.`,
                                'error'
                            )
                        })
                    }
                    else {
                        Swal.fire(
                            'Oops!',
                            `End-Date da ocorrência tem de ser posterior à Start-Date. A ocorrência começou a ${start_date}.`,
                            'warning'
                        )
                    }
                }

            })
    })
}
