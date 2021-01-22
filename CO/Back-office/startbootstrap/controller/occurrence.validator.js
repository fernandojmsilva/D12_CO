 function initValidator(handler) {
     return new Validator(document.getElementById("occurrenceArchiveModal"), function(err, res) {
         console.log(res)
         console.log(err)
         if (res) {
             handler();
         }
     }, {
         errorClassName: 'help-block',
         rules: {

             endDateOcurrence: function(value) {
                 console.log(value)
                 return (new Date(value) > new Date(document.getElementById("occurrenceStartDate").value));
             }
         },
         messages: {
             en: {
                 endDateOcurrence: {
                     incorrect: "End-date ocurrence must be after start-date occurrence"
                 }
             }
         }
     });
 }
 