import {getPersonajes} from './peticiones/getPersonajes.js';



const enviarDatos=(id , name, image, species, status) => {
    const rutaArchivoHTML = "../personaje.html";

    fetch(rutaArchivoHTML)
        .then(response => response.text())
        .then((html)=>{
            const parser = new DOMParser();
            const doc = parser.parseFromString(html,"text/html");

            const imagePage =doc.getElementById("imagePage");
            imagePage.src = image;

            const namePage= doc.getElementById("namePage");
            namePage.textContent=`Nombre : ${name}`;

            const speciesPage = doc.getElementById("speciesPage");
            speciesPage.textContent=`Especie : ${species}`;

            const statusPage = doc.getElementById("statusPage");
            statusPage.textContent=`Estado : ${status}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML

        });
}







const createCard = (result = []) => {
    let personajesRow = document.getElementById("personajesRow");
    result.map(( result )=> {


        const {id , name, image, species, status, location} = result;
        const {name : nameLocaion} =location;

        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3");
        divCol.classList.add("col-lg-3");
        divCol.classList.add("col-md-3");
        divCol.classList.add("col-sm-12");
        divCol.classList.add("col-xs-12");
        divCol.classList.add("mt-2");
        divCol.classList.add("mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = image;
        img.alt = `imagen de ${name}`;
        img.classList.add("card-img-top");

        const divBody = document.createElement("div");
        divBody.classList.add("cord-body");

        const title =document.createElement("h5");
        title.classList.add("card-title");
        title.textContent=`Nombre: ${name}`;


        const subTitle = document.createElement("p");
        subTitle.classList.add("card-text");
        subTitle.textContent = species;

        const subTitle2 = document.createElement("p");
        subTitle2.classList.add("card-text");
        subTitle2.textContent = status;


        const btnVer = document.createElement("button");
        btnVer.classList.add("btn","btn-success");
        btnVer.textContent = "ver detalles";
        btnVer.addEventListener("click", ()=>{

            enviarDatos(id , name, image, species, status, location);

        })


        divBody.appendChild(title);
        divBody.appendChild(subTitle);
        divBody.appendChild(subTitle2);
        divBody.appendChild(btnVer);


        card.appendChild(img);
        card.appendChild(divBody);

        divCol.appendChild(card);

        personajesRow.appendChild(divCol);



    });
}



getPersonajes()
    .then( (data) => {
            createCard(data);
        })
    .catch(error => console.log(error))