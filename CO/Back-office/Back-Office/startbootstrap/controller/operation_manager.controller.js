$(document).ready(function() {
fetch('https://safeandsoundpw.herokuapp.com/operation_managers')
    .then(response => response.json())
    .then(managers => {
        console.log(managers);
        var tableBody = document.getElementById('tableBodyOperationManagers');
        managers.map(manager => {
            var row = tableBody.insertRow(tableBody.rows.length)
            var idCell = row.insertCell()
            idCell.innerHTML = manager.manager_id;
            var dateCell = row.insertCell()
            dateCell.innerHTML = manager.birth_date;
            var distanceCell = row.insertCell()
            distanceCell.innerHTML = manager.distance_from_scene;
            var ratingCell = row.insertCell()
            for (var i = 0; i < manager.rating; i++) {
                ratingCell.innerHTML += `<span class="fa fa-star"></span>`
            }
            var availabilityCell = row.insertCell()
            var availabilityCellContent = `<span class="btn btn-${manager.availability == "Disponivel" ? 'success':'warning'} btn-icon-split">${manager.availability}</span>`
            availabilityCell.innerHTML = availabilityCellContent;
            var contactCell = row.insertCell()
            contactCell.innerHTML = manager.phone_number;
            var emailCell = row.insertCell()
            emailCell.innerHTML = manager.email;

            var actionsCell = row.insertCell()
            if (manager.availability == "Disponivel") {
                var actionsCellContent = `<button href="description.html" class="btn btn-secondary btn-icon-split"  data-toggle="modal" data-target="#successModal" >
                                                    <span class="text">Atribuir</span> 
                                                </button>`
            }
            actionsCell.innerHTML = actionsCellContent;
        })
    })
     $('#dataTable').DataTable();
});