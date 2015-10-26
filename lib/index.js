
var error = function(item, description) {
	this.item = item;
	this.description = description;
}

var validationWrapper = function() { 

	var _errors = [];

	function addToErrors(item, description) {
		_errors.push(new error(item, description));
	}
	this.addToErrors = addToErrors;

	function isValidArg(arg) {
		if( arg.hasOwnProperty('value') && arg.value != null && 
			arg.hasOwnProperty('errorMessage') && arg.errorMessage != null && 
			arg.hasOwnProperty('name') && arg.name != null){
			return true;
		}
		return false;
	}

	this.validate = function() {
		// loop through each argument provided.
		for(var i=0; i <arguments.length; i++) {
			// ensure the argument provided is valid
			if(isValidArg(arguments[i])) { 
				// if argument's value is not true, assume error.
				if(arguments[i].value !== true) {
					addToErrors(arguments[i].name, arguments[i].errorMessage);
				}
			}
		}
	}

	this.isValid = function() {
		return _errors.length == 0;
	}

	this.get = function(itemName) {
		for(var i = 0; i < _errors.length; i++) {
			if(_errors[i].item == itemName) {
				return _errors[i].description;
			}
		}
	}

	this.getErrors = function() {
		var results = [];
		for (i in _errors) {
			results.push({
				item: _errors[i].item,
				error: _errors[i].description
			});
		}
		return results;
	}

	this.getSummary = function() {
		var results = [];
		for (i in _errors) {
			results.push(_errors[i].description);
		}
		return results;
	}

}

module.exports = validationWrapper;