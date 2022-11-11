const pageHeader = document.querySelector('body header')
const loginButton = document.querySelector('#loginButton')
const registerButton = document.querySelector('#registerButton')

loginButton.addEventListener('click', showLogin)
registerButton.addEventListener('click', showRegister)


function showLogin () {
    clearForms();
    markup = `<section id="loginSection">
                    <form action="">
                        <input type="text" id="username" name="username" placeholder="Username..." required>
                        <input type="text" id="password" name="password" placeholder="Password..." required>
                        <input type="submit" value="login">
                    </form>
                <button id="hideForms">x</button>
            </section>`
    pageHeader.insertAdjacentHTML('beforeend', markup);
    
    const loginForm = document.querySelector('#loginSection form')
    loginForm.addEventListener('submit', requestLogin)
    const closeButton = document.querySelector('#hideForms')
    closeButton.addEventListener('click', clearForms)
}

function showRegister () {
    clearForms();
    markup = `<section id="registerSection">
                    <form action="">
                        <input type="text" id="email" name="email" placeholder="E-mail..." required>
                        <input type="text" id="firstName" name="firstName" placeholder="First name..." required>
                        <input type="text" id="lastName" name="lastName" placeholder="Last name..." required>
                        <input type="text" id="username" name="username" placeholder="Username..." required>
                        <input type="text" id="password" name="password" placeholder="Password..." required>
                        <input type="submit" value="register">
                    </form>
                <button id="hideForms">x</button>
            </section>`
    pageHeader.insertAdjacentHTML('beforeend', markup);
    
    const registerForm = document.querySelector('#registerSection form')
    registerForm.addEventListener('submit', requestRegistration)
    const closeButton = document.querySelector('#hideForms')
    closeButton.addEventListener('click', clearForms)
}


function clearForms () {
    if (pageHeader.lastElementChild.id == "loginSection" || pageHeader.lastElementChild.id == "registerSection") {
        pageHeader.lastElementChild.remove()
    }
};


async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('token', data.token);
    const message = document.createElement('p');
    message.textContent = "Succesful login";
    loginForm.append(message);
}