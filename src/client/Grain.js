var Grain = function(){
    this.viewWidth,
    this.viewHeight,
    this.ctx;
    //config
    this.patternSize = 64,
    this.patternScaleX = 3,
    this.patternScaleY = 1,
    this.patternRefreshInterval = 4,
    this.patternAlpha = 7; // int between 0 and 255,
    //memoryvars
    this.patternPixelDataLength = this.patternSize * this.patternSize * 4,
    this.patternCanvas,
    this.patternCtx,
    this.patternData,
    this.frame = 0;



    // create a canvas which will render the grain
    this.initCanvas = (canvas) => {
        this.viewWidth = canvas.width = canvas.clientWidth;
        this.viewHeight = canvas.height = canvas.clientHeight;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(this.patternScaleX, this.patternScaleY);
    }

    // create a canvas which will be used as a pattern
    this.initGrain=() =>{
        this.patternCanvas = document.createElement('canvas');
        this.patternCanvas.width = this.patternSize;
        this.patternCanvas.height = this.patternSize;
        this.patternCtx = this.patternCanvas.getContext('2d');
        this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
    }

    // put a random shade of gray into every pixel of the pattern
    this.update=() =>{
        var value;

        for (var i = 0; i < this.patternPixelDataLength; i += 4) {
            value = (Math.random() * 255) | 0;

            this.patternData.data[i    ] = value;
            this.patternData.data[i + 1] = value;
            this.patternData.data[i + 2] = value;
            this.patternData.data[i + 3] = this.patternAlpha;
        }

        this.patternCtx.putImageData(this.patternData, 0, 0);
    }

    // fill the canvas using the pattern
    this.draw=()=>{
        this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

        this.ctx.fillStyle = this.ctx.createPattern(this.patternCanvas, 'repeat');
        this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
    }

    this.loop=()=>{
        if (++this.frame % this.patternRefreshInterval === 0) {
            this.update();
            this.draw();
        }

        requestAnimationFrame(this.loop);
    }
}
export default Grain