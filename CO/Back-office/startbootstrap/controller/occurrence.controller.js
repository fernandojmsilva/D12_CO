var urlParams = new URLSearchParams(window.location.search)
console.log(window.location)

$(document).ready(function() {
    fetch('https://safeandsoundpw.herokuapp.com/occurrences')
        .then(response => response.json())
        .then(occurrences => occurrences.filter(
            occurrence => occurrence.filed == "no"))
        .then(occurrences => {
            console.log(occurrences);
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
                var closestRow = $(this).closest('tr');
                var data = $table.row(closestRow).data();
                selectedOccurrence = data
                document.getElementById('occurrenceStartDate').value = parseDate(data.start_date)
                document.getElementById('occurrenceIdArchive').value = data.occurrence_id

                $('#occurrenceArchiveModal').modal('show')
            })
            $table.on('click', 'button.manager-action', function() {
                var closestRow = $(this).closest('tr');
                var data = $table.row(closestRow).data();
                selectedOccurrence = data
                document.getElementById('occurrenceStartDate').value = parseDate(data.start_date)
                
                document.getElementById('occurrenceIdArchive').value = data.occurrence_id
                var id = data.occurrence_id
                console.log(selectedOccurrence)
                window.location = `managers.html?id=${id}`
                

            })
            document.getElementById('archiveOccurrence').onclick = function(e) {
                var data = { ...selectedOccurrence }
                console.log(selectedOccurrence)
                var id = document.getElementById('occurrenceIdArchive').value
                var end_date = document.getElementById('endDateOcurrence').value
                var start_date = document.getElementById('occurrenceStartDate').value
                data.start_date = start_date
                data.filed = "yes"
                data.end_date = end_date
                delete data.occurrence_id
                console.log(data)
                fetch(`https://safeandsoundpw.herokuapp.com/occurrences/${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'PUT',
                    body: JSON.stringify(data)
                }).then(function(response) {
                    if (!response.ok) {

                        throw Error(response.statusText);

                    }
                    else alert("Occurrence archived with success");
                    window.location = "finished-occurrences.html"
                    return response
                }).catch(function(err) {
                    alert("Nao arquivada error");
                    console.error(err);
                });
            }

        })
});
