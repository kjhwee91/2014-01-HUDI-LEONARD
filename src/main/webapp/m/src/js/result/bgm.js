/* for result mobile */

/* youtube api 시작 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var done = false;
var player;
var vdata;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '300',
      width: '400',
      videoId: jamjar.bgm_url,
      events : {
    	  'onReady': onPlayerReady,
    	  'onStateChange' : onPlayerStateChange,
      },
      playerVars: {
    	  'start' 	: parseInt(jamjar.bgm_start),
    	  'end' 	: parseInt(jamjar.bgm_end),
    	  'autoplay': 0, 
    	  'controls': 0, 
    	  'showinfo' : 0, 
    	  'showsearch' : 0, 
    	  'modestbranding' : 0,
    	  'disablekb' : 0,
    	  'loop' : 0
    	  }
    });
    jObjInfo.getBgmInfo();
}

function onPlayerReady() {
    jObjInfo.m_title = player.getVideoData().title;
    jObjInfo.setData(3, jObjInfo.m_title);
}


var btn = document.getElementById("btn");
var body = document.getElementsByTagName("body")[0];
var alert = createAlertNode();
body.insertBefore(alert,btn);

function onPlayerStateChange(evt) {
	// play event = 1 buffer event = 3
//	if (evt.data === 3){
//		alertShow("loading background music");
//		console.log("buffering");
//		_o.play._stop();
//		console.log(evt);
//	} else if(evt.data === 1){
//		alertShow("playing");
//		_o.play.ready();
//		_o.play._start();
//	} else if(evt.data === -1){
//		alertShow("pause");
//		_o.play._stop();
//	}
}

function alertShow(alertText){
	var alert = document.getElementById("alert");
	alert.innerHTML = alertText;
}

function createAlertNode(){
	
	var alert = document.createElement("div");
	alert.innerHTML = "...";
	alert.id = "alert";
	alert.style.color = "RGBA(255, 255, 255, 0.5)";
	alert.style.fontFamily = "Exo";
	alert.style.textAlign = "center";
	return alert;
}

function getResultWrapStyle(){
	var rewrap = document.getElementById("resultWrap");
	return window.getComputedStyle(rewrap).height;
}

function stopVideo() {
    player.stopVideo();
}