/** @jest-environment jsdom */
const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/index.html"), 'utf8');

global.fetch = require('jest-fetch-mock');

const {  } = require(path.resolve("../client/assets/js/login.js"))

global.localStorage = {
    
    setItem (key, item) {
      this.state[key] = item
    },
    getItem (key) { 
      return this.state[key]
    }
  }


describe("Login page", () => {

    beforeEach(() => {      
        document.documentElement.innerHTML = html.toString();
        })

    afterAll(() => jest.resetAllMocks())
    
    describe('Display', () => {
        
        describe('Login Form', () => {
            test('Correctly displays login form', () => {

            })
            
            test('User can login', () => {
                
            })

            test('Redirects on succesful login', () => {

            })
        })

        describe('Register Form', () => {
            test('Correctly displays register form', () => {

            })

            test('User can register', () => {

            })
        })

        describe('Local storage', () => {
            test('Creates user and token items in local storage', () => {

            })
        }) 
    })
})