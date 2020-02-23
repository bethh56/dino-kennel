const dinos = [
    {
      id: 'dino1',
      name: 'Rex',
      type: 'T Rex',
      age: 100,
      owner: 'Zoe',
      adventures: [],
      health: 100,
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
    },
    {
      id: 'dino2',
      name: 'Steve',
      type: 'Velociraptor',
      age: 1,
      owner: 'Mary',
      adventures: [],
      health: 1,
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
    },
    {
      id: 'dino3',
      name: 'Susan',
      type: 'Stegasaurus',
      age: 55,
      owner: 'Luke',
      adventures: [],
      health: 0,
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
    }
  ];

const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
;}

const closeSingeViewEvent = () => {
    printToDom("single-view", "");
    printDinos(dinos, "kennel");
}

const viewSingleDino = (e) => {
    const dinoId = e.target.closest('.card').id;
    const selectedDino = dinos.find((currentDino) => dinoId === currentDino.id)
    console.log('selectedDino', selectedDino)
    let domString = "";
    domString += `<button class="btn  bg-white" id="close-single-view"><i class="far fa-window-close"> Close</i></button>`;
    domString += `<div class= "container">`;
    domString += `<div class="row">`;
    domString += `<div class= "col-6">`;
    domString += `<img class="img-fluid" src="${selectedDino.imageUrl}" alt=""/>`;
    domString += '</div>';
    domString += `<div class="col-6">`;
    domString += `<h2>${selectedDino.name}</h2>`;
    domString += `<p>Type: ${selectedDino.type}</p>`; 
    domString += `<p>Age: ${selectedDino.age}</p>`;
    domString += `<p>Owner: ${selectedDino.owner}</p>`;
    domString += `<div class="progress">`
    domString += `<div class="progress-bar bg-warning" role="progressbar" style="width: ${selectedDino.health}%" aria-valuenow="${selectedDino.health}" aria-valuemin="0" aria-valuemax="100"></div>`
    domString += `</div>`
    domString += `</div>`;
    domString += '</div>';
    domString += '</div>';
    
    printToDom('kennel', '');
    printToDom('single-view', domString);
    document.getElementById("close-single-view").addEventListener('click', closeSingeViewEvent);
};

//EVENT LISTENER CALLS "viewSingleDino" ^^^
const singeDinoAddEvents = () => {
    // in printDinos, added classname at end of bootstrap "single-dino"
    const dinoViewButtons = document.getElementsByClassName('single-dino');
    for(let i = 0; i < dinoViewButtons.length; i++){
        dinoViewButtons[i].addEventListener('click', viewSingleDino)
    }
};

const petEvents = () => {
    const dinoPetButtons = document.getElementsByClassName('dino-photo');
    for(let i = 0; i < dinoPetButtons.length; i++){
        dinoPetButtons[i].addEventListener('mouseleave', dinoHealth)
    }
};

const dinoHealth = (e) => {
    const dinoId = e.target.closest(".card").id;
    const dinoPosition = dinos.findIndex((printDino) => printDino.id === dinoId);
    if (dinos[dinoPosition].health < 100) {
        dinos[dinoPosition].health += 1;
        printDinos(dinos, "kennel");
    }
};

const deleteEvents = () => {
    const dinoDeleteButtons = document.getElementsByClassName('delete-dino');
    for(let i = 0; i < dinoDeleteButtons.length; i++){
        dinoDeleteButtons[i].addEventListener('click', deleteDinoEvent)
    }
};

const deleteDinoEvent = (e) => {
    const dinoId = e.target.closest(".card").id;
    const dinoPosition = dinos.findIndex((p) => p.id ===dinoId);
    dinos.splice(dinoPosition, 1);
    printDinos(dinos, "kennel");
};

const feedEvents = () => {
    const dinoFeedButtons = document.getElementsByClassName('feed-button');
    for(let i = 0; i < dinoFeedButtons.length; i++){
        dinoFeedButtons[i].addEventListener('click', feedDinoEvent)
    };
};

const feedDinoEvent = (e) => {
    const dinoId = e.target.closest(".card").id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
    if (dinos[dinoPosition].health < 100) {
        dinos[dinoPosition].health += 10;
        printDinos(dinos, "kennel");
    };
    if (dinos[dinoPosition].health > 100) {
        dinos[dinoPosition].health = 100;
        printDinos(dinos, "kennel");
    }
};



const printDinos = (dinoArray, divId) => {
    let domString = '';
    for (let i =0; i < dinoArray.length; i++) {
        domString += '<div class="col-4">';
        domString += `<div id="${dinoArray[i].id}" class="card">`;
        domString += `<img class="card-img-top dino-photo" src="${dinoArray[i].imageUrl}" alt="Card image cap">`;
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title">${dinoArray[i].name}</h5>`;
        domString += `<div class="progress">`
        domString += `<div class="progress-bar bg-warning" role="progressbar" style="width: ${dinoArray[i].health}%" aria-valuenow="${dinoArray[i].health}" aria-valuemin="0" aria-valuemax="100"></div>`
        domString += `</div>`
        domString += `<div class="row">`;
        domString += `<button class="btn btn-outline-dark mt-1 col-6 feed-button"><i class="fas fa-bone"></i> Feed</button>`
        domString += '</div>';
        domString += `<div class="row">`
        domString += `<button class="btn btn-outline-dark single-dino col-6"><i class="far fa-eye"></i> View</button>`
        domString += `<button type="button" class="btn btn-outline-danger delete-dino col-6"><i class="fas fa-trash"></i> Delete</button>`
        domString += `</div>`
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
    }
    printToDom(divId, domString);
    singeDinoAddEvents();
    petEvents();
    deleteEvents();
    feedEvents();
};
  
const hospitalDomStringBuilder = () => {
    const unhealthyDinos = dinos.filter(dino => dino.health < 40);
    printDinos(unhealthyDinos, "hospital");
};  

// NEW DINO
const newDino = (e) => {
    e.preventDefault();
    const brandNewDino = {
        id: `dino${dinos.length + 1}`,
        name: document.getElementById("dino-name").value,
        type: document.getElementById("dino-type").value,
        age: document.getElementById("dino-age").value,
        owner: document.getElementById("dino-owner").value,
        adventures: [],
        health: 100,
        imageUrl: document.getElementById("dino-image").value
    }
    dinos.push(brandNewDino);
    document.getElementById("new-dino-form").reset();
    document.getElementById('collapseOne').classList.remove('show');
    printDinos(dinos, "kennel");
};

// EVENTS
const events = () =>{
    document.getElementById("submit-new-dino").addEventListener('click', newDino);
}

// PAGE LOAD
const init = () => {
    events();
    printDinos(dinos, "kennel");
    hospitalDomStringBuilder();
}

init();