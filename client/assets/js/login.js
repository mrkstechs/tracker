const form = document.querySelector('form')
const loginButton = document.querySelector('#loginButton')
const registerButton = document.querySelector('#registerButton')

loginButton.addEventListener('click', requestLogin)
registerButton.addEventListener('click', showRegister)


function showLogin () {
    form.innerHTML = "";
    markup = `<div class="account">
                    <input type="text" name="username" id="username" required>
                    <span></span>
                    <label>Username</label>
                </div>
                <div class="account">
                    <input type="password" name="password" id="password" required>
                    <span></span>
                    <label>Password</label>
                </div>    
                <div class="submit">   
                    <label for="loginButton"><i class="bi bi-box-arrow-in-right"></i>&nbspLogin</label>   
                    <input type="submit" id="loginButton" value="Login" hidden>
                    <button id="registerButton"><i class="bi bi-plus-circle"></i></i>&nbspRegister</button>
                </div>`
    form.insertAdjacentHTML('beforeend', markup);

    const registerButton = document.querySelector('#submitRegisterButton')
    registerButton.addEventListener('click', showRegister)
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click', requestLogin)
}

function showRegister () {
    form.innerHTML = ""
    markup = `<div class="account">
                    <input type="text" name="username" id="username" required>
                    <span></span>
                    <label>Username</label>
                </div>
                <div class="account">
                    <input type="password" name="password" id="password" required>
                    <span></span>
                    <label>Password</label>
                </div>    
                <div class="account">
                    <input type="text" name="email" id="email" required>
                    <span></span>
                    <label>E-mail</label>
                </div>
                <div class="account">
                    <input type="text" name="firstName" id="firstName" required>
                    <span></span>
                    <label>First Name</label>
                </div>
                <div class="account">
                    <input type="text" name="lastName" id="lastName" required>
                    <span></span>
                    <label>Last Name</label>
                </div>
                <div class="submit">   
                    <button id="backToLoginButton"><i class="bi bi-box-arrow-in-right"></i>&nbspTo Login</button>
                    <label for="submitRegisterButton"><i class="bi bi-plus-circle"></i></i>&nbspRegister</label>   
                    <input type="submit" id="submitRegisterButton" value="Login" hidden>
                </div>`
    form.insertAdjacentHTML('afterbegin', markup);
    
    const backToLoginButton = document.querySelector('#backToLoginButton')
    backToLoginButton.addEventListener('click', showLogin)
    const submitRegisterButton = document.querySelector('#submitRegisterButton')
    submitRegisterButton.addEventListener('click', requestRegistration)
}

async function requestLogin(e){
    e.preventDefault();
    const form = document.querySelector('form')
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        }
        const r = await fetch(`https://habithelper.herokuapp.com/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    const form = document.querySelector('form')
    const formData = Object.fromEntries(new FormData(form))
    const regex = /[^a-zA-z\d]/gm
    const regexEmail = /[^a-zA-z\d@]/gm

    if(validator.isEmpty(formData.username)){
        window.alert('Username cannot be empty!')
    } else if(validator.isEmpty(formData.firstName)){
        window.alert('Firstname cannot be empty!')
    } else if(validator.isEmpty(formData.lastName)){
        window.alert('Lastname cannot be empty!')
    } else if(validator.isEmpty(formData.password)){
        window.alert('Password cannot be empty!')
    } else if(validator.isEmpty(formData.email) && validator.isEmail(formData.email)){
        window.alert('Vaild email required!')
    } else {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            const r = await fetch(`https://habithelper.herokuapp.com/users/register`, options)
            const data = await r.json()
            if (data.err){ throw Error(data.err) }
            requestLogin(e);
        } catch (err) {
            console.warn(err);
        }
    }
}

function login(data){
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    window.location.assign("/homepage.html") 
}