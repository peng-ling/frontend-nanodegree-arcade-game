allEnemies = [];

var i = 99;

var enemyYPos = {
  1: -20,
  2: 60,
  3: 140,
  4: 220,
  5: 300
};

Number.prototype.between = function(first, last) {
  return (first < last ? this >= first && this <= last : this >= last && this <= first);
};

var audio = new Audio('sounds/beep-07.wav');



// Enemies our player must avoid
var Enemy = function() {

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.y = enemyYPos[Math.floor(Math.random() * 5 + 1)];
  this.x = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x++ * dt;
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.out = function() {
  if (this.x > 606) {
    return true;
    //audio.play();
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


//allEnemies.push(new Enemy(enemyYPos[2], 0));
//allEnemies.push(new Enemy(enemyYPos[3], 0));
// Place the player object in a variable called player

var player = function() {

  this.sprite = 'images/char-boy.png';
  this.x = 300;
  this.y = 400;
  this.smashup = function() {
    if (allEnemies.length > 0) {
      for (var enemy in allEnemies) {
        if (this.x.between(allEnemies[enemy].x - 80, allEnemies[enemy].x + 80) && this.y.between(allEnemies[enemy].y - 80, allEnemies[enemy].y + 80)) {
          return true;
        }
      }
    }
    return false;
  };
};

player.prototype.update = function(dt) {


  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(move) {
  switch (move) {
    case 'left':
      this.x = this.x - 10;
      break;
    case 'up':
      this.y = this.y - 10;
      break;
    case 'right':
      this.x = this.x + 10;
      break;
    case 'down':
      this.y = this.y + 10;
  }
};

/*player.prototype.smashup = function() {
for (enemy in allEnemies) {
 (this.x.between(enemy.x - 10, enemy.x + 10) && this.y.between(enemy.y - 10, enemy.y + 10));
};
}*/

player = new player();

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
