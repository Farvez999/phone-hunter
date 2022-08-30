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
    processSearch(10)
})

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

// loadPhones();