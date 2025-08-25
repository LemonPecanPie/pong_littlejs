/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

///////////////////////////////////////////////////////////////////////////////

const levelSize = vec2(38, 20);
let ball;

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
}

class Wall extends EngineObject {
    constructor(pos, size) {
        super(pos, size);
        this.setCollision();
        this.mass = 0;
        this.color = new Color(0,0,0,0);
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
    if (!ball || ball.pos.y < -1) {
        if (ball)
            ball.destroy();

        ball = new Ball(cameraPos);
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
    // drawTextScreen('Hello World!', mainCanvasSize.scale(.5), 80);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);