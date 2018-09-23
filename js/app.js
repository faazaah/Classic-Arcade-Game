
//count for score
let score = 0;
document.querySelector("#score").innerText = "Score: " + score;

// Enemies our player must avoid
var Enemy = function(ex,ey,sp) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = ex;
    this.y = ey;
    this.speed = sp;
    this.ex = ex;
    this.ey = ey;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);

    if (this.x > 600) {
        this.reset();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.handleColn(player.x, player.y, this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle collission with player
//Collission detection Code logic from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.handleColn = function(xp,yp,xe,ye) {
    if (xp < xe + 40 && xp + 40 > xe && yp < ye + 40 && 40 + yp > ye) {
        score -= 10;
        document.querySelector("#score").innerText = "Score: " + score;
        player.reset();
        key.reset();
        star.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = this.ex;
    this.y = this.ey;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(px, py) {
    this.x = px;
    this.y = py;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    //when player reaches the water, player position is reset
    if (this.y < -10) {
        score += 50;
        document.querySelector("#score").innerText = "Score: " + score;
        this.reset();
        //player wins when player has collected key and star
        if (((key.x === 100) && (key.y === -10)) && ((star.x === 125) && (star.y === -10))) {
            winText();
            //winning the game resets score and player, key and star position
            player.reset();
            key.reset();
            star.reset();
            score = 0;
            document.querySelector("#score").innerText = "Score: " + score;
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    //handles key press and makes sure that player does not go offscreen
    if ((key === 'left') && (this.x > 0)) {
        this.x -= 30;
    }
    else if ((key === 'right') && (this.x < 400)) {
        this.x += 30;
    }
    else if ((key === 'up') && (this.y > 0)) {
        this.y -= 30;
    }
    else if ((key === 'down') && (this.y < 425)) {
        this.y += 30;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 425;
};

//Key class
var Key = function(kx,ky) {
    this.x = kx;
    this.y = ky;
    this.sprite = 'images/Key.png';
    this.kx = kx;
    this.ky = ky;
};

Key.prototype.update = function() {
    this.getKey(player.x, player.y, this.x, this.y);
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//when player gets key
//Code logic from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Key.prototype.getKey = function(xp,yp,xk,yk) {
    if (xp <= xk + 20 && xp + 20 >= xk && yp <= yk + 20 && 20 + yp >= yk) {
        if (yk != -10) {
            score += 100;
            document.querySelector("#score").innerText = "Score: " + score;
        }
        this.x = 100;
        this.y = -10;
    }
};

Key.prototype.reset = function() {
    this.x = this.kx;
    this.y = this.ky;
};

//Star class
var Star = function(sx,sy) {
    this.x = sx;
    this.y = sy;
    this.sprite = 'images/Star.png';
    this.sx = sx;
    this.sy = sy;
};

Star.prototype.update = function() {
    this.getStar(player.x, player.y, this.x, this.y);
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Code logic from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Star.prototype.getStar = function(xp,yp,xs,ys) {
    if (xp < xs + 20 && xp + 20 > xs && yp < ys + 20 && 20 + yp > ys) {
        if (ys != -10) {
            score += 150;
            document.querySelector("#score").innerText = "Score: " + score;
        }
        this.x = 125;
        this.y = -10;
    }
};

Star.prototype.reset = function() {
    this.x = this.sx;
    this.y = this.sy;
};

// Now instantiate your objects.
let e1 = new Enemy(-150, 60, 200);
let e2 = new Enemy(-300, 60, 180);
let e3 = new Enemy(-150, 140, 180);
let e4 = new Enemy(-150, 230, 200);
let e5 = new Enemy(-200, 140, 180);
let e6 = new Enemy(-180, 230, 150);
let e7 = new Enemy(-250, 140, 180);

// Place all enemy objects in an array called allEnemies
let allEnemies = [e1, e2, e3, e4, e5, e6, e7];

// Place the player object in a variable called player
let player = new Player(200,425);

//New key object
let key = new Key((Math.floor(Math.random() * 400)), (Math.floor(Math.random() * 200) + 50));

//New star object
let star = new Star((Math.floor(Math.random() * 400)), (Math.floor(Math.random() * 200) + 50));

//Function for Winner Message
var winText = function() {
    const p = document.createElement("p");
    const text = document.createTextNode(`Congratulations!!! You WIN!!! Your Score is ${score}`);
    p.appendChild(text);
    document.body.appendChild(p);
};

//Restart Game function for Restart Game button
const restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame);

function restartGame() {
    window.location.reload();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Score
// const s = document.createElement("span");
// document.body.appendChild(s);
// const a = [...document.getElementsByTagName("span")];
// a[0].setAttribute("id", "score");
// document.querySelector("#score").innerText = "Score: " + score;
// console.log(score);

