/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

///////////////////////////////////////////////////////////////////////////////

const levelSize = vec2(38, 20);
let ball;
let score = 0;
const sound_bounce = new Sound([, , 1e3, , .03, .02, 1, 2, , , 940, .03, , , , , .2, .6, , .06], 0);
const sound_break = new Sound([, , 90, , .01, .03, 4, , , , , , , 9, 50, .2, , .2, .01], 0);
const sound_start = new Sound([, 0, 500, , .04, .3, 1, 2, , , 570, .02, .02, , , , .04]);

class Paddle extends EngineObject {

    constructor() {
        super(vec2(0, 1), vec2(6, .5));
        this.setCollision();
        this.mass = 0;
    }
    update() {
        this.pos.x = mousePos.x;
        // clamp paddle to level size
        this.pos.x = clamp(this.pos.x, this.size.x / 2, levelSize.x - this.size.x / 2);
    }
}

class Ball extends EngineObject {
    constructor(pos) {
        super(pos, vec2(.5));

        this.velocity = vec2(-.1, -.1);
        this.setCollision();
        this.elasticity = 1;
    }

    collideWithObject(o) {
        sound_bounce.play();
        return true;
    }
}

class Wall extends EngineObject {
    constructor(pos, size) {
        super(pos, size);
        this.setCollision();
        this.mass = 0;
        this.color = new Color(0, 0, 0, 0);
    }
}

class Brick extends EngineObject {
    constructor(pos, size) {
        super(pos, size);
        this.setCollision();
        this.mass = 0;
    }

    collideWithObject(o) {
        this.destroy();
        ++score;
        sound_break.play();
        return true;
    }
}

function gameInit() {
    // called once after the engine starts up
    // setup the game
    for (let x = 2; x <= levelSize.x - 2; x += 2)
        for (let y = 12; y <= levelSize.y - 2; y += 1) {
            const brick = new Brick(vec2(x, y), vec2(2, 1));
            brick.color = randColor();

        }

    setCameraPos(levelSize.scale(.5));
    setCanvasFixedSize(vec2(1280, 720));

    new Paddle;
    // new Ball(cameraPos);


    new Wall(vec2(-.5, levelSize.y / 2), vec2(1, 100));
    new Wall(vec2(levelSize.x + .5, levelSize.y / 2), vec2(1, 100));
    new Wall(vec2(levelSize.x / 2, levelSize.y + .5), vec2(100, 1));
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
    // called every frame at 60 frames per second
    // handle input and update the game state
    if (ball && ball.pos.y < -1) // if ball is below level
    {
        // destroy old ball
        ball.destroy();
        ball = 0;
    }
    if (!ball && mouseWasPressed(0)) // if there is no ball and left mouse is pressed
    {
        ball = new Ball(cameraPos); // create a ball
        sound_start.play(); // play start sound
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
    // called after physics and objects are updated
    // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
    // called before objects are rendered
    // draw any background effects that appear behind objects
    drawRect(cameraPos, vec2(100), new Color(.5, .5, .5));
    drawRect(cameraPos, levelSize, new Color(.1, .1, .1));
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    drawTextScreen('Score ' + score, vec2(mainCanvasSize.x / 2, 70), 50);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);