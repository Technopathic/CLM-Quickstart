/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import clm from 'clmtrackr';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  constructor()
  {
    super();
    this.state = {
      vid:"",
      vidWidth:0,
      vidHeight:0,
      overlay:"",
      overlayCC:"",
      trackingStarted:false,
      startValue:"Waiting",
      startDisabled:true
    }
  }

  componentWillMount()
  {
    this.ctrack = new clm.tracker();
    this.ctrack.init();
  }

  componentDidMount()
  {
    let vid = document.getElementById('videoel');
    let overlay = document.getElementById('overlay');
    let overlayCC = overlay.getContext('2d');

    this.setState({
      vid:vid
    }, () => {
      this.setState({
        vidWidth:vid.width,
        vidHeight:vid.height,
        overlay:overlay,
        overlayCC:overlayCC
      })
    })

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
    // check for camerasupport
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({video : true}).then(this.gumSuccess).catch(this.gumFail);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({video : true}, this.gumSuccess, this.gumFail);
    } else {
      alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
    }
    vid.addEventListener('canplay', this.enablestart, false);
  }

  enablestart = () => {
    this.setState({
      startValue:"Start",
      startDisabled:false
    })
  }

  adjustVideoProportions = () => {
    // resize overlay and video if proportions are different
    // keep same height, just change width

    let vid = this.state.vid;
    let overlay = this.state.overlay;

    let proportion = vid.videoWidth/vid.videoHeight;
    let vidWidth = Math.round(this.state.vidHeight * proportion);

    vid.width = vidWidth;
    overlay.width = vidWidth;

    this.setState({
      vid:vid,
      overlay:overlay
    })
  }

  gumSuccess = ( stream ) => {
    // add camera stream if getUserMedia succeeded
    let vid = this.state.vid;

    if ("srcObject" in vid) {
      vid.srcObject = stream;
    } else {
      vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = () => {
      this.adjustVideoProportions();
      vid.play();
    }
    vid.onresize = () => {
      this.adjustVideoProportions();
      if (this.state.trackingStarted) {
        this.ctrack.stop();
        this.ctrack.reset();
        this.ctrack.start(vid);
      }
    }
  }

  gumFail = () => {
    alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
  }

  startVideo = () => {
    // start video
    this.state.vid.play();
    // start tracking
    this.ctrack.start(this.state.vid);
    this.setState({
      trackinStarted:true
    })
    // start loop to draw face
    this.drawLoop();
  }

  drawLoop = () => {
    requestAnimFrame(this.drawLoop);
    this.state.overlayCC.clearRect(0, 0, this.state.vidWidth, this.state.vidHeight);
    if (this.ctrack.getCurrentPosition()) {
      this.ctrack.draw(this.state.overlay);
    }
    let cp = this.ctrack.getCurrentParameters();
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
        <div id="container">
				  <video id="videoel" width="400" height="300" preload="auto" loop playsInline autoPlay></video>
          <canvas id="overlay" width="400" height="300"></canvas>
          
          <input className="btn" type="button" value={this.state.startValue} disabled={this.state.startDisabled} onClick={this.startVideo} id="startbutton"></input>
			</div>
      </div>
    );
  }
}

// helper functions

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           return window.setTimeout(callback, 1000/60);
         };
})();

/**
 * Provides cancelRequestAnimationFrame in a cross browser way.
 */
window.cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame ||
         window.webkitCancelRequestAnimationFrame ||
         window.mozCancelRequestAnimationFrame ||
         window.oCancelRequestAnimationFrame ||
         window.msCancelRequestAnimationFrame ||
         window.clearTimeout;
})();
