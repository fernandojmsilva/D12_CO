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
                     incorrect: "Date Ocurrence must be after complainer's birth"
                 }
             }
         }
     });
 }