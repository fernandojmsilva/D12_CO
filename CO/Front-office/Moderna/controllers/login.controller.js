$(document).ready(function() {
    var loginButton = document.getElementById('loginButton')
    loginButton.addEventListener("click", function() {
        var data = {}
        console.log("12345")
        const email = document.getElementById('email').value
        const password = document.getElementById('pwd').value
        data.email = email
        data.password = password
        fetch('https://safeandsoundpw.herokuapp.com/signin', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                else {
                    localStorage.setItem('currentUserEmail', email)
                    Swal.fire(
                        'Autenticação feita com sucesso!',
                        '',
                        'success'
                    ).then((result => {
                        window.location.replace("https://59143d8da0ed402fb2c105d635b81bd7.vfs.cloud9.us-east-1.amazonaws.com/_static/safeandsound.github.io/CO/Back-office/startbootstrap/dashboard.html")
                    }))

                }

            })
            .catch(error => {
                Swal.fire(
                    'Oops!',
                    `Erro:Pedido falhado: ${error}`,
                    'error'
                )
            });

    });
})
