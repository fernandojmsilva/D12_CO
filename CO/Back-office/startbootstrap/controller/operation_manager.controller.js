$(document).ready(function() {
    fetch('https://safeandsoundpw.herokuapp.com/operation_managers')
        .then(response => response.json())
        .then(managers => {
            console.log(managers);
            var $table = $('#dataTableManagers').DataTable({
                data: managers,
                columns: [
                    { title: "#Id", data: 'manager_id' },
                    {
                        title: "Birth Date",
                        data: 'birth_date'
                    },
                    {
                        title: "Distância ao local (Km) ",
                        data: 'distance_from_scene'
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
                            return action
                        }
                    }
                ]
            });
            let selectedManager
            $table.on('click', 'button.manager-assign', function() {
                var urlParams = new URLSearchParams(window.location.search)
                console.log(urlParams.get('id'))
                const id = urlParams.get('id')
                var closestRow = $(this).closest('tr');
                var dataManager = $table.row(closestRow).data();
                selectedManager = dataManager
                const manager_id = dataManager.manager_id
                console.log(dataManager)
                var data = {}
                data.fk_Occ_manager_id = manager_id
                fetch(`https://safeandsoundpw.herokuapp.com/occurrences/${urlParams.get('id')}`)
                    .then(response => response.json())
                    .then(occurrence => {
                        console.log(occurrence)
                        data.start_date = occurrence.start_date
                        data.status1 = occurrence.status1
                        data.local = occurrence.local
                        data.evaluation = occurrence.evaluation
                        data.access_code = occurrence.access_code
                        data.fk_Occ_request_id = occurrence.fk_Occ_request_id
                        data.status2 = occurrence.status2
                         console.log(data)
                    })
               
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
                        fetch(`https://safeandsoundpw.herokuapp.com/operation_managers/${manager_id}`, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'PUT',
                            body: JSON.stringify(data)
                        }).then(function(response) {
                            if (!response.ok) {
                                throw Error(response.statusText);
                            }
                            else {

                                alert("Manager changed and assigned with success");
                                window.location = "occurrences.html"

                            }
                            return response
                        }).catch(function(err) {
                            alert("Manager changed error");
                            console.error(err);
                        })

                    }
                    return response
                }).catch(function(err) {
                    alert("assigned error");
                    console.error(err);
                });

            })
        })
});
