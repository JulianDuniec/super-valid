[![build status](https://secure.travis-ci.org/JulianDuniec/super-valid.png)](http://travis-ci.org/JulianDuniec/super-valid)

super-valid
===========

Validation-framework for NodeJS

## Installation
  $ npm install super-valid
  
## Usage

```js
var SuperValid = require('super-valid');

var errors = SuperValid
                .assert("name", req.params.name)
                  .longerThan(5, "Name too short")
                  .shorterThan(15, "Name too long")
                .assert("age", req.params.age)
                  .isInt("Not a number")
                  .greaterThan(18, "Age too little")
                  .errors();
if(errors) {
  console.log(errors);
    /* Will produce
    {
      name : {
        value : '[the value supplied]',
        error : 'Name too long', // The most recent error
        errors : ['Name too short', 'Name too long'] // All the errors
      },
      age : {
        value : '[the value supplied]',
        errors : 'Age too little',
        errors : ['Not a number', 'Age too little']
      }
    } 
    */
}
```
| Method                                  | Description |
|:-----------                             |:------------|
| notEmpty(errorMessage)                  | Ensures that the string is not empty    
| longerThan(len, errorMessage)           | Ensures that the string is longer than len
| shorterThan(len, errorMessage)          | Ensures that the string is shorter than len
| isEmail(errorMessage)                   | Ensures that the string is an email-address
| regex(regex, errorMessage)              | Ensures that the string matches the supplied regular expression 
<<<<<<< HEAD
| isInt(errorMessage)                     | Ensures that the value is a valid integer
| isFloat(errorMessage)                   | Ensures that the value is a valid float
| greaterThan(min, errorMessage)          | Ensures that the value is a number greater than min
| lessThan(max, errorMessage)             | Ensures that the value is a number less than min
=======
| isInt(errorMessage)                     | Ensures that the string is a valid integer
| isFloat(errorMessage)                   | Ensures that the string is a valid float
| greaterThan(min, errorMessage)          | Ensures that the string is a number greater than min
| lessThan(max, errorMessage)             | Ensures that the string is a number less than min
| isBool(errorMessage)                    | Ensures that the string is equal to "true" or "false"
>>>>>>> ef667023ffd50a7f49804a69bd4237587aa30992
