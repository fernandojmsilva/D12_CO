 function initValidator(handler) {
     return new Validator(document.getElementById("formNewRequest"), function(err, res) {
         console.log(res)
         console.log(err)
         if (res) {
             handler();
         }
     }, {
         errorClassName: 'help-block',
         rules: {

             birth: function(value) {
                 console.log(value)
                 return (new Date(value) < new Date(document.getElementById("dateOcurrence").value));
             }
         },
         messages: {
             en: {
                 birth: {
                     incorrect: "A data da Ocurrêmcia deve ser posterior à data de nascimento do queixoso."
                 }
             }
         }
     });
 }
 