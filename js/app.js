const loadPhones = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhone(data.data);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // Dispaly 10 item only
    phones = phones.slice(0, 10)
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
    console.log(phones);
}

const searchBtn = document.getElementById('search-btn').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)
})

loadPhones();