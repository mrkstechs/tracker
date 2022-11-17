/** @jest-environment jsdom */
const fs = require("fs");
const { TestEnvironment } = require("jest-environment-jsdom");
const path = require('path');
const { hasUncaughtExceptionCaptureCallback } = require("process");
const html = fs.readFileSync(path.resolve("../client/homepage.html"), 'utf8');

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

describe("Exercise page", () => {

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
    
    describe('Display', () => {
        
        describe('User has no goals', () => {
            test('Displays new goal form', () => {
                expect(displayNewGoalForm).toHaveBeenCalled()
            })
        })

        describe('User has goal but no trackers', () => {
            test('Displays add tracker, goal and streak but not latest exercise', () => {

            })
        })

        describe('User has goal and trackers', () => {
            test('Displays add tracker, goal, streak and latest exercise', () => {

            })
        }) 
    })

    describe('Exercise data', () => {
        test('Retrieves user, exerciseGoal, exerciseTrackers, lastExercise', () => {

        })
    })

    describe('Submit', () => {
        test('User can submit a goal', () => {

        })

        test('User can submit a tracker', () => {

        })
    })

});