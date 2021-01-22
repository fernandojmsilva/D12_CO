window.onload = function() {
    var signin = document.getElementById('signin')
    signin.addEventListener("click", function() {

        const email = document.getElementById('email').value
        const pass = document.getElementById('pwd').value
        fetch(`https://safeandsoundpw.herokuapp.com/signin`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `email=${email}&password=${pass}`
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                alert("Autenticação feita com sucesso!")
                window.location.replace("login.html")
                return response.json();
            })
            .catch(error => {
                alert(`Pedido falhado: ${error}`);
            });

    });
}
