window.onload = function() {
    $(document).ready(function() {
        fetch('https://safeandsoundpw.herokuapp.com/occurrences')
            .then(response => response.json())
            .then(occurrences => occurrences.filter(
                occurrence => occurrence.filed == "yes"))
            .then(occurrences => {
                var tableBody = document.getElementById('dataTableFinishedOccurrences');
                var $table = $('#dataTableFinishedOccurrences').DataTable({
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
                        {
                            title: "End-Date",
                            data: 'end_date',
                            "render": function(value, cell, request) {
                                return formatDate(value)
                            }
                        },
                        { title: "Manager", data: 'fk_Occ_manager_id' }
                    ]
                });


            })
    })

}
