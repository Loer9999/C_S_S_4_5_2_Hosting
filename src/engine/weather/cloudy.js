"use strict";

import Weather from "./weather.js";
import TextureRenderable from "../renderables/texture_renderable_main.js";

class Cloudy extends Weather {
    //Where clouds is an array of image file paths
    //mCamera is the camera used to display this weather
    constructor(clouds, camera) {
        super(camera);

        //Darkens the screen slightly
        this.setColor([0, 0.25, 0.8, 1]);
        this.setMaxBrightness(2);

        //File Paths for clouds in an Array
        this.cloudArray = clouds;

        //Renderables
        this.mClouds = [];

        //Speed of clouds in units/second
        this.cloudSpeed = 5.0 / 60;

        //Number of clouds per each spawning event
        this.cloudDensity = 3;

        //Time between each cloud event;
        this.cloudInterval = 1.5 * this.mCamera.getWCWidth() / this.cloudSpeed;

        //Internal duration tracker
        this.cloudTime = 0;

        //Cloud scale size
        this.cloudScale = 100;

        //Whether the clouds should be drawn or not
        this.isActive = true;
    }

    //Setter for cloud density
    //Input should be greater than 0
    setCloudDensity(input) {
        if(input > 0) {
            this.cloudDensity = input;
        }
    }

    //Getter for cloud density
    getCloudDensity() {
        return this.cloudDensity;
    }

    //Setter for cloud speed
    //Input is in units/sec/frames
    setCloudSpeed(input) {
        this.cloudSpeed = input;
    }

    //Getter for cloud speed
    getCloudSpeed() {
        return this.cloudSpeed;
    }

    //Setter for cloud interval
    //Input should be greater than 0
    setCloudInterval(input) {
        if(input > 0) {
            this.cloudInterval = input;
        }   
    }

    //Getter cloud interval
    getCloudInterval() {
        return this.cloudInterval;
    }

    //Setter for cloud active
    setCloudyActive(input) {
        this.isActive = input;
    }

    //Getter for cloud active
    getCloudyActive() {
        return this.isActive;
    }

    draw() {
        if(!this.isActive) {
            return;
        }

        for(let i = 0; i < this.mClouds.length; i++) {
            this.mClouds[i].draw(this.mCamera);
        }
    }

    update() {
        if(!this.isActive) {
            return;
        }

        super.update();

        //Cloud Spawning
        let height = this.mCamera.getWCHeight();
        let width = this.mCamera.getWCWidth();
        let wc = this.mCamera.getWCCenter();

        if (this.cloudTime == 0) {
            for(let i = 0; i < this.cloudDensity; i++) {
                //Picks a random cloud out of the ones available
                let index = Math.floor(Math.random() * this.cloudArray.length);
                if (index == this.cloudArray.length) {
                    index -= 1;
                }

                this.mClouds.push(new TextureRenderable(this.cloudArray[index]));

                this.mClouds[this.mClouds.length - 1].getXform().setSize((Math.random() + 0.5) * this.cloudScale,
                 (Math.random() + 0.5) * this.cloudScale);

                 if (this.cloudSpeed >= 0) {
                    //If speed is positive, create them on the left side
                    this.mClouds[this.mClouds.length - 1].getXform().setPosition(wc[0] - (Math.random() / 2 + 1) * width,
                         wc[1] + ((Math.random() - 0.5) * height));
    
                } else {
                    //If speed is negative, create them on the right
                    this.mClouds[this.mClouds.length - 1].getXform().setPosition(wc[0] + (Math.random() / 2 + 1) * width,
                         wc[1] + ((Math.random() - 0.5) * height));
                }
            }
            
            
            this.cloudTime++;

        } else if(this.cloudTime >= this.cloudInterval) {
            this.cloudTime = 0;
        } else {
            // Cloud movement and deletion
            for (let l = 0; l < this.mClouds.length; l++) {
                let xform = this.mClouds[l].getXform();
                xform.incXPosBy(this.cloudSpeed);
                
                if (this.cloudSpeed >= 0 && (xform.getXPos() > wc[0] + width)) {
                    this.mClouds.splice(l, 1);
                    l--;
                } else if (this.cloudSpeed < 0 && (xform.getXPos() < wc[0] - width)) {
                    this.mClouds.splice(l, 1);
                    l--;
                }
            }
            this.cloudTime++;
        }
    }
}

export default Cloudy;