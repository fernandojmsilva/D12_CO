window.onload = function() {
    var signin = document.getElementById('signin')
    signin.addEventListener("click", function() {
        var data = {}
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
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                else {
                    login()
                    async function login() {
                        const res = await fetch('https://safeandsoundpw.herokuapp.com/signinSuccess');
                        alert("Autenticação feita com sucesso!")
                        window.location.replace("login.html")
                        return response.json();
                    }
                }
            }).then(function(result) {
                console.log(result);
            })
            .catch(error => {
                alert(`Pedido falhado: ${error}`);
            });

    });
}
