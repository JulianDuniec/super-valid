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
                  .biggerThan(18, "Age too little")
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
