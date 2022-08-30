url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
const loadPhones = async () => {
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
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

loadPhones();