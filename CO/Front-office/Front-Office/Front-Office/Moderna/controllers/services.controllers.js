fetch('https://safeandsoundpw.herokuapp.com/services')
    .then(response => response.json())
    .then(services => {
        services.map(service => {
            var servicesSection = document.getElementById('services')
            var color = ""
            var icon = ""
            switch(service.type){
                case "Apoio à Vitima":
                    color = "pink"
                    icon = "phone"
                    break;
                case "Força Especial":
                    color = "cyan"
                    icon = "star"
                    break;
                case "Acompanhamento e Vigilância":
                    color = "green"
                    icon = "cctv"
                    break;
                case "Investigação":
                    color = "blue"
                    icon = "world"
                    break;
            }
            var cards = `<div class="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" > 
                                <div class="icon-box icon-box-${color}">
                                  <div class="icon"><i class="bx bx-${icon}"></i></div>
                                  <h4 class="title"><a href="">${service.type}</a></a></h4>
                                 <p class="description">${service.description}</p>
                                </div>
                              </div>` 
            servicesSection.innerHTML += cards
        
    })
    })