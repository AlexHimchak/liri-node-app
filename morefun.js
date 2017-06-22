function DigitalPal(){
	this.hungry = false;
	this.sleepy = false;
	this.bored = true;
	this.age = 0;
}

function feed 	(DigitalPal){
	if (DigitalPal.hungry){
		console.log("That was Yummy!");
		DigitalPal.hungry = false;
		DigitalPal.sleepy = true;
	}
	else{
		console.log("No thanks im full")
	}
}
function sleep (DigitalPal){
	if (DigitalPal.sleepy){
		console.log("ZZZzzzzzzz");
		DigitalPal.sleepy = false;
		DigitalPal.bored = true;
		increaseAge(DigitalPal);
	}
	else{
		console.log("No way im not tired!")
	}
}

function play (DigitalPal){
	if (DigitalPal.bored){
		console.log("Yay lets play!")
		DigitalPal.bored = false;
		DigitalPal.hungry = true
	}
	else{
		console.log("Not right now later?")
	}
}

function increaseAge(DigitalPal){
	DigitalPal.age++;
	console.log("Happy Birthday to me! I am "+ DigitalPal.age + " old");
}

var Dog = new DigitalPal();

Dog.outside = false;

function Bark(){
	console.log("Woof! Woof!");
}


function goOutside(DigitalPal){
	if (DigitalPal.outside === false){
		console.log("Yay I love the outdoors!")
		DigitalPal.outside = true;
		Bark(DigitalPal);
	}
	else {
		console.log("We are already outside tho.....")
	}
}









