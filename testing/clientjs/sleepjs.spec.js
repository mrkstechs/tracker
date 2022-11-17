/** @jest-environment jsdom */
const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve("../client/homepage.html"), 'utf8');

global.fetch = require('jest-fetch-mock');

const {  } = require(path.resolve("../client/assets/js/sleep.js"))

global.localStorage = {
    
    setItem (key, item) {
      this.state[key] = item
    },
    getItem (key) { 
      return this.state[key]
    }
  }

describe("Sleep page", () => {

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
            test('Calls new goal form', () => {
                expect(displayNewGoalForm).toHaveBeenCalled()
            })
        })

        describe('User has goal but no trackers', () => {
            test('Calls add tracker, goal and streak but not latest sleep', () => {

            })
        })

        describe('User has goal and trackers', () => {
            test('Calls add tracker, goal, streak and latest sleep', () => {

            })
        })

        describe('Items correctly displayed', () => {
            test('New goal form correctly added on page', () => {

            })
            test('New tracker button correctly added on page', () => {

            })
            test('New tracker form correctly added on page', () => {

            })
            test('Display goal correctly added on page', () => {

            })
            test('Streak correctly added on page', () => {

            })
        })
    })

    describe('Sleep data', () => {
        test('Retrieves user, sleepGoal, sleepTrackers, lastSleep', () => {

        })
        
        test('Streak is calculated correctly', () => {
            
        })
    })

    describe('Submit', () => {
        test('User can submit a goal', () => {

        })

        test('User can submit a tracker', () => {

        })
    })

});