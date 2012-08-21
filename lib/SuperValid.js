module.exports = {
	
	EMAIL_REGEX : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	
	chain : {},

	prev : null,

	assert : function(key, value) {
		this.chain[key] = {value : value, errors : []};	
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
		if(this.getPrev().length == 0)
			this.pushErr(msg);
		return this;
	},

	regex : function(regex, msg) {
		if(!regex.test(this.getPrev()))
			this.pushErr(msg);
		return this;
	},

	isEmail : function(msg) {
		return this.regex(this.EMAIL_REGEX, msg);
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