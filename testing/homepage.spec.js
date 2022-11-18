/** @jest-environment jsdom */
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/homepage.html"), 'utf8');

describe('homepage.html', () =>{
    beforeEach(() =>{
        document.documentElement.innerHTML = html.toString();
    })
    describe('header', ()=>{
        test('page has a header', () =>{
            const header = document.querySelector('header')
            expect(header).toBeTruthy()
        })
        test('header contains h2 element', () =>{
            const h2 = document.querySelector('#logo')
            expect(h2).toBeTruthy()
            expect(h2.textContent).toBe('HabitHelper');
        })
        test('header contains nav', () =>{
            const nav = document.querySelector('nav')
            expect(nav).toBeTruthy();
        })
        test('nav has ul', () =>{
            const ul = document.querySelector('.navlinks')
            expect(ul).toBeTruthy();
            expect(ul.className).toEqual('navlinks')
        })
        test('nav ul has list items', () =>{
            const li = document.querySelector('li')
            expect(li).toBeTruthy();
        })
        test('list items contain links', () =>{
            const a = document.querySelector('a')
            expect(a).toBeTruthy();
        })
    })
    describe('div', ()=>{
        test('div exists', ()=>{
            const div = document.querySelector('.brand')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('brand')
        })
        test('div contains title', () =>{
            const title = document.querySelector('h1')
            expect(title).toBeTruthy();
            expect(title.textContent).toBe(`Your Habit Tracking.`);
        })
        test('div contains span', () =>{
            const span = document.querySelector('.titlecolor')
            expect(span).toBeTruthy()
            expect(span.className).toBe('titlecolor')
        })
    })
    describe('div', ()=>{
        test('div containing icons', () =>{
            const iconsDiv = document.querySelector('.icons')
            expect(iconsDiv).toBeTruthy();
            expect(iconsDiv.className).toBe('icons')
        })
        test('div for each icon', ()=>{
            const iconDiv = document.querySelector('.icon')
            expect(iconDiv).toBeTruthy();
            expect(iconDiv.className).toBe('icon')
        })
        test('icons exist', ()=>{
            const icon = document.querySelector('i')
            expect(icon).toBeTruthy();
            expect(icon.className).toBe('bi bi-house')
        })
    })
    describe('div', ()=>{
        test('div for habits', ()=>{
            const habitsDiv = document.querySelector('#habits')
            expect(habitsDiv).toBeTruthy();
            expect(habitsDiv.id).toBe('habits')
        })
    })
})
