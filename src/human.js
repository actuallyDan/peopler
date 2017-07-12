export default class Human {
	constructor(parent){
		this.firstName = this._randName();
		this.lastName = parent.lastName || this._randName();
		this.id = new Date().getTime() + "-" + Math.floor(Math.random() * 10000 + 1);
		this.incomeHr = 0;
		this.wealth = 0;
		this.sex = ["male", "female"][Math.round(Math.random())];
		this.persuasion = Math.random();
		this.children = [];
		this.health = this._normalRandom(7, 1) / 10
		this.extraversion = Math.random() * parent.extraversion || Math.random();
		this.agreeableness = Math.random() * parent.agreeableness || Math.random();
		this.openness = Math.random() * parent.openness || Math.random();
		this.conscientiousness = Math.random() * parent.conscientiousness || Math.random();
		this.neuroticism = Math.random() * parent.neuroticism || Math.random();
		this.education = Math.random() * 0.05 * parent.education || 0;
		this.legacy = parent.openness !== undefined ? Math.random() * 0.8 * parent.getMSC() / parent.children.length : 0;
		this.age = 0;
		this.environment = parent.health * 0.7 + parent.openness * 0.3 + parent.income / 0.48 || Math.floor(Math.random() * 10 + 5) / 10;;
    }
    _randName(){
    	let name = "";
      let length = Math.floor(Math.random() * 10 + 3);
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for(let i = 0; i < length; ++i){
       name += chars[Math.floor(Math.random() * 52)]
   }
   return name;
}
_normalRandom(mean, stdev){
    var y2;
    var use_last = false;
    var y1;
    if(use_last) {
     y1 = y2;
     use_last = false;
 }
 else {
    var x1, x2, w;
    do {
       x1 = 2.0 * Math.random() - 1.0;
       x2 = 2.0 * Math.random() - 1.0;
       w  = x1 * x1 + x2 * x2;               
   } while( w >= 1.0);
   w = Math.sqrt((-2.0 * Math.log(w))/w);
   y1 = x1 * w;
   y2 = x2 * w;
   use_last = true;


   var retval = mean + stdev * y1;
   if(retval > 0) 
     return retval;
 return -retval;

}
}
getMSC(){
    let msc = this.education * 0.7 + this.incomeHr + this.legacy;
    msc = this.extraversion > 0.49 ? msc * (1 + (this.extraversion - 0.49)) : msc;  
    msc = this.agreeableness > 0.59 ? msc * (1 + (this.agreeableness - 0.59)) : msc;  
    msc = this.openness > 0.85 ?  msc : this.openness > 0.59 ? msc * (1 + (this.openness - 0.59)) : msc * (1 - this.openness);  
    msc = this.conscientiousness > 0.59 ? msc * (1 + (this.conscientiousness - 0.59) * 0.5) : msc;  
    msc = this.neuroticism > 0.2 && this.neuroticism < 0.5 ? msc * (1 + this.neuroticism) : msc * (1 - this.neuroticism);
    return msc;
}
addEducation(amt){
  this.education += amt * this.environment
}
_spawn(){
    if(Math.random() <= 0.005){
        this.children.push(new Human(this));
        return 1;
    } else {
        return 0;
    }
}
advance1Month(){
    let wealthFactor = 0.1 * this.incomeHr * 40 * 4;
    if(this.age < 18){
        this.age += 1 / 12;
        this.wealth += this._normalRandom(wealthFactor, wealthFactor * 0.5)
        this.health = this.health > 1 ? 1 : this.health < 0 ? 0 : this.health +  Math.random() * (Math.random() <= 0.5 ? -1 : 1) * this.age / 500;
        this.extraversion  = this.extraversion > 1 ? 1 : this.extraversion < 0 ? 0 : this.extraversion + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.2
        this.agreeableness  = this.agreeableness > 1 ? 1 : this.agreeableness < 0 ? 0 : this.agreeableness + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.2
        this.openness  = this.openness > 1 ? 1 : this.openness < 0 ? 0 : this.openness + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.2
        this.conscientiousness  = this.conscientiousness > 1 ? 1 : this.conscientiousness < 0 ? 0 : this.conscientiousness + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.2
        this.neuroticism  = this.neuroticism > 1 ? 1 : this.neuroticism < 0 ? 0 : this.neuroticism + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.2
        this.addEducation(100);
        if(this.health <= 0 ){
            return 0;
        }
        return 1;
    } else {
        this.age += 1 / 12;
        this.wealth += this._normalRandom(wealthFactor, wealthFactor * 0.5)
        this.health = this.health > 1 ? 1 : this.health < 0 ? 0 : this.health + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * this.age / 500;
        this.extraversion = this.extraversion > 1 ? 1 : this.extraversion < 0 ? 0 : this.extraversion + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.05
        this.agreeableness = this.agreeableness > 1 ? 1 : this.agreeableness < 0 ? 0 : this.agreeableness + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.05
        this.openness = this.openness > 1 ? 1 : this.openness < 0 ? 0 : this.openness + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.05
        this.conscientiousness = this.conscientiousness > 1 ? 1 : this.conscientiousness < 0 ? 0 : this.conscientiousness + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.05
        this.neuroticism = this.neuroticism > 1 ? 1 : this.neuroticism < 0 ? 0 : this.neuroticism + Math.random() * (Math.random() <= 0.5 ? -1 : 1) * 0.05
        this.addEducation(10);
        if(this.health <= 0 ){
            return 0;
        }
        if(this.sex === "female" && this.health > 0.5){
            return 1 + this._spawn();
        }
        return 1;
    }
}
}