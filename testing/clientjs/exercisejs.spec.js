/** @jest-environment jsdom */
const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/exercise.html"), 'utf8');
document.documentElement.innerHTML = html.toString();

global.fetch = require('jest-fetch-mock');

const { createDisplay, retrieveExData, displayNewGoalForm, submitGoal, displayLatestExercise, displayGoal, displayStreak, calculateStreak, displayAddTrackerButton, displayAddTrackerForm, submitTracker } = require(path.resolve("../client/assets/js/exercise.js"))

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
            
            beforeAll(() => {
                fetch = jest.fn(() =>
                Promise.resolve({
                  json: () => Promise.resolve({user: {userId: 1}}),
                })
              )
            });

            test('Calls new goal form', async () => {
                const user = {userId: 1}
                expect(displayNewGoalForm).toHaveBeenCalledWith(user)
            })
        })

        describe('User has goal but no trackers', () => {

            beforeAll(() => {
                fetch = jest.fn(() =>
                Promise.resolve({
                  json: () => Promise.resolve([]),
                })
              )
            });

            test('Calls add tracker, goal and streak but not latest exercise', () => {
                createDisplay();
                expect(displayGoal).toHaveBeenCalled
                expect(displayStreak).toHaveBeenCalled
                expect(displayAddTrackerButton).toHaveBeenCalled
            })
        })

    //     describe('User has goal and trackers', () => {
    //         test('Calls add tracker, goal, streak and latest exercise', () => {

    //         })
    //     }) 

    //     describe('Items correctly displayed', () => {
    //         test('New goal form correctly added on page', () => {

    //         })
    //         test('New tracker button correctly added on page', () => {

    //         })
    //         test('New tracker form correctly added on page', () => {

    //         })
    //         test('Display goal correctly added on page', () => {

    //         })
    //         test('Streak correctly added on page', () => {

    //         })
    //     })
    // })

    // describe('Exercise data', () => {
    //     test('Retrieves user, exerciseGoal, exerciseTrackers, lastExercise', () => {

    //     })

    //     test('Streak is calculated correctly', () => {
            
    //     })
    // })

    // describe('Submit', () => {
    //     test('User can submit a goal', () => {

    //     })

    //     test('User can submit a tracker', () => {

    //     })
    })

});