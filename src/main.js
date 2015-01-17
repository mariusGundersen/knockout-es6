Array.prototype.forEach.call(document.querySelectorAll('div.sum'), div => {
    var sumVM = new SumVM();
    ko.applyBindings(sumVM, div);
});

var nameVM = new FullNameVM();
ko.applyBindings(nameVM, document.querySelector('div.names'));