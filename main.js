class Circle {
	constructor(x,y,dx,dy,radius,color) {
		this.x = x;
		this.y = y;
		this.velocity = {
			x: dx,
			y: dy
		}
		this.radius = radius;
		this.color = color;
	}

	draw() {
		ctx.beginPath(); 
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.closePath();
	}

	update() {
		if (this.x - this.radius*3 > windowWidth) { //If ball passes the right wall and goes past it, increase p1 points 
			playerOne.increasePoints();
			this.center();							//return to center of screen
		} 

		if (this.x + this.radius*3 < 0) {			//If ball passes with left wall and goes past it, increase p2 points
			playerTwo.increasePoints();
			this.center();	
		} 

		if (this.y+this.velocity.y > WindowHeight - this.radius || this.y+this.velocity.y < this.radius) {
			this.velocity.y = -this.velocity.y;
		}


		var detectionOne = RectCircleColliding(this, playerOne);
		var detectionTwo = RectCircleColliding(this, playerTwo);

		if (detectionOne == true || detectionTwo == true) {

			if(playerOne.dx > 0) {
				this.velocity.x -= 3;
			}

			if(playerTwo.dx < 0) {
				this.velocity.x += 3;
			}

			if(playerOne.dy < 0 || playerTwo.dy < 0) {
				this.velocity.y = this.velocity.y;
			}

			this.velocity.x = -this.velocity.x;
		}

		if (this.velocity.x > Math.abs(randomSpeed(setting.speed))) {
				this.velocity.x = this.velocity.x*0.75;
			}
		if (this.velocity.x < Math.abs(randomSpeed(setting.speed))*-1) {
				this.velocity.x = this.velocity.x*0.75;
			}


		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.draw();
	}

	center() {
		this.x = centerX;
		this.y = centerY;
		this.velocity.x = randomSpeed(setting.speed);
		this.velocity.y = randomSpeed(setting.speed);
		return;
	}
}


class Player {
	constructor(x,y,dy, width, height, color) {
		this.x = x;
		this.y = y;
		this.dy = dy;
		this.dx = 0;
		this.width = width;
		this.height = height;
		this.color = color;
		this.points = 0;
	}

	move(direction) { //direction is a value between 1 and -1, if positive move down, if negative move down
		this.dy = 3.5*direction;
		return;
	}

	speedUp(direction) {
		this.dy += 3.5*direction;
	}

	pushForward(direction) { //direction is a value between 1 and -1, if positive move right if negative move left
		this.dx = 5*direction;	
		return;
	 
	}
	pushBack(object) {
		this.x = object.x;
		this.dx = 0;	
	}


	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}

	update() {
		if (this.y + this.height + this.dy >= WindowHeight || this.y+this.dy <= 0) {
			this.dy = -this.dy;
		}
		
		//if x cordinates is more than 27.5 from start position reverse speed 
		if (this.x > data.One.x+27.5) {
			this.dx = -this.dx;			
		}

		if (this.x > data.Two.x-27.5) {
			this.dx = -this.dx;
		}

		if (this.x < data.One.x) {
			this.pushBack(data.One);
		}
		if (this.x > data.Two.x) {
		 	this.pushBack(data.Two);
		}

		if (Math.abs(this.dy) > 3.5) {
			this.dy = this.dy*0.985;
			console.log(this.dy);
		}

		this.y += this.dy;

		if(this.dx != 0) {
			this.x += this.dx;
		}

		this.draw();
	}

	center() {
		this.dy = 0;
		this.y = 150;
		return;
	}

	increasePoints() {
		this.points += 1;
		if (this.points >= 10) {
			stopGame();
		}
	}
}

	const windowWidth = window.innerWidth;
	const WindowHeight = window.innerHeight-40; //-40 because scoreboard takes up upperspace

	const centerX = windowWidth/2;
	const centerY = WindowHeight/2;
	
	var colors = ["#fce094"];

	const data = {
		One: {
			x: 80,
		},
		Two: {
			x: windowWidth-80,	//makes the to player x coordinate 80 from each side.
		},
		w: 7.5,
	}

	let easy = {
		speed: [5,5,-5,-5],
		y: 200,
		h: 245,
		radius: 27.5,
	}

	let normal = {
		speed: [7.5,7.5,-7.5,-7.5],
		y: 175,
		h: 215,
		radius: 22.5,
	}

	let hard = {
		speed: [10,10,-10,-10],
		y: 150,
		h: 185,
		radius: 17.5,
	}

	let extreme = {
		speed: [15,15,-15,-15],
		y: 125,
		h: 155,
		radius: 15,
	}

	const difficulty = [easy, normal, hard, extreme];

window.onload = start;
	let canvas;
	let ctx;

function start() {
	canvas = document.getElementsByTagName("canvas")[0];
	canvas.width = windowWidth;
	canvas.height = WindowHeight;
	ctx = canvas.getContext("2d");
}
	let setting;
	let circle;
	let playerOne;
	let playerTwo;
	const players = [playerOne,playerTwo];

function startGame(index) {
	setting = difficulty[index];
	speedX = randomSpeed(setting.speed);
	speedY = randomSpeed(setting.speed);

	circle = new Circle(centerX, centerY, speedX, speedY, setting.radius, colors[0]);
	playerOne = new Player(data.One.x, setting.y, 0, data.w , setting.h, colors[0]);
	playerTwo = new Player(data.Two.x, setting.y, 0, data.w , setting.h, colors[0]);

	document.getElementsByClassName('menu-container')[0].style.display = "none";
	document.getElementsByClassName('sidebars')[0].style.display = "none";
	document.getElementsByClassName('sidebars')[1].style.display = "none";
	document.getElementsByTagName("h1")[0].style.visibility = "visible";
	animate();
}

function randomSpeed(array) {
	var randomIndex = Math.floor(Math.random()*array.length);
	return array[randomIndex];
}

	var requestId;

function animate() {
	requestId = undefined;
	startAnimation();
	ctx.clearRect(0,0, canvas.width, canvas.height);
	circle.update();
	playerOne.update();
	playerTwo.update();
	updateScore();
}	

function startAnimation() {
    if (!requestId) {
       requestId = window.requestAnimationFrame(animate); 
    }
}

function stopAnimation() {
    if (requestId) {
       window.cancelAnimationFrame(requestId);
       requestId = undefined;
    }
}


function updateScore() {
	document.getElementById("pOne-Counter").innerHTML = playerOne.points;
	document.getElementById("pTwo-Counter").innerHTML = playerTwo.points; 
}

function stopGame() {
	document.getElementsByClassName('menu-container')[0].style.display = "block";
	document.getElementsByClassName('menu')[0].style.display = "none";

	document.getElementsByClassName('winner-container')[0].style.display = "block";
	if (playerOne.points == 10) {
		document.getElementsByClassName('winner-message')[0].innerHTML = 'Player One wins!';
	}
	if (playerTwo.points == 10) {
		document.getElementsByClassName('winner-message')[0].innerHTML = 'Player Two wins!';
	}
	stopAnimation();
}


function reset() {
	document.getElementsByClassName('menu')[0].style.display = "block";
	document.getElementsByClassName('winner-container')[0].style.display = "none";
	document.getElementById("pOne-Counter").innerHTML = 0;
	document.getElementById("pTwo-Counter").innerHTML = 0;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	delete playerOne;
	delete playerTwo;
	document.getElementsByClassName('sidebars')[0].style.display = "block";
	document.getElementsByClassName('sidebars')[1].style.display = "block";
}

window.addEventListener("keydown", movePlayer, false);

  var lastKeyCode;
function movePlayer(e) {
    switch(e.keyCode) {
 		//player one has WS
 		case 87: playerOne.move(-1);
        	//up W key pressed 
        		if (lastKeyCode == e.keyCode) {
        			playerOne.speedUp(-1);
        		}
        	break;
        case 83: playerOne.move(1);
        	//down S key pressed
        		if (lastKeyCode == e.keyCode) {
        			playerOne.speedUp(1);
        		} 
        	break;
        case 68: playerOne.pushForward(1);
        	//D key, move to the right
        	break;

        //player two has up and down arrow
         case 38: playerTwo.move(-1);
            // up arrow key pressed
            	if (lastKeyCode == e.keyCode) {
        			playerTwo.speedUp(-1);
        		}
        	break;
        case 40: playerTwo.move(1);
            // down arrow key pressed
            	if (lastKeyCode == e.keyCode) {
        			playerTwo.speedUp(1);
        		}
            break;  
        case 37: playerTwo.pushForward(-1);
        	//left arrow key, move to the left 
        	break;
    } 
   	lastKeyCode = e.keyCode; 
    e.preventDefault();
           
}  

function showInstructions() {
	document.getElementsByClassName('menu')[0].style.display = "none";
	document.getElementsByClassName('instructions-container')[0].style.display = "flex";
}



function RectCircleColliding(circle,rect){
    var distX = Math.abs((circle.x+circle.velocity.x) - rect.x-rect.width/2-rect.dy);
    var distY = Math.abs((circle.y+circle.velocity.y) - rect.y-rect.height/2-rect.dy);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y*Math.sin(angle),
		y: velocity.x * Math.sin(angle) - velocity.y*Math.cos(angle)
	};
	return rotatedVelocities;
}


function momentum(ball, player) {
	const angle = -Math.atan2(player.y-ball.y, player.x-ball.x);
	const m1 = ball.masss;
	const m2 = player.mass;
	const u1 = rotate(ball.velocity, angle);
	const u2 = rotate(player.dy, angle);
}
