/** @jest-environment jsdom */
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/index.html"), 'utf8');
describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('title')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('HabitHelper');
        }); 
    })

    describe('div', () => {
        test('it has a class of brand', () => {
            const div = document.querySelector('header div.brand')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('brand')
        })
    })

    describe('h1', () => {
        test('it has a value of Welcome to HabitHelper.', () => {
            const hOne = document.querySelector('h1')
            expect(hOne).toBeTruthy();
            expect(hOne.textContent).toContain('Welcome to HabitHelper.')
        })
    })

    describe('username label', () => {
        test('it has contains the word Username', () => {
        const username = document.querySelecter('label#uname')
        expect(username).toBeTruthy();
        expect(username.textContent).toContain('Username')
        })
    })

    describe('password label', () => {
        test('it has contains the word Password', () => {
        const password = document.querySelecter('label#pword')
        expect(password).toBeTruthy();
        expect(password.textContent).toContain('Password')
        })
    })
    
})