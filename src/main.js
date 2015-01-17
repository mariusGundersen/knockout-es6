Array.prototype.forEach.call(document.querySelectorAll('div'), div => {
    var sumVM = new SumVM();
    ko.applyBindings(sumVM, div);
});