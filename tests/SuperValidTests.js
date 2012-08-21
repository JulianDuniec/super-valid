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

	testRegex : function(test) {
		var errors = SuperValid.assert("name", "asd").regex(/asd1/, "INVALID").errors();
		test.equals(errors.name.error, "INVALID");
		test.equals(errors.name.errors[0], "INVALID");

		var errors = SuperValid.assert("name", "asd").regex(/asd/, "VALID").errors();
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
			.assert("email", "julian@google.com")
				.isEmail("EMAIL")
				.errors();
		test.equals(errors, null);
		test.done();
	}
};