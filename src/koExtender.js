ko.VM = function(){
    this.whenInitialized = [];
};
ko.VM.prototype.track = function(){
    console.log("start track")
    
    Object.getOwnPropertyNames(this)
    .map(name => ({
        name, 
        desc: Object.getOwnPropertyDescriptor(this, name)
    }))
    .filter(o => o.desc.configurable)
    .forEach(o => {
        let obs = ko.observable(this[o.name]);
        Object.defineProperty(this, o.name, {
            enumerable: true,
            configurable: true,
            get: obs,
            set: obs
        });
    });
    
    let proto = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(proto)
    .map(name => ({
        name, 
        desc: Object.getOwnPropertyDescriptor(proto, name)
    }))
    .filter(o => o.desc.configurable)
    .filter(o => 'get' in o.desc)
    .forEach(o => {
        let comp = ko.pureComputed({
            read: o.desc.get.bind(this),
            write: o.desc.set ? o.desc.set.bind(this) : null
        });
        Object.defineProperty(this, o.name, {
            enumerable: true,
            configurable: true,
            get: comp,
            set: o.desc.set ? comp : undefined
        });
    });
    
    console.log("ended extend");
    
    this.whenInitialized.forEach(f => f());
    delete this.whenInitialized;
    console.log("ended track");
}

ko.VM.prototype.with = function(obs){
    let force = ko.observable(false);
    let comp = ko.pureComputed(() => (force(), obs()));
    if(this.whenInitialized){
        this.whenInitialized.push(() => force(true));
    }
    return comp;
};