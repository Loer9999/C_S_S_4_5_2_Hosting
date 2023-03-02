"use strict";

class Time {
    constructor() {
        // The current time is initially 6 a.m.
        this.mCurrentTime = 6;

        // The length of 1 hour in game (in seconds).
        this.mOneHourInGame = 60;

        // 1 second is 60 frames.
        this.mFramesCounter = this.mOneHourInGame * 60;

        this.mPaused = false;
    }

    setCurrentTime(time) {
        this.mCurrentTime = time;
        this.mFramesCounter = this.mOneHourInGame * 60;
    }

    getCurrentTime() {
        return this.mCurrentTime;
    }

    setInGameHour(seconds) {
        this.mOneHourInGame = seconds;
        this.mFramesCounter = this.mOneHourInGame * 60;
    }

    getInGameHour() {
        return this.mOneHourInGame;
    }

    setIfTimePaused(bool) {
        this.mPaused = bool;
    }

    getIsTimePaused() {
        return this.mPaused;
    }

    update() {
        if (!this.mPaused) {
            this.mFramesCounter -= 1;

            if (this.mFramesCounter <= 0) {
                this.mFramesCounter = this.mOneHourInGame * 60;
                this.mCurrentTime += 1;
            }
            if (this.mCurrentTime >= 24) {
                this.mCurrentTime = 0;
            }
        }
    }
}

export default Time;