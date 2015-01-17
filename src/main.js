
console.log("loaded");
Array.prototype.forEach.call(document.querySelectorAll('div'), div => {
    var firstVM = new FirstVM();
    ko.applyBindings(firstVM, div);
});