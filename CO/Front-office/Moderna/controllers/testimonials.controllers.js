var data = {
    'email':'12345@hotmail.com',
    'password':'12345'
}
fetch('https://safeandsoundpw.herokuapp.com/signin', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log(response)
        /*if (!response.ok) {
            throw new Error(response.statusText);
        }
        else {
            alert("Autenticação feita com sucesso!")
            window.location.replace("login.html")
            return response.json();
        }*/

    })
    .catch(error => {
        alert(`Pedido falhado: ${error}`);
    });
