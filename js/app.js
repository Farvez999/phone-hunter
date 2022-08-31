const loadPhones = async (searchText, datalimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhone(data.data, datalimit);
}

const displayPhone = (phones, datalimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // Dispaly 10 item only
    const showAll = document.getElementById('show-all');
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    //Search no phone found
    const noPhoneMsg = document.getElementById('search-no-phone-msg');
    if (phones.length === 0) {
        noPhoneMsg.classList.remove('d-none');
    }
    else {
        noPhoneMsg.classList.add('d-none')
    }

    phones.forEach(phone => {
        const divPhone = document.createElement('div');
        divPhone.classList.add('col');
        divPhone.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</div>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button>
        </div>
        `;
        phoneContainer.appendChild(divPhone)
    })
    // loader Stop 
    toggleSpineer(false);
}

const processSearch = (dataLimit) => {
    // loader Start 
    toggleSpineer(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
}

const searchBtn = document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
})

//search input field enter key handler javascript
document.getElementById('search-field')
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            processSearch(10);
        }
    });

const toggleSpineer = isLoading => {
    const loaderDiv = document.getElementById('loader');
    if (isLoading) {
        loaderDiv.classList.remove('d-none');
    }
    else {
        loaderDiv.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('detailsModalTitle');
    modalTitle.innerText = phone.name;
    const modelDetails = document.getElementById('model-details');
    modelDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Found Release Date'}</p>
    <p>brand: ${phone.brand ? phone.brand : 'No Found brand'}</p>
    <p>Chip Set: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No Found Chip Set'}</p>
    <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Found Display Size'}</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Found Memory'}</p>
    `;
    console.log(phone);
}

// loadPhones();