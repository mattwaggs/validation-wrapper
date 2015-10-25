
var expect = require('chai').expect;
var vw = require('../lib/index.js');

describe('testing validation-wrapper', function() {
	
	describe('.validate( ... )', function() {

		var validation = new vw();
		validation.validate(
			{value: true, name: 'user id', errorMessage: 'user_id is required'},
			{value: true, name: 'password', errorMessage: 'password is required'},
			{value: false, name: 'email', errorMessage: 'email is not valid'},
			{value: false, name: 'real name', errorMessage: 'real name is required'}
		);

		it('getErrors() should have two results', function() {
			
			expect(validation.getErrors().length).to.equal(2);
		
		});

		it('values from getErrors() should look like {item: \'\', error: \'\'}', function() {
			
			expect(
				JSON.stringify(validation.getErrors()[1])
			).to.equal(
				JSON.stringify({item: 'real name', error: 'real name is required'})
			);
		
		});

		it('get(\'email\') should return error for email', function() {
			
			expect(validation.get('email')).to.equal('email is not valid');

		});

		it('getSummary() should return two error descriptions', function() {
			
			expect(validation.getSummary().length).to.equal(2);

		});

		it('values from getSummary() should only have text', function() {
			
			expect(validation.getSummary()[0]).to.equal('email is not valid');
		
		});

	});

});
 
