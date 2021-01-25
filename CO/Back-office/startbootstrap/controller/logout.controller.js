$(document).ready(function() {
    var logout = document.getElementById('currentUserLogout')
    logout.addEventListener("click", function() {

        document.getElementById('currentUserEmail').innerHTML = ""

        fetch('https://safeandsoundpw.herokuapp.com/logout')
            .then(response => response.json())
            .then(
                localStorage.removeItem("currentUserEmail"))
                window.location.replace('https://59143d8da0ed402fb2c105d635b81bd7.vfs.cloud9.us-east-1.amazonaws.com/_static/safeandsound.github.io/CO/Front-office/Moderna/login.html') 
                
    });

})
