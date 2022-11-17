/** @jest-environment jsdom */
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/profilepage.html"), 'utf8');

describe('profilepage.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('title', () =>{
        test('page contains a title', () =>{
            const title = document.querySelector('h1');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('Welcome to your Profile');
        })
        test('h1 has an id', ()=>{
            const titleId = document.querySelector('h1');
            expect(titleId).toBeTruthy();
            expect(titleId.id).toEqual('profileheader');
        })
    })

    describe('button',() =>{
        test('page contains a button to the homepage', ()=>{
            const homebtn = document.querySelector('button');
            expect(homebtn.textContent).toBe('Back to Homepage');
        })

        test('button has an id', ()=>{
            const btnId = document.querySelector('button');
            expect(btnId).toBeTruthy();
            expect(btnId.id).toEqual('home');
        })
    })

    describe('div', () =>{
        test('div for cards exists', () =>{
            const cardDiv = document.querySelector('.cards');
            expect(cardDiv).toBeTruthy();
            expect(cardDiv.className).toBe('cards');
        })

        test('div for habits exists', () =>{
            const habitDiv = document.querySelector('.habit');
            expect(habitDiv).toBeTruthy();
            expect(habitDiv.className).toBe('habit');
        })

        test('h2 tags exist', () =>{
            const h2Tag = document.querySelector('h2');
            expect(h2Tag).toBeTruthy();
        })
        test('h2 tags exist', () =>{
            const h2TagExercise = document.querySelector('h2');
            expect(h2TagExercise).toBeTruthy();
            expect(h2TagExercise.textContent).toEqual('Exercise');
        })
    })
})
