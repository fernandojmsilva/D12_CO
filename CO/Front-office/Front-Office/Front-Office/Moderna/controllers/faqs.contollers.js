fetch('https://safeandsoundpw.herokuapp.com/faqs')
    .then(response => response.json())
    .then(faqs => {
        faqs.map(faq => {
            console.log(faq.description)
            var faqs = document.getElementById('accordionExample')
            var faqsContent = `<div class="card">
            <div class="card-header">
                <a>
                  <div class="icon float-right"><i class="bx bx-plus-circle" style="font-size: 30px" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"></i></div>
                 <h5>${faq.faq}</h5>
                </a>
            </div>
        
            <div class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">
               ${faq.description}
              </div>
            </div>
          </div>`
            faqs.innerHTML = faqsContent;
        })
    })
