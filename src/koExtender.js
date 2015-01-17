(function(ko){
  
  ko.ViewModel = function ViewModel(){
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
  }

  ko.ViewModel.prototype.with = function(obs){
    return ko.pureComputed(() => obs());
  };
  
})(ko);