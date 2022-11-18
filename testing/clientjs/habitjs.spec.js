/** @jest-environment jsdom */
const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/homepage.html"), 'utf8');
document.documentElement.innerHTML = html.toString();

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
        document.documentElement.innerHTML = html.toString();
        })

    afterAll(() => jest.resetAllMocks())
    
    describe('User', () => {
        test('It retrieves user from local storage', () => {
               const user = getUser()
               expect(user).toBeTruthy();
        })
    })

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

    describe('displayHabits function', () => {

        describe('When user has no goals', () => {

            beforeAll(() => {
                fetch = jest.fn(() =>
                Promise.resolve({
                  json: () => Promise.resolve([]),
                })
              )
            });

            test('Calls displayNewSleepGoal when user has no sleep goal', () => {
                displayHabits()
                expect(displayNewSleepGoal).toHaveBeenCalled
            })

            test('Calls displayNewExerciseGoal when user has no exercise goal', () => {
                displayHabits()
                expect(displayNewExerciseGoal).toHaveBeenCalled
            })

            test('Calls displayNewWaterGoal when user has no water goal', () => {
                displayHabits()
                expect(displayNewWaterGoal).toHaveBeenCalled
            })

            })

        describe('When user has goals', () => {

            beforeAll(() => {
                fetch = jest.fn(() =>
                Promise.resolve({
                  json: () => Promise.resolve([{habitId: 1}, {habitId: 2}, {habitId: 3}]),
                })
              )
            });

            test('Displays sleep card when user has sleep goal', () => {
                displayHabits()
                expect(displaySleep).toHaveBeenCalled
            })

            test('Displays exercise card when user has exercise goal', () => {
                displayHabits()
                expect(displayExercise).toHaveBeenCalled
            })

            test('Displays water card when user has water goal', () => {
                displayHabits()
                expect(displayWater).toHaveBeenCalled
            })
        })
    
    })

    describe('Display Functions', () => {

        beforeEach(() => {      
            document.documentElement.innerHTML = html.toString();
            })

        beforeAll(() => {
            fetch = jest.fn(() =>
            Promise.resolve({
              json: () => Promise.resolve([{date: "2022-11-17", dailyValue: 5}]),
            })
          )
        });

        test('Correctly display sleep card', () => {
            sleepGoal = {dailyGoal: 8}
            user = {id: 1}
            const habitSection = document.querySelector('#waterHabit')
            displaySleep(user, sleepGoal)
            const date = document.querySelector('div.sleep h4')
            expect(habitSection).toEqual("2022-11-17")
        })


    })
})
