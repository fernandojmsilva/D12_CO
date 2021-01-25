window.onload = function() {
    $(document).ready(function() {
        fetch('https://safeandsoundpw.herokuapp.com/operation_managers')
            .then(response => response.json())
            .then(managers => {
                var $table = $('#dataTableManagers').DataTable({
                    data: managers,
                    columns: [
                        { title: "#Id", data: 'manager_id' },
                        {
                            title: "Birth Date",
                            data: 'birth_date',
                            "render": function(value, cell, request) {
                                return formatDate(value)
                            }
                        },
                        {
                            title: "Rating",
                            data: 'rating',
                            "render": function(value, cell, manager) {
                                //cell propriedades da celula
                                var rating = ""
                                for (var i = 0; i < manager.rating; i++) {

                                    rating += `<span class="fa fa-star"></span>`
                                }
                                return rating
                            }

                        },
                        {
                            title: "Disponibilidade",
                            data: 'availability',
                            "render": function(value, cell, manager) {
                                return `<span class="btn btn-${value == "Disponivel" ? 'success':'warning'} btn-icon-split">${value}</span>`
                            }
                        },
                        { title: "Contacto", data: 'phone_number' },
                        { title: "Email", data: 'email' },
                        {
                            title: "Ações",
                            data: null,
                            "render": function(value, cell, manager) {

                                var action
                                if (manager.availability == "Disponivel") {
                                    var action = `<button class="btn btn-secondary btn-icon-split manager-assign">
                                    <span class="text-white">
                                           Atribuir
                                        </span>
                                                    </button>`
                                }
                                else { action = "" }
                                return action
                            }
                        }
                    ]
                });
                let selectedManager
                $table.on('click', 'button.manager-assign', function() {
                    var urlParams = new URLSearchParams(window.location.search)
                    const id = urlParams.get('id')
                    var closestRow = $(this).closest('tr');
                    var dataManager = $table.row(closestRow).data();
                    selectedManager = dataManager
                    const manager_id = dataManager.manager_id
                    var data = {}
                    data.fk_Occ_manager_id = manager_id
                    fetch(`https://safeandsoundpw.herokuapp.com/occurrences/${urlParams.get('id')}`)
                        .then(response => response.json())
                        .then(occurrence => {
                            var start_date = occurrence[0].start_date
                            data.start_date = parseDate(start_date)
                            data.status1 = occurrence[0].status1
                            data.local = occurrence[0].local
                            data.evaluation = occurrence[0].evaluation
                            data.access_code = occurrence[0].access_code
                            data.fk_Occ_request_id = occurrence[0].fk_Occ_request_id
                            data.status2 = occurrence[0].status2
                            data.filed = "no"
                            fetch(`https://safeandsoundpw.herokuapp.com/occurrences/${urlParams.get('id')}`, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'PUT',
                                body: JSON.stringify(data)
                            }).then(function(response) {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                }
                                else {
                                    var data = { ...selectedManager }
                                    data.availability = "Indisponivel"
                                    var birth_date = parseDate(data.birth_date)
                                    data.birth_date = birth_date
                                    fetch(`https://safeandsoundpw.herokuapp.com/operation_managers/${manager_id}`, {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'PUT',
                                        body: JSON.stringify(data)
                                    }).then(function(response) {
                                        if (!response.ok) {
                                            throw Error(response.statusText);
                                        }
                                        else {
                                            Swal.fire(
                                                'Atribuição de gestor feita com sucesso.',
                                                `Gestor com id=${manager_id} está agora indisponível.`,
                                                'success'
                                            ).then((result => {
                                                window.location = "occurrences.html"
                                            }))
                                        }
                                        return response
                                    }).catch(function(err) {
                                        Swal.fire(
                                            'Oops',
                                            `Ocorreu um erro.Tente mais tarde.`,
                                            'erro'
                                        ).then((result => {
                                            window.location = "occurrences.html"
                                        }))

                                    })

                                }
                                return response
                            }).catch(function(err) {
                                Swal.fire(
                                    'Oops',
                                    `Ocorreu um erro na atribuição.Tente mais tarde.`,
                                    'erro'
                                ).then((result => {
                                    window.location = "occurrences.html"
                                }))
                            });
                        })



                })
            })
    });
}
