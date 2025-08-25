/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

///////////////////////////////////////////////////////////////////////////////

const levelSize = vec2(20, 20);

class Paddle extends EngineObject {

    constructor() {
        super(vec2(0, 1), vec2(6, .5));
        this.setCollision();
        this.mass = 0;
    }
    update() {
        // clamp paddle to level size
        this.pos.x = clamp(this.pos.x, this.size.x / 2, levelSize.x - this.size.x / 2);
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

function gameInit() {
    // called once after the engine starts up
    // setup the game
    for (let x = 2; x <= levelSize.x - 2; x += 2)
        for (let y = 12; y <= levelSize.y - 2; y += 1) {
            const brick = new EngineObject(vec2(x, y));
            brick.color = randColor();

        }

    setCameraPos(levelSize.scale(.5));
    setCanvasFixedSize(vec2(1280, 720));

    new Paddle;
    new Ball(cameraPos);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
    // called every frame at 60 frames per second
    // handle input and update the game state
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