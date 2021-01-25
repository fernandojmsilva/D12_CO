window.onload = function() {
    $(document).ready(function() {
        fetch('https://safeandsoundpw.herokuapp.com/requests')
            .then(response => response.json())
            .then(requests => requests.filter(
                request => request.filed == "Yes"))
            .then(requests => {
                var tableBody = document.getElementById('dataTableArchivedRequests');
                var $table = $('#dataTableArchivedRequests').DataTable({
                    data: requests,
                    columns: [
                        { title: "#Id", data: 'request_id' },
                        {
                            title: "Local",
                            data: 'locality'
                        },
                        {
                            title: "Start-Date",
                            data: 'date',
                            "render": function(value, cell, request) {
                                return formatDate(value)
                            }
                        },
                        {
                            title: "Urgência",
                            data: 'urgency'
                        },
                        { title: "Tipo", data: 'type' }
                    ]
                });


            })
    })

}
