
class SumVM extends ko.ViewModel{
  constructor(){
    this.a = 5;
    this.b = 7;

    super();

    this.with(() => this.a).subscribe(value =>
      console.log("changed to ", value)
    );
  }

  get sum(){
    return this.a*1 + this.b*1;
  }

  reset(){
    this.a = 0;
    this.b = 0;
  }
}