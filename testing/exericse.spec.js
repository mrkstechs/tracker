/** @jest-environment jsdom */
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/exercise.html"), 'utf8');

describe('exercise.html', () =>{
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
            const div = document.querySelector('.card')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('card')
        })
        test('div exists', () =>{
            const div = document.querySelector('.trackers')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('trackers')
        })
        test('div exists', () =>{
            const div = document.querySelector('.goal')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('goal')
        })
        test('div exists', () =>{
            const div = document.querySelector('.progress')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('progress')
        })
        test('div exists', () =>{
            const div = document.querySelector('.streak')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('streak')
        })
        test('div exists', () =>{
            const div = document.querySelector('.today')
            expect(div).toBeTruthy();
            expect(div.className).toEqual('today')
        })
    })
})
