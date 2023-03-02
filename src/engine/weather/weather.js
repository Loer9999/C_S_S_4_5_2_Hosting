"use strict";

import * as defaultResources from "../resources/default_resources.js";
import Time from "./time.js";

class Weather {
    constructor(camera) {
        this.mTime = new Time();
        this.mCamera = camera;
        this.mAmbientColor = defaultResources.getGlobalAmbientColor();
        this.mMaxIntensity = 0.9;
        this.mMinIntensity = 0.9;
    }

    getTime() {
        return this.mTime;
    }

    setColor(color) {
        this.mAmbientColor = color;
    }

    getColor() {
        return this.mAmbientColor;
    }

    setMaxBrightness(intensity) {
        this.mMaxIntensity = intensity;
    }

    getMaxBrightness() {
        return this.mMaxIntensity;
    }

    update() {
        this.mTime.update();

        let deltaAmbient = 0.0;
        let currentIntensity = defaultResources.getGlobalAmbientIntensity();
        
        if (currentIntensity > this.mMaxIntensity) {
            deltaAmbient = 2 / (this.mTime.getInGameHour() * 60);
            defaultResources.setGlobalAmbientIntensity(currentIntensity - deltaAmbient);
        } else {
            // Change the intensity during a 2-hour interval for day and night transitions.
            deltaAmbient = (this.mMaxIntensity - this.mMinIntensity) / (this.mTime.getInGameHour() * 120);

            // Transition from night to day.
            if (this.mTime.getCurrentTime() >= 6 && currentIntensity < this.mMaxIntensity) {
                defaultResources.setGlobalAmbientIntensity(currentIntensity + deltaAmbient);
            }
            // Transition from day to night.
            if (this.mTime.getCurrentTime() >= 18 && currentIntensity > this.mMinIntensity) {
                defaultResources.setGlobalAmbientIntensity(currentIntensity - deltaAmbient);
            }
        }
    }

    // Methods to be overwritten by the subclasses include the following ones.
    draw() {

    }
}

export default Weather;