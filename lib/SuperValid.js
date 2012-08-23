module.exports = {
	
	EMAIL_REGEX : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	
	INT_REGEX : /^(\+|-)?\d+$/,

	chain : {},

	prev : null,

	assert : function(key, value) {
		this.chain[key] = {value : value == null ? "" : value, errors : []};	
		this.prev = key;
		return this;
	},

	getPrev : function() {
		return this.chain[this.prev].value;
	},

	pushErr : function(err) {
		this.chain[this.prev].error = err;
		this.chain[this.prev].errors.push(err);
	},

	notEmpty : function(msg) {
		return this.longerThan(0, msg);
	},

	longerThan : function(len, msg) {
		if(this.getPrev().length <= len)
			this.pushErr(msg);
		return this;
	},

	shorterThan : function(len, msg) {
		if(this.getPrev().length >= len)
			this.pushErr(msg);
		return this;
	},

	regex : function(regex, msg) {
		if(!regex.test(this.getPrev()))
			this.pushErr(msg);
		return this;
	},

	isBool : function(msg) {
		if(this.getPrev() != "true" && this.getPrev() != "false")
			this.pushErr(msg);
		return this;
	},

	isEmail : function(msg) {
		return this.regex(this.EMAIL_REGEX, msg);
	},

	isInt : function(msg) {
		return this.regex(this.INT_REGEX, msg);
	},

	isFloat : function(msg) {
		if(isNaN(parseFloat(this.getPrev())))
			this.pushErr(msg);
		return this;
	},

	greaterThan : function(number, msg) {
		if(parseFloat(this.getPrev()) < number)
			this.pushErr(msg);
		return this;
	},

	lessThan : function(number, msg) {
		if(parseFloat(this.getPrev()) > number)
			this.pushErr(msg);
		return this;
	},

	reset : function() {
		this.chain = {};
		this.prev = null;
	},

	errors : function() {
		var errors = {};
		for(key in this.chain) {
			if(this.chain[key].errors.length > 0)
				errors[key] = this.chain[key];
		}
		
		this.reset();

		if(Object.keys(errors).length == 0)
			return null;
		return errors;
	}
};