import React, { Component } from 'react';
// import cx from 'classnames';

import './customPlayer.css';
// import { loadavg } from 'os';
// import { createRequireFromPath } from 'module';
import Axios from 'axios';

class CustomPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSec: 0,
      addedSubtitles: false,
      inDB: false,
      idleTime: 0,
    };
    this.myVideo = React.createRef();
    this.escFunction = this.escFunction.bind(this);
    this.toggleShowControls = this.toggleShowControls.bind(this);
    this.togglePlayOnSpace = this.togglePlayOnSpace.bind(this);
  }

  componentDidMount() {
    this.myVideo.current.controls = false;
    document.addEventListener('fullscreenchange', this.escFunction, false);
    document.addEventListener('mozfullscreenchange', this.escFunction, false);
    document.addEventListener('MSFullscreenChange', this.escFunction, false);
    document.addEventListener('webkitfullscreenchange', this.escFunction, false);
    document.addEventListener('mousedown', this.toggleShowControls, false);
    document.addEventListener('mousemove', this.toggleShowControls, false);
    document.addEventListener('keypress', this.toggleShowControls, false);
    document.addEventListener('scroll', this.toggleShowControls, false);
    document.addEventListener('touchstart', this.toggleShowControls, false); 
    document.addEventListener('keypress', this.togglePlayOnSpace, false);
  }

  componentDidUpdate = () => {
    if (Array.isArray(this.props.trackList) && this.props.trackList.length > 0 && this.state.addedSubtitles === false) {
      this.myVideo.current.crossOrigin = 'anonymous';
      console.log('updated: ' + this.state.addedSubtitles)
      this.props.trackList.forEach(element => this.myVideo.current.appendChild(element));
      this.setState({ addedSubtitles: true });
    }
    if (this.props.streamStatus === 'play') this.toggleShowControls();
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.escFunction, false);
    document.removeEventListener('mozfullscreenchange', this.escFunction, false);
    document.removeEventListener('MSFullscreenChange', this.escFunction, false);
    document.removeEventListener('webkitfullscreenchange', this.escFunction, false);
    document.removeEventListener('mousedown', this.toggleShowControls, false);
    document.removeEventListener('mousemove', this.toggleShowControls, false);
    document.removeEventListener('keypress', this.toggleShowControls, false);
    document.removeEventListener('scroll', this.toggleShowControls, false);
    document.removeEventListener('touchstart', this.toggleShowControls, false);
    document.removeEventListener('keypress', this.togglePlayOnSpace, false);
  }
    
  toggleShowControls = () => {
    if (this.props.streamStatus === 'play') {
      let controls = document.getElementById('controls');
      if (controls.style.display === 'none') controls.style.display = 'flex';
      clearTimeout(this.state.idleTime);
      this.state.idleTime = setTimeout(() => {
        console.log('HIDE!');
        controls.style.display = 'none';
      }, 5000);
    }
  }

  escFunction = () => {
      if (document.fullScreen === false 
          || document.webkitIsFullScreen === false 
          || document.mozFullScreen === false 
          || document.msFullscreenElement === false) {
        let fullscreen = document.getElementById('fullscreen');
        let controls = document.getElementById('controls');
        fullscreen.classList.remove('fa-compress');
        fullscreen.classList.add('fa-expand');
        controls.style.bottom = '';
        controls.style.width = '500px';
        document.getElementById('buffered').style.width = '500px';
        document.getElementById('progress').style.width = '500px';
        document.getElementById('progressBar').style.width = '500px';
        this.myVideo.current.style.width = '533px';
        this.myVideo.current.style.height = '300px';
        this.myVideo.current.style.transition = '1s opacity';
      }
  }

  togglePlayOnSpace = (e) => {
    if (e.keyCode === 32 || e.code === 'Space') {
      console.log(e.keyCode + ' = ' + e.code);
      this.togglePlayPause(e);
    }
  }

  togglePlayPause = (e) => {
    e.preventDefault();
    let playpause = document.getElementById("playpause");
    if (this.myVideo.current.paused || this.myVideo.current.ended) {
      playpause.title = "pause";
      playpause.classList.remove("fa-play");
      playpause.classList.add("fa-pause");
      this.myVideo.current.play();
    }
    else {
      playpause.title = "play";
      playpause.classList.remove("fa-pause");
      playpause.classList.add("fa-play");
      this.myVideo.current.pause();
    }
  }

  setVolume = (e) => {
    e.preventDefault();
    var volume = document.getElementById("volume");
    this.myVideo.current.volume = volume.value;
  }

  toggleMute = (e) => {
    e.preventDefault();
    this.myVideo.current.muted = !this.myVideo.current.muted;
    let muteIcon = document.getElementById('mute-unmute');
    if (this.myVideo.current.muted === true) {
      muteIcon.classList.remove('fa-volume-up');
      muteIcon.classList.add("fa-volume-mute");
    } else if (this.myVideo.current.muted === false) {
      muteIcon.classList.remove("fa-volume-mute");
      muteIcon.classList.add('fa-volume-up');
    }
  }

  toggleFullScreen = (e) => {
    e.preventDefault();
    let fullscreen = document.getElementById('fullscreen');
    let controls = document.getElementById('controls');
    let container = document.getElementById('player-wrapper');

    /* Exit full screen */
    if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
      console.log('EXIT FULL SCREEN');
      fullscreen.classList.remove('fa-compress');
      fullscreen.classList.add('fa-expand');
      controls.style.bottom = '';
      controls.style.width = '500px';
      document.getElementById('buffered').style.width = '500px';
      document.getElementById('progress').style.width = '500px';
      document.getElementById('progressBar').style.width = '500px';
      this.myVideo.current.style.width = '533px';
      this.myVideo.current.style.height = '300px';
      this.myVideo.current.style.transition = '1s opacity';
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (this.myVideo.current.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (this.myVideo.current.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (this.myVideo.current.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    /* Go full screen */
    } else {
      console.log('FULL SCREEN');
      fullscreen.classList.remove('fa-expand');
      fullscreen.classList.add('fa-compress');
      controls.style.bottom = '30px';
      controls.style.width = (window.innerWidth - 100) + 'px';
      document.getElementById('buffered').style.width = (window.innerWidth - 100) + 'px';
      document.getElementById('progress').style.width = (window.innerWidth - 100) + 'px';
      document.getElementById('progressBar').style.width = (window.innerWidth - 100) + 'px';
      this.myVideo.current.style.width = '100%';
      this.myVideo.current.style.height = '100%';
      this.myVideo.current.style.transition = '1s opacity';
      if (this.myVideo.current.requestFullscreen) {
        container.requestFullscreen();
      } else if (this.myVideo.current.mozRequestFullScreen) { /* Firefox */
        container.mozRequestFullScreen();
      } else if (this.myVideo.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        container.webkitRequestFullscreen();
      } else if (this.myVideo.current.msRequestFullscreen) { /* IE/Edge */
        container.msRequestFullscreen();
      }
    }
  }

  toReadbleTime = (time) => {
    var sec_num = parseInt(time, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
  }

  showSubtitles = (e) => {
    e.preventDefault();
    let cc = document.getElementById('subtitles-background');
    cc.style.display = cc.style.display === 'inline' ? 'none' : 'inline';
  }


  toggleSubtitles = (e) => {
    e.preventDefault();
    console.log('toggleSubtitles() triggered');
    let id = parseInt(e.target.id, 10);
    for (let i = 0; i < this.myVideo.current.textTracks.length; i++) {
      const elem = this.myVideo.current.textTracks[i];
      console.log(elem);
      if (id === i) {
        if (elem.mode === 'showing') {
          console.log('remobe subs');
          elem.mode = 'hidden';
          e.target.removeChild(e.target.getElementsByTagName('i')[0]);
          e.target.classList.remove('selected');
          e.target.classList.add('not-selected');
        } else {
          console.log('add subs');
          elem.mode = 'showing';
          let cues = elem.cues;
          // for (var key in cues.length) {
          //   console.log("key -> " + key);
          //   if (cues.hasOwnProperty(key)) {
          //       console.log(key + " -> " + cues[key]);
          //   }
          // }
          console.log(cues);
          // cues.line = -4;
          // cues.align = 'center';
          let check = document.createElement('i');
          check.className = "fas fa-check";
          check.id = "checkIcon";
          e.target.appendChild(check);
          e.target.classList.remove('not-selected');
          e.target.classList.add('selected');
        }
      } else {
        elem.mode = 'hidden';
      }
    }
    console.log(this.myVideo.current.textTracks[id]);
  }

  toggleTimePlaying = e => {
    e.preventDefault();
    console.log('toggleTimePlaying() tiggered');
    // console.log('offsetX: ' + e.nativeEvent.offsetX);
    // console.log('offsetWidth: ' + document.getElementById('progressBar').offsetWidth);
    // console.log('decalage: ' + (e.nativeEvent.offsetX * 1.25));
    let newTime = this.myVideo.current.duration * ((e.nativeEvent.offsetX )/ document.getElementById('progressBar').offsetWidth);
    console.log(`new time requested: ${newTime}`);
    console.log('currentTime = ' + this.myVideo.current.currentTime + '/' + this.myVideo.current.duration);

    /* Skip video to new time. */
    this.myVideo.current.currentTime = newTime;
  }

  render() {
    let id = this.props.url.split('watch?v=');
    const myUrl = 'https://youtube.com/embed/' + id[1] + '?showinfo=0&enablejsapi=1&origin:http://localhost:3000/';

    return (
      <div className="player-wrapper" id='player-wrapper'>
        {this.props.streamStatus === 'sleep' ?
          <iframe id='player' src={myUrl} height='300px' width='533px' ></iframe>
          : null
        }
        {this.props.streamStatus === 'load' ?
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          : null
        }
        <video
          ref={this.myVideo}
          id="myVideo"
          src={this.props.url}
          type="video/mp4"
          autoPlay
          controls
          disablePictureInPicture
          height='300px'
          width='533px'
          controlsList='nodownload'
          onPlaying={() => {
            console.log('playing: video\'s ready to be launched after beign paused or interrupted for loading of datas');
          }}
          onPlay={() => {
            this.setState({ currentSec: this.myVideo.current.currentTime });
            console.log('play has been clicked');
            let playpause = document.getElementById("playpause");
            playpause.title = "pause";
            playpause.classList.remove("fa-play");
            playpause.classList.add("fa-pause");
          }}
          onSeeking={async (e) => {
            //await setTimeout(() => {}, 10000)
            //this.myRef.current.pause();
            //this.myVideo.current.textTracks[0].mode = 'showing'
            if (this.myVideo.current.currentTime !== this.state.currentSec) {
              console.log('currentsec = ' + this.state.currentSec);
              const checkReady = `http://localhost:3000/Video/check/${this.props.hash}?seeking=${this.myVideo.current.currentTime}&rate=${this.myVideo.current.currentTime / this.myVideo.current.duration}`;
              Axios.get(checkReady)
                .then((result) => {
                  if (result.data.ready === false) {
                    this.myVideo.current.currentTime = this.state.currentSec;
                    this.myVideo.current.pause();
                  }
                })
            }
          }}
          onSeeked={(sec) => {
            console.log('seeked: user has requested portion ' + sec.target.currentTime + ' of the video which is now ready');
          }}
          onPause={(e) => {
            console.log('paused');
            let playpause = document.getElementById("playpause");
            playpause.title = "play";
            playpause.classList.remove("fa-pause");
            playpause.classList.add("fa-play");
          }}
          // onCanPlay={() => {
          //   console.log('can play but everything\'s not loaded yet');
          // }}
          // onCanPlayThrough={() => {
          //   console.log('browser estimates it can play all the way through without stoping for content buffering');
          // }}
          onEmptied={() => {
            this.myVideo.current.currentTime = this.state.currentSec;
            // console.log('emptied: media previously downloaded, now invoking load()');
          }}
          onEnded={() => {
            console.log('end of media reached');
            this.myVideo.current.pause();
          }}
          onError={(e) => {
            console.log(e);
          }}
          onLoadedMetadata={() => console.log('metadata loaded')}
          onProgress={() => {
            this.setState({ currentSec: this.myVideo.current.currentTime });
            console.log('played: ' + this.myVideo.current.currentTime + '/' + this.myVideo.current.duration + ' sec');
            // console.log('seekable end: ');
            // console.log(myVideo.seekable.end(myVideo.seekable.length - 1));
            // console.log('played: ' + this.myVideo.current.currentTime + '/' + this.myVideo.current.duration + ' sec');
            if (this.myVideo.current.buffered.length && !this.state.inDB) {
              // console.log('LOADED:')
              for (let elem = 0; elem < this.myVideo.current.buffered.length; elem++) {
                // console.log('piste n°' + elem + ': ' + this.myVideo.current.buffered.start(elem) + '/' + this.myVideo.current.buffered.end(elem) + ' sec');
                if (this.myVideo.current.buffered.start(this.myVideo.current.buffered.length - 1 - elem) < this.myVideo.current.currentTime && document.getElementById("buffered-amount")) {
                  document.getElementById("buffered-amount").style.width = (this.myVideo.current.buffered.end(this.myVideo.current.buffered.length - 1 - elem) / this.myVideo.current.duration) * 100 + "%";
                  console.log(`currently buffered: ${(this.myVideo.current.buffered.end(this.myVideo.current.buffered.length - 1 - elem) / this.myVideo.current.duration) * 100} %`);
                  break;
                }
              }
            }
          }}
          onStalled={() => console.log('ERROR: trying to fetch media data but is unexpectedly not forthcoming')}
          // onSuspend={() => console.log('the loading of the datas has been suspended')}
          // onWaiting={() => {
          //   console.log('Waiting.... video has interrupted due to a temporary lack of datas');
          // }}
          onTimeUpdate={(e) => {
            // console.log('time update: ' + this.myVideo.current.currentTime);
            let duration = this.myVideo.current.duration;
            if (duration > 0 && this.myVideo.current.currentTime <= duration && document.getElementById('progress-amount')) {
              // console.log(`duration: ${duration}`);
              document.getElementById('progress-amount').style.width = ((this.myVideo.current.currentTime / duration) * 100) + "%";
              document.getElementById('timeplayed').innerHTML = this.toReadbleTime(this.myVideo.current.currentTime);
            }
          }}
        >
        </video>
        {this.props.streamStatus === 'play' ?
          <div id="controls">
            <div className="allControls">
              <div className="left-controls">
                <i className="fas fa-pause" id="playpause" title="pause" onClick={e => this.togglePlayPause(e)}></i>
                <i className="fas fa-volume-up" id="mute-unmute" onClick={e => this.toggleMute(e)}></i>
                <input id="volume" min="0" max="1" step="0.1" type="range" onChange={e => this.setVolume(e)} />
                <p id="timeplayed">00:00:00</p>
              </div>
              <div className="right-controls">
                <i className="far fa-closed-captioning" id="subs" onClick={e => this.showSubtitles(e)}></i>
                <div className='subtitles-background' id='subtitles-background'>
                  <ul id='subtitles-list'>
                    <h5 className='sub-title'>Subtitles</h5>
                    {this.props.trackList.length > 0 ?
                      this.props.trackList.map((elem, i) => {
                        return <li id={i} className="subtitle not-selected" key={i} onClick={e => this.toggleSubtitles(e)}>{elem.label}</li>;
                      })
                      : <p className="noSub" key={0}>none available</p>
                    }
                  </ul>
                </div>
                <i className="fas fa-expand" id="fullscreen" onClick={e => this.toggleFullScreen(e)}></i>
              </div>
            </div>
                  <div className="progressBar" id="progressBar" onClick={e => this.toggleTimePlaying(e)}>
              <div className="buffered" id="buffered" >
                <span id="buffered-amount"></span>
              </div>
              <div className="progress" id="progress" >
                <span id="progress-amount"></span>
              </div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

export default CustomPlayer;
