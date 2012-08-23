var SuperValid = require("../lib/SuperValid");

module.exports = {
	testFunctionChain : function(test) {
		var errors = SuperValid.assert("name", "value").notEmpty().errors();
		test.equals(errors, null);
		test.done();
	},

	testFunctionChainWithError : function(test) {
		var errors = SuperValid.assert("name", "").notEmpty("EMPTY").errors();
		test.equals(errors.name.error, "EMPTY");
		test.equals(errors.name.errors[0], "EMPTY");
		test.done();
	},

	testNullValues : function(test) {
		var errors = SuperValid.assert("name", null).notEmpty("EMPTY").errors();
		test.equals(errors.name.error, "EMPTY");
		test.equals(errors.name.errors[0], "EMPTY");
		test.done();
	},

	testRegex : function(test) {
		var errors = SuperValid.assert("name", "asd").regex(/asd1/, "INVALID").errors();
		test.equals(errors.name.error, "INVALID");
		test.equals(errors.name.errors[0], "INVALID");

		var errors = SuperValid.assert("name", "asd").regex(/asd/, "VALID").errors();
		test.equals(errors, null);
		test.done();
	},

	testBool : function(test) {
		var errors = SuperValid.assert("poop", "asd").isBool("INVALID").errors();
		test.equals(errors.poop.error, "INVALID");
		
		var errors = SuperValid.assert("poop", "true").isBool("INVALID").errors();
		test.equals(errors, null);
		var errors = SuperValid.assert("poop", "false").isBool("INVALID").errors();
		test.equals(errors, null);
		test.done();
	},

	testMultiple : function(test) {
		var errors = SuperValid.assert("name", "").regex(/asd/, "REGEX").notEmpty("EMPTY").errors();
		test.equals(errors.name.error, "EMPTY");
		test.equals(errors.name.errors[0], "REGEX");
		test.equals(errors.name.errors[1], "EMPTY");
		test.done();
	},

	testMultipleAsserts : function(test) {
		var errors = SuperValid
			.assert("name", "")
				.notEmpty("EMPTY")
			.assert("email", "")
				.notEmpty("EMPTY")
				.errors();
		test.equals(errors.name.error, "EMPTY");
		test.equals(errors.email.error, "EMPTY");
		test.done();
	},

	testEmail : function(test) {
		var errors = SuperValid
			.assert("email", "asdasd")
				.isEmail("EMAIL")
				.errors();
		test.equals(errors.email.error, "EMAIL");
		
		var errors = SuperValid
			.assert("email", "julian@internet.com")
				.isEmail("EMAIL")
				.errors();
		test.equals(errors, null);
		test.done();
	},

	testFloat : function(test) {
		var errors = SuperValid
			.assert("number", "asdasd")
				.isFloat("NUMBER")
				.errors();
		test.equals(errors.number.error, "NUMBER");
		var errors = SuperValid
			.assert("number", "12.3")
				.isFloat("NUMBER")
				.errors();
		test.equals(errors, null);
		test.done();
	},

	testInt : function(test) {
		var errors = SuperValid
			.assert("number", "asdasd")
				.isInt("NUMBER")
				.errors();
		test.equals(errors.number.error, "NUMBER");

		var errors = SuperValid
			.assert("number", "11.3")
				.isInt("NUMBER")
				.errors();
		test.equals(errors.number.error, "NUMBER");


		var errors = SuperValid
			.assert("number", "11,3")
				.isInt("NUMBER")
				.errors();
		test.equals(errors.number.error, "NUMBER");
		
		var errors = SuperValid
			.assert("number", "138")
				.isInt("NUMBER")
				.errors();
		test.equals(errors, null);

		var errors = SuperValid
			.assert("number", "-138")
				.isInt("NUMBER")
				.errors();
		test.equals(errors, null);

		var errors = SuperValid
			.assert("number", "+138")
				.isInt("NUMBER")
				.errors();
		test.equals(errors, null);
		test.done();
	},

	testGT : function(test) {
		var errors = SuperValid
			.assert("number", "10")
				.greaterThan(11, "NUMBER")
				.errors();
		test.equals(errors.number.error, "NUMBER");

		var errors = SuperValid
			.assert("number", "10")
				.greaterThan(9, "NUMBER")
				.errors();
		test.equals(errors, null);
		test.done();		
	},
	
	testLT : function(test) {
		var errors = SuperValid
			.assert("number", "10")
				.lessThan(9, "NUMBER")
				.errors();
		test.equals(errors.number.error, "NUMBER");

		var errors = SuperValid
			.assert("number", "10")
				.lessThan(11, "NUMBER")
				.errors();
		test.equals(errors, null);
		test.done();		
	},
	
	testLongerThan : function(test) {
		var errors = SuperValid
			.assert("string", "abcdee")
				.longerThan(6, "STRING")
				.errors();
		test.equals(errors.string.error, "STRING");

		var errors = SuperValid
			.assert("string", "abcdhey")
				.longerThan(6, "STRING")
				.errors();
		test.equals(errors, null);
		test.done();		
	},

	testShorterThan : function(test) {
		var errors = SuperValid
			.assert("string", "asdfg")
				.shorterThan(4, "STRING")
				.errors();
		test.equals(errors.string.error, "STRING");

		var errors = SuperValid
			.assert("string", "asd")
				.shorterThan(4, "STRING")
				.errors();
		test.equals(errors, null);
		test.done();		
	}
};