// Основное
const navBar = document.querySelector('#navBar');
const btnLogout = document.querySelector('#logout');

const nameForm = document.querySelector('#name');
const emailForm = document.querySelector('#email');
const passwordForm = document.querySelector('#password');
const btnLogin = document.querySelector('#saveLogin');

const pageLogin = document.querySelector('#login');
const mainPage = document.querySelector('#mainPage');

// Меню
const notes = document.querySelector('#notes');
const purchases = document.querySelector('#purchases');
const growthRates = document.querySelector('#growthRates');
const customization = document.querySelector('#customization');

const notesBlock = document.querySelector('.notes');
const purchasesBlock = document.querySelector('.purchases');
const growthRatesBlock = document.querySelector('.growthRates');
const customizationBlock = document.querySelector('.customization');

// Форма настроек
const nameCust = document.querySelector('#nameCust');
const dateCust = document.querySelector('#dateCust');
const maleCust = document.querySelector('#maleCust');
const femaleCust = document.querySelector('#femaleCust');
const saveCustomization = document.querySelector('#saveCustomization');

const babyName = document.querySelector('.babyName');
const babyDate = document.querySelector('.babyDate');
const babyDate2 = document.querySelector('.babyDate2');
const babyDate3 = document.querySelector('.babyDate3');
const babyPhoto = document.querySelector('.babyPhoto');
const babyPhoto2 = document.querySelector('.babyPhoto2');
const babyPhoto3 = document.querySelector('.babyPhoto3');

// Покупки
const purchasesText = document.querySelector('#purchasesText');
const addPurchases = document.querySelector('#addPurchases');
const purchasesPlanCont = document.querySelector('.purchasesPlanCont');
const purchasesDoneCont = document.querySelector('.purchasesDoneCont');


// Заметки
const dateNote = document.querySelector('#dateNote');
const babyHeight = document.querySelector('#babyHeight');
const babyWeight = document.querySelector('#babyWeight');
const babyImpMark = document.querySelector('#babyImpMark');
const babyAttainment = document.querySelector('#babyAttainment');
const addNote = document.querySelector('#addNotes');

const notesPlanCont = document.querySelector('.notesPlanCont');
const customPlanCont = document.querySelector('.customPlanCont');

let currentUser = localStorage.getItem('currentUser');
let currentMail = localStorage.getItem('currentMail');
let currentPasword = localStorage.getItem('currentPasword')
let savePurchases = [];
let saveNotes = [];
let saveCust = [];


// Видимость страниц

if (currentUser || currentMail || currentPasword) {
    pageLogin.hidden = true;
    mainPage.hidden = false;
    navBar.hidden = false;
} else {
    pageLogin.hidden = false;
    mainPage.hidden = true;
    navBar.hidden = true;
}

btnLogout.addEventListener('click', e => {
    localStorage.setItem('currentUser', '')
    localStorage.setItem('currentMail', '')
    localStorage.setItem('currentPasword', '')
    location.hash = '#login'
    currentUser = ''
    currentMail = ''
    currentPasword = ''
    for (let i = 0; i < purchasesPlanCont.children.length; i) {
        purchasesPlanCont.children[i].remove()
    }
    for (let i = 0; i < notesPlanCont.children.length; i) {
        notesPlanCont.children[i].remove()
    }
    for (let i = 0; i < customPlanCont.children.length; i) {
        customPlanCont.children[i].remove()
    }
    babyName.innerHTML = '----'
    babyDate.innerHTML = '----'
    babyDate2.innerHTML = '----'
    babyDate3.innerHTML = '----'
    babyPhoto.hidden = false;
    babyPhoto2.hidden = true;
    babyPhoto3.hidden = true;

});

btnLogin.addEventListener('click', e => {
    currentUser = nameForm.value
    currentMail = emailForm.value
    currentPasword = passwordForm.value

    localStorage.setItem("currentUser", currentUser)
    localStorage.setItem("currentMail", currentMail)
    localStorage.setItem("currentPasword", currentPasword)

    location.hash = '#mainPage'
    nameForm.value = ''
    emailForm.value = ''
    passwordForm.value = ''
    let currPurchases = JSON.parse(localStorage.getItem(currentUser))
    currPurchases.forEach((el) => {
        addPurch(el)
    })
    let currNotes = JSON.parse(localStorage.getItem(currentMail))
    currNotes.forEach((el) => {
        addNotes(el)
    })
    let currCust = JSON.parse(localStorage.getItem(currentPasword))
    currCust.forEach((el) => {
        addCust(el)
    })
});

addNote.addEventListener('click', e => {
    let notesForm = {
        date: dateNote.value,
        height: babyHeight.value,
        weight: babyWeight.value,
        impMark: babyImpMark.value,
        attainment: babyAttainment.value
    }
    saveNotes.push(notesForm);
    let currNotes = JSON.parse(localStorage.getItem(currentMail));
    if (currNotes) {
        currNotes.push(notesForm)
        localStorage.setItem(currentMail, JSON.stringify(currNotes))
        addNotes(notesForm)
    } else {
        localStorage.setItem(currentMail, JSON.stringify(saveNotes))
        addNotes(notesForm)
    }
    dateNote.value = ''
    babyHeight.value = ''
    babyWeight.value = ''
    babyImpMark.value = ''
    babyAttainment.value = ''
    removeNote();
});

saveCustomization.addEventListener('click', e => {
    let custForm = {
        name: nameCust.value,
        date: dateCust.value,
        male: maleCust.checked,
        female: femaleCust.checked,
    }
    saveCust.push(custForm);
    let currCust = JSON.parse(localStorage.getItem(currentPasword));
    if (currCust) {
        currCust.push(custForm)
        localStorage.setItem(currentPasword, JSON.stringify(currCust))
        addCust(custForm)
    } else {
        localStorage.setItem(currentPasword, JSON.stringify(saveCust))
        addCust(custForm)
    }

    removeCust();
});

addPurchases.addEventListener('click', e => {
    savePurchases.push(purchasesText.value);
    let currPurchases = JSON.parse(localStorage.getItem(currentUser));
    if (currPurchases) {
        currPurchases.push(purchasesText.value)
        localStorage.setItem(currentUser, JSON.stringify(currPurchases))
        addPurch(purchasesText.value)
    } else {
        localStorage.setItem(currentUser, JSON.stringify(savePurchases))
        addPurch(purchasesText.value)
    }
    purchasesText.value = ''
});

const changeLocation = () => {
    switch (location.hash) {
        case '#login':
            if (currentUser || currentMail || currentPasword) {
                location.hash = "#notes";
                pageLogin.hidden = false;
                mainPage.hidden = true;
                navBar.hidden = true;
            }
            pageLogin.hidden = false;
            mainPage.hidden = true;
            navBar.hidden = true;
            break;
        case '#mainPage':
            if (!currentUser || !currentMail) {
                location.hash = "#login";
                pageLogin.hidden = false;
                mainPage.hidden = true;
                navBar.hidden = true;
            } else {
                mainPage.hidden = false;
                pageLogin.hidden = true;
                navBar.hidden = false;
            }
            break;
    }
};

window.addEventListener('hashchange', e => {
    changeLocation();
});


if (location.hash === '') location.hash = '#login'
changeLocation();

let check
function addPurch(el) {
    let cell = document.createElement('div')
    cell.classList.add("purchasesPlanContMin")

    check = document.createElement('input')
    check.type = 'checkbox'
    check.name = 'minPurch'
    let lab = document.createElement('label')
    lab.innerHTML = el
    cell.append(check)
    cell.append(lab)
    purchasesPlanCont.append(cell)
}

function addNotes(el) {
    let cell1 = document.createElement('div')
    cell1.classList.add("notesCont")
    cell1.style.marginLeft = "5px"
    cell1.innerHTML = `<b>Дата:</b>${el.date} <br>
    <b>Рост ребенка:</b> ${el.height} <br>
    <b>Вес ребенка:</b> ${el.weight} <br>
    <b>Важные отметки:</b> ${el.impMark} <br>
    <b>Достижения:</b> ${el.attainment} <br>
    `
    notesPlanCont.append(cell1)
}

function addCust(el) {
    let cell2 = document.createElement('div')
    cell2.innerHTML = `<b>Имя:</b>${el.name} <br>
    <b>Дата рождения:</b> ${el.date} <br>
    <b>Женский:</b> ${el.male} <br>
    <b>Мужской:</b> ${el.female} <br>
    `
    customPlanCont.append(cell2)
    babyName.innerHTML = ''
    babyName.innerHTML = `${el.name}`

    if (el.male) {
        babyPhoto.hidden = true;
        babyPhoto2.hidden = false;
        babyPhoto3.hidden = true;
    } else if (el.female) {
        babyPhoto.hidden = true;
        babyPhoto2.hidden = true;
        babyPhoto3.hidden = false;
    };

    let today = new Date();
    let today_year = today.getFullYear();
    let today_month = today.getMonth();
    let today_day = today.getDate();

    let monthAge;
    let dateAge;
    let yearAge;

    let dateBirth = el.date;
    dateBirth = new Date(dateBirth);
    let dateByear = dateBirth.getFullYear();
    let dateBmonth = dateBirth.getMonth();
    let dateBday = dateBirth.getDate();

    yearAge = today_year - dateByear

    if (today_month >= dateBmonth) {
        monthAge = today_month - dateBmonth
    } else {
        yearAge--
        monthAge = 12 + today_month - dateBmonth
    };

    if (today_day >= dateBday) {
        dateAge = today_day - dateBday
    } else {
        monthAge--
        dateAge = 31 + today_day - dateBday
    };

    babyDate.innerHTML = ''
    babyDate2.innerHTML = ''
    babyDate3.innerHTML = ''

    if (yearAge <= 0) {
        babyDate.innerHTML = ` `
        babyDate2.innerHTML = `Месяцев: ${monthAge}`
        babyDate3.innerHTML = `Дней: ${dateAge}`
    } else {
        babyDate.innerHTML = `Лет: ${yearAge}`
        babyDate2.innerHTML = `Месяцев: ${monthAge}`
        babyDate3.innerHTML = `Дней: ${dateAge}`
    };
    
};

let currPurchases = JSON.parse(localStorage.getItem(currentUser));
if (currPurchases) {
    currPurchases.forEach((el) => {
        addPurch(el)
    })
}

let currNotes = JSON.parse(localStorage.getItem(currentMail));
if (currNotes) {
    currNotes.forEach((el) => {
        addNotes(el)
    })
}

let currCust = JSON.parse(localStorage.getItem(currentPasword));
if (currCust) {
    currCust.forEach((el) => {
        addCust(el)
    })
}

function removePurch() {
    window.addEventListener('change', e => {
        if (e.target.checked) {
            let currPurchases = JSON.parse(localStorage.getItem(currentUser))
            let i = currPurchases.indexOf(e.target.parentElement.innerHTML)
            currPurchases.splice(i, 1)
            localStorage.setItem(currentUser, JSON.stringify(currPurchases))
            e.target.parentElement.remove()
        }
    })
}

function removeNote() {
    for (let i = 0; i < notesPlanCont.children.length; i++) {
        notesPlanCont.children[i].addEventListener('dblclick', e => {
            let currNotes = JSON.parse(localStorage.getItem(currentMail))
            let i = currNotes.indexOf(e.target.innerHTML)
            currNotes.splice(i, 1)
            localStorage.setItem(currentMail, JSON.stringify(currNotes))
            e.target.remove()
        });
    }
    ;
};

removeNote();

function removeCust() {
    for (let i = 0; i < customPlanCont.children.length; i++) {
        customPlanCont.children[i].addEventListener('dblclick', e => {
            let currCust = JSON.parse(localStorage.getItem(currentPasword))
            let i = currCust.indexOf(e.target.innerHTML)
            currCust.splice(i, 1)
            localStorage.setItem(currentPasword, JSON.stringify(currCust))
            e.target.remove()
        });
    }
    ;
};


// Переключение меню

purchasesBlock.hidden = true;
growthRatesBlock.hidden = true;
customizationBlock.hidden = true;

notes.addEventListener('click', e => {
    removeNote();
    location.hash = '#notes'
    notesBlock.hidden = false
    purchasesBlock.hidden = true
    growthRatesBlock.hidden = true
    customizationBlock.hidden = true
});

purchases.addEventListener('click', e => {
    removePurch();
    location.hash = '#purchases'
    notesBlock.hidden = true
    purchasesBlock.hidden = false
    growthRatesBlock.hidden = true
    customizationBlock.hidden = true
});

growthRates.addEventListener('click', e => {
    chartWeight();
    chartHeight();
    location.hash = '#growthRates'
    notesBlock.hidden = true
    growthRatesBlock.hidden = false
    purchasesBlock.hidden = true
    customizationBlock.hidden = true
});

customization.addEventListener('click', e => {
    removeCust();
    location.hash = '#customization'
    notesBlock.hidden = true
    customizationBlock.hidden = false
    purchasesBlock.hidden = true
    growthRatesBlock.hidden = true
});

// график роста и веса

function chartHeight(){
    let dataNote = JSON.parse(localStorage.getItem(currentMail))
    const height = []
    const date = []

    if (dataNote) {
        dataNote.forEach(el => {
            height.push(el.height)
            date.push(el.date)
        })
    }

    let ctx = document.getElementById('growChart').getContext('2d');
    const labels = date
    const data = {
        labels: labels,
        datasets: [{
            label: 'График роста',
            data: height,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    var myChart = new Chart(ctx, {
        type: 'line',
        data
    });

}

function chartWeight(){
    let dataNote = JSON.parse(localStorage.getItem(currentMail))
    const weight = []
    const date = []

    if (dataNote) {
        dataNote.forEach(el => {
            weight.push(el.weight)
            date.push(el.date)
        })
    }

    var ctx = document.getElementById('weightChart').getContext('2d');
    const labels = date
    const data = {
        labels: labels,
        datasets: [{
            label: 'График веса',
            data: weight,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    var myChart = new Chart(ctx, {
        type: 'line',
        data
    });
}

