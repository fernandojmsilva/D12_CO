var urlParams = new URLSearchParams(window.location.search)
console.log(window.location)


fetch('https://safeandsoundpw.herokuapp.com/occurrences')
    .then(response => response.json())
    .then(occurrences => {
        console.log(occurrences);
        occurrences.map(occurrence => {
            var tableBody = document.getElementById('tableBodyOccurrences');
            if (occurrence.status1 == "A decorrer") {
                var row = tableBody.insertRow(tableBody.rows.length)
                var idCell = row.insertCell()
                idCell.innerHTML = occurrence.occurrence_id;
                var localCell = row.insertCell()
                localCell.innerHTML = occurrence.local
                var evaluationCell = row.insertCell()
                evaluationCell.innerHTML = occurrence.evaluation
                var managerCell = row.insertCell()
                managerCell.innerHTML = occurrence.fk_Occ_manager_id
                var servicesCell = row.insertCell()
                servicesCell.innerHTML = occurrence.services
                var actionsCell = row.insertCell()
                var actionsCellContent = `<a class="btn btn-primary btn-icon-split " href="anonymous.html?id=${occurrence.fk_Occ_request_id}" style="color:#091A44">
                                                    <span class="icon text-white">
                                                        <i class="fas fa-eye"></i>
                                                    </span>
                                                    
                                                </a>
                                                
                                                <a class="btn btn-primary btn-icon-split " href="services.html" style="color:#091A44">
                                                   <span class="icon text-white">
                                                         <i class="fas fa-cog"></i>
                                                    </span>
                                                   
                                                   
                                                </a>
                                               <a class="btn btn-primary btn-icon-split">
                                                    <span class="icon text-white">
                                                        <i class="fas fa-folder-open"  data-toggle="modal" data-target="#archiveModal"></i>
                                                    </span>
                                                    
                                                </a>`
                if (occurrence.fk_Occ_manager_id == null) {
                    actionsCellContent += ` <a class="btn btn-primary btn-icon-split " href="managers.html" style="color:#091A44">
                                                     <span class="icon text-white">
                                                        <i class="fas fa-user-tie"></i> 
                                                    </span>
                                                </a>`
                }
                actionsCell.innerHTML = actionsCellContent;
            }
            else {
                var tableBody = document.getElementById('tableBodyFinishedOccurrences');

            }
        })
    })
