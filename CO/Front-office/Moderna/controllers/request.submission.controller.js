 function saveRequest() {
  //criar dicionario
  var dataRequest = {};

  dataRequest.date = document.getElementById("dateOcurrence").value;
  dataRequest.time = document.getElementById("timeOcurrence").value;
  var inputOptionLocal = document.getElementById("inputOptionLocal");
  var place = inputOptionLocal.options[inputOptionLocal.selectedIndex].text;
  dataRequest.place = place;
  dataRequest.entity = document.getElementById("inputEntity").value;
  dataRequest.locality = document.getElementById("inputLocality").value;
  dataRequest.address = document.getElementById("inputAdress").value;
  dataRequest.type = document.getElementById("type").checked;
  dataRequest.urgency = document.getElementById("inputUrgency").value;
  if (document.getElementById('roubo').checked) {
   dataRequest.type = "roubo"
  }
  else {
   dataRequest.type = "furto"
  }
  dataRequest.status = "Não Validado"
  dataRequest.description = document.getElementById("TextareaDescription").value;
  console.log(document.getElementById('anonimo').checked)
  if (document.getElementById('anonimo').checked) {
   var anonimityValue = document.getElementById('anonimo').value;
   dataRequest.anonymity = anonimityValue;
   createRequest(dataRequest)
    .then(response => {
     console.log(dataRequest)
     document.getElementById("formNewRequest").reset(); //limpeza dos dados do form
     alert("Request submitted with success");
    })
  }
  else {
   const dataComplainer = {}
   var anonimityValue = document.getElementById('naoAnonimo').value;
   dataRequest.anonymity = anonimityValue;

   dataComplainer.complainer_cc = document.getElementById("inputCC").value;
   dataComplainer.name = document.getElementById("inputName").value;
   dataComplainer.email = document.getElementById("inputEmail").value;
   dataComplainer.address = document.getElementById("inputComplainerAddress").value;
   dataComplainer.phone_number = document.getElementById("inputContact").value;
   dataComplainer.birth_date = document.getElementById("birth").value;
   dataComplainer.postal_code = document.getElementById("inputCode").value;
   dataComplainer.gender = document.getElementById('gender').value

   //submeter dados do queixoso no servidor
   fetch('https://safeandsoundpw.herokuapp.com/complainers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(dataComplainer)
   }).then(function(response) {
    if (!response.ok) {
     console.log(response.status);
     console.log(response.statusText);
     console.log(response.headers);
     console.log(response.url);
     if (response.status === 409) {
      alert("Duplicated Entry");
     }
     else {
      throw Error(response.statusText);
     }

    }
    else {
     dataRequest.complainer_cc = dataComplainer.complainer_cc
     createRequest(dataRequest)
      .then(response => {
       document.getElementById("formNewRequest").reset(); //limpeza dos dados do form
       alert("Complainer data submitted with success");
      })

    }
   }).catch(function(err) {
    alert("Complainer data submission error");
    console.error(err);
   });
  }
 }


 function createRequest(data) {
  return fetch('https://safeandsoundpw.herokuapp.com/requests', {
   headers: { 'Content-Type': 'application/json' },
   method: 'POST',
   body: JSON.stringify(data)
  }).then(function(response) {
   if (!response.ok) {
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.url);
    if (response.status === 409) {
     alert("Duplicated Email");
    }
    else {
     throw Error(response.statusText);
    }

   }
   return response
  }).catch(function(err) {
   alert("Submission error");
   console.error(err);
  });
 }

 function setAnonymousView() {
  console.log("anonimo")
  document.getElementById("complainer").style.display = "none"

  document.getElementById("inputCC").setAttribute("data-rule", "minlength-8| maxlength-8")
  document.getElementById("inputName").setAttribute("data-rule", "name")
  document.getElementById("inputEmail").setAttribute("data-rule", "email")
  document.getElementById("inputComplainerAddress").removeAttribute("data-rule")
  document.getElementById("inputContact").setAttribute("data-rule", "minlength-9|maxlength-9")
  document.getElementById("birth").setAttribute("data-rule", "date|birth")
  document.getElementById("inputCode").setAttribute("data-rule", "minlength-7|maxlength-7")
  document.getElementById("gender").removeAttribute("data-rule")

 }

 function setNonAnonymousView() {
  console.log("nao anonimo")
  document.getElementById("complainer").style.display = "block"
  document.getElementById("inputCC").setAttribute("data-rule", "minlength-8| maxlength-8|required")
  document.getElementById("inputName").setAttribute("data-rule", "name|required")
  document.getElementById("inputEmail").setAttribute("data-rule", "email|required")
  document.getElementById("inputComplainerAddress").setAttribute("data-rule", "required")
  document.getElementById("inputContact").setAttribute("data-rule", "minlength-9|maxlength-9|required")
  document.getElementById("birth").setAttribute("data-rule", "date|birth|required")
  document.getElementById("inputCode").setAttribute("data-rule", "minlength-7|maxlength-7|required")
  document.getElementById("gender").setAttribute("data-rule", "required")
 }

 function changeAnonymityListener(event, validator) {

  if (event.target.id == "anonimo") {
   setAnonymousView()
  }
  else {
   setNonAnonymousView()

  }
  validator.reload()
 }

 window.onload = function() {
  setAnonymousView()
  //initValidator criado no request.validator.js
  let validator = initValidator(saveRequest)
  //selecionar todos os elemenetos com o nome anonimato
  document.querySelectorAll("input[name='anonimato']").forEach(input => {
   input.addEventListener('change', event => changeAnonymityListener(event, validator))
  })
 }
 