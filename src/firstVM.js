
class FirstVM extends ko.VM{
    constructor(){
        super();
        
        this.a = 5;
        this.b = 7;
        
        this.with(() => this.a).subscribe(function(value){
            console.log("changed to "+value);
        });
        
        this.track();
    }
    
    get sum(){
        return this.a*1+this.b*1;
    }
    
    reset(){
        this.a = 0;
        this.b = 0;
    }
}