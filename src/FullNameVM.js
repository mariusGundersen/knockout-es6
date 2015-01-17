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