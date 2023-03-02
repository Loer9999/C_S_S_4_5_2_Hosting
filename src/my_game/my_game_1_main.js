/*
 * File: my_game_main_1.js 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

// user stuff

class MyGame1 extends engine.Scene {
    constructor() {
        super();
        this.kBg = "assets/TX Tileset Grass.png";
        this.kProp = "assets/TX Props.png";
        this.sunshine = "assets/sunshineTwo.png";
        this.cloudOne = "assets/cloudOne.png";
        this.cloudTwo = "assets/cloudTwo.png";

        // The camera to view the scene
        this.mCamera = null;

        // The background
        this.mBg = null;
        this.mStatue = null;
        this.mShrine = null;

        // The weather
        this.mSunny = null;
        this.mCloudy = null;
        this.mCurrentWeather = null;
    }

    load() {
        engine.texture.load(this.kBg);
        engine.texture.load(this.kProp);
        engine.texture.load(this.sunshine);
        engine.texture.load(this.cloudOne);
        engine.texture.load(this.cloudTwo);
    }

    unload() {
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kProp);
        engine.texture.unload(this.sunshine);
        engine.texture.unload(this.cloudOne);
        engine.texture.unload(this.cloudTwo);
    }

    init() {
        // Step A: set up the camera
        this.mCamera = new engine.Camera(
            vec2.fromValues(100, 75), // position of the camera
            200,                       // width of camera
            [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray


        // the background
        let bgR = new engine.LightRenderable(this.kBg);
        bgR.getXform().setSize(200, 150);
        bgR.getXform().setPosition(100, 75);
        bgR.setColor([1, 1, 1, 0]);
        bgR.setElementPixelPositions(0, 128, 128, 256);
        this.mBg = new engine.GameObject(bgR);

        // the props
        let statue = new engine.LightRenderable(this.kProp);
        statue.getXform().setSize(30, 40);
        statue.getXform().setPosition(100, 100);
        statue.setColor([1, 1, 1, 0]);
        statue.setElementPixelPositions(415, 512, 412, 512);
        this.mStatue = new engine.GameObject(statue);

        let shrine = new engine.LightRenderable(this.kProp);
        shrine.getXform().setSize(40, 30);
        shrine.getXform().setPosition(100, 70);
        shrine.setColor([1, 1, 1, 0]);
        shrine.setElementPixelPositions(346, 458, 163, 252);
        this.mShrine = new engine.GameObject(shrine);

        // the weather
        this.mSunny = new engine.Sunny(this.sunshine, this.mCamera);
        this.mSunny.getTime().setInGameHour(5);

        this.clouds = [this.cloudOne, this.cloudTwo];
        this.mCloudy = new engine.Cloudy(this.clouds, this.mCamera);
        this.mCloudy.getTime().setInGameHour(5);

        this.mCurrentWeather = this.mSunny;
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Set up the camera and draw
        this.mCamera.setViewAndCameraMatrix();

        // Step B: Now draws each primitive
        this.mBg.draw(this.mCamera);
        this.mStatue.draw(this.mCamera);
        this.mShrine.draw(this.mCamera);

        this.mCurrentWeather.draw();
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        this.mCamera.update();  // to ensure proper interpolated movement effects
        this.mCurrentWeather.update();

        // How to make the transition smooth? Use the blending with the shader?
        if (engine.input.isKeyClicked(engine.input.keys.Space)) {
            this.mCurrentWeather = this.mCloudy;
        }
    }
}

export default MyGame1;