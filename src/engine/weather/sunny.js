"use strict";

import Weather from "./weather.js";
import TextureRenderable from "../renderables/texture_renderable_main.js";

class Sunny extends Weather {
    // The developer should provide the file path to the image of the sunshine and
    // the camera in which the weather should be applied.
    constructor(imagePath, camera) {
        super(camera);

        this.kSunshine = imagePath;
        this.mSunshine = new TextureRenderable(this.kSunshine);
        let center = this.mCamera.getWCCenter();
        this.mSunshine.getXform().setPosition(center[0], center[1]);
        this.mSunshine.getXform().setSize(this.mCamera.getWCWidth(), this.mCamera.getWCHeight());

        this.setColor([1, 1, 0.7, 0.5]);
        this.setMaxBrightness(4);
    }

    draw() {
        let currentTime = this.mTime.getCurrentTime();
        if (currentTime >= 5 && currentTime <= 19) {
            this.mSunshine.draw(this.mCamera);
        }
    }

    update() {
        super.update();
    }
}

export default Sunny;