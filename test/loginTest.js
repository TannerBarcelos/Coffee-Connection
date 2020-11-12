const app = require('../server');
const assert = require('chai').assert;
const request = require('supertest'); 
const cookie = require('cookie');

describe('Login Tests', function () {
	let response;
	let myCookie = null;
	let agent = request.agent(app); //Use across many requests

	it('Cookie with appropriate name is returned', function(){
		let cookies = response.header['set-cookie'].map(cookie.parse);
		cookies= cookies.filter(c => c.hasOwnProperty('auth-token'));
		assert.notEmpty(cookies);
		myCookie = cookies[0];
	});
	describe('Login Sequence', function() {
		before(async function(){
			response = await agent.post('https://coffee-connection.herokuapp.com/auth/login')
				.send({"email": "testuser@gmail.com",	"password": "testuser123"});
		});
		it('Login Good', function(){
			assert.equal(response.status, 200); 
		});
		it('User returned', function(){
			let user = JSON.parse(response.text);
			assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
		});
		it('Cookie session ID changed', function () {
			let cookies = response.header['set-cookie'].map(cookie.parse);
			cookies = cookies.filter(c => c.hasOwnProperty('TourSid'));
			assert.notEmpty(cookies);
			assert.notEqual(cookies[0]['TourSid'], myCookie['TourSid']);
			//console.log(cookies[0]['TourSid'], myCookie['TourSid']);
		});
	});
	describe('Bad Logins', function(){
		it('Bad Email', async function(){
			response = await agent.post('/login')
				.send({"email": "Bstedhorses1903@yahoo.com",	"password": "nMQs)5Vi"});
			assert.equal(response.status, 401);
		});
		it('Bad Password', async function(){
			response = await agent.post('/login')
				.send({"email": "stedhorses1903@yahoo.com",	"password": "BnMQs)5Vi"});
			assert.equal(response.status, 401);
		});
	})
})
	

/**
 * describe('title_of_set_of_tests', testCallback) - this is used to establish a new test with a description and the test to run
 * using the chai assertion library
 * 
 * it('title of this test case' testCallback)
 */

// Chai assert
// describe('Array via Assert Style', function() {
//     const numbers = [1, 2, 3, 4, 5];
//     it('is array of numbers', function() {
//         assert.isArray(numbers, 'is array of numbers');
//     });
//     it('array contains 2', function() {
//         assert.include(numbers, 2, 'array contains 2');
//     });
//     it('array contains 5 numbers', function() {
//         assert.lengthOf(numbers, 5, 'array contains 5 numbers');
//     });
// });

// // Expect style from Chai
// describe('Array tests via Expect style', function() {
//     const numbers = [1, 2, 3, 4, 5];
//     it('A test with multiple assertions', function() {
//         expect(numbers).to.be.an('array').that.includes(2);
//         expect(numbers).to.have.lengthOf(5);
//     });
// });

// // Should style from Chai
// describe('Array tests via Should style', function(){
//     const numbers = [1, 2, 3, 4, 5];
//     it('Includes test', function() {
//         numbers.should.be.an('array').that.includes(2);
//     });
//     it('Length test', function() {
//         numbers.should.have.lengthOf(5);
//     });
// });