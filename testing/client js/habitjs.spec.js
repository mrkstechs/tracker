const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/index.html"), 'utf8');

global.fetch = require('jest-fetch-mock');

const { getUser, changeTitle, displayHabits, displayNewSleepGoal, displayNewExerciseGoal, displayNewWaterGoal, displaySleep, displaySleepProgress, sendToSleep, displayExercise, sendToExercise, displayWater, sendToWater } = require(path.resolve("../client/assets/js/habit.js"))

global.localStorage = {
    
    setItem (key, item) {
      this.state[key] = item
    },
    getItem (key) { 
      return this.state[key]
    }
  }

describe("Hompeage", () => {

    beforeAll(() => {
        localStorage.setItem("user", `{"email": "test@gmail.com",
                "firstName": "Test",
                "lastName": "Tester",
                "username": "testuser",
                "password": "$2b$12$4Ah04EzYN3ilHi4b7ptGCuL2DC/bucfo9fV9ZvFPldCV7SAGaJhOm"}`)
    })

    beforeEach(() => {
        fetch.resetMocks()
        
        window.document.body.innerHTML = html
        })

    afterAll(() => jest.resetAllMocks())
    
    describe('User', () => {
        test('It retrieves user from local storage', () => {
               const user = getUser()
               expect(user).toBeTruthy();
        })
    })

    // describe('Requests', () => {
    //     test('It fetches userTrackedGoals', () => {

    //     }); 

    //     test('It fetches sleepData', () => {

    //     });

    //     test('It fetches exeData', () => {
            
    //     })
        
    //     test('It fetches waterData', () => {
            
    //     })
        
    // })

    describe('Relocation functions', () => {
        const {location} = window;
        beforeAll(() => {
            delete window.location;
            window.location = { assign: jest.fn() };
        })

        afterAll(() => {
            window.location = location;
        });

        test('Sends to sleep', () => {
            sendToSleep()
            expect(window.location.assign).toHaveBeenCalled();
        });

        test('Sends to water', () => {
            sendToWater()
            expect(window.location.assign).toHaveBeenCalled();
        });

        test('Sends to exercise', () => {
            sendToExercise()
            expect(window.location.assign).toHaveBeenCalled();
        })
    })

    // describe('Display functions', () => {
    //     test('Displays sleep card when user has sleep goal', () => {

    //     })

    //     test('Displays add sleep goal card when user has no sleep goal', () => {

    //     })

    //     test('Displays exercise card when user has exercise goal', () => {

    //     })

    //     test('Displays add exercise goal card when user has no exercise goal', () => {

    //     })

    //     test('Displays water card when user has water goal', () => {

    //     })

    //     test('Displays add water goal card when user has no water goal', () => {

    //     })
    // })

})