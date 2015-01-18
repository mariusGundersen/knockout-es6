# knockout-ES6

This is an example of how viewmodels can be made using ES6 classes. The files SumVM and FullNameVM demonstrates how such a class can extend a Knockout baseclass and the main file demonstrates how such a class can be used. The implementation is in koExtender, which extends the ko object with a new constructor function.

## viewmodel classes

A viewmodel class can be made by extending `ko.ViewModel` and calling `super` in the constructor. These classes can have observables, computed observables, methods and subscribers. For example: 

```js
class SumVM extends ko.ViewModel{
  constructor(){
    //these will become observables
    this.a = 5;
    this.b = 7;

    //this call turns the fields above into observables and the sum getter below into a computed
    super();

    //this is how a subscribe can be done
    this.with(() => this.a).subscribe(value =>
      console.log("changed to ", value)
    );
  }

  //this is a computed property. It will automtically update when either a or b change
  get sum(){
    return this.a*1 + this.b*1;
  }

  //this is just a normal method
  reset(){
    this.a = 0;
    this.b = 0;
  }
}
```
This class consists of everything a viewmodel would have.

### constructor

All viewmodel classes must have a constructor that calls `super`. In the constructor you set up all the observable variables. All the variables assigned to `this` in the constructor, which is `a` and `b` in the above code, will be converted into observables. Initialize all of these variables *before* calling `super()`. 

### computed

Computed observables are specified as getters on the class, for example the `sum` getter in the above example. These getters can use other getters and observables and will automatically recompute if any of the observables they depend on change value. 

### writable computed

If you add a setter for the computed property, then you can also write the value to it. [Here is the example](http://knockoutjs.com/documentation/computed-writable.html) from the knockout documentation converted into ES6:

```js
class FullNameVM extends ko.ViewModel {
  constructor(){
    this.firstName = 'Planet';
    this.lastName = 'Earth';
    super();
  }
    
  get fullName(){
    return this.firstName + " " + this.lastName;
  }

  set fullName(value) {
    var lastSpacePos = value.lastIndexOf(" ");
    if (lastSpacePos > 0) { // Ignore values with no space character
      this.firstName = value.substring(0, lastSpacePos); // Update "firstName"
      this.lastName = value.substring(lastSpacePos + 1); // Update "lastName"
    }
  }
}
```

### methods

Methods on the class will not be tampered with, and can be called just like any other method. Methods can for example be bound to event handlers in the view, like `click`.

### subscribe

To subscribe to an observable or computed property you need to use `this.with` *after* the call to `super`. Instead of passing the observable or computed directly, it must be wrapped in a fat arrow function. The result is a pure computed that will update when the observable you want to subscribe to changes. You can call subscribe to the result of `this.with`. For example: 

```js
constructor(name){
  
  this.name = name;
  
  super();
  
  this.with(() => this.name)
    .subscribe(value => console.log("value changed to", value));
  
  this.name = "this will trigger the subscribe above";

}
```