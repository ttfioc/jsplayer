var generatelist = function(){//生成播放列表+播放
	var list = [
		{
			title:"seventh heaven",
			mp3:"s.mp3",
			ogg:"d.ogg"
		},
		{
			title:"cry for me,cry for you",
			mp3:"c.mp3",
			ogg:"c.ogg"
		},
		{
			title:"always",
			mp3:"a.mp3",
			ogg:"a.ogg"
		},
	]
	var jsplayer = document.getElementById("jsplayer");
	var jsplayersound = document.getElementById("jsplayersound");
	var jsplay = document.getElementById("jsplay");
	var jspause = document.getElementById("jspause");
	var jsstop = document.getElementById("jsstop");
	var checkbrowser = function(){//检查浏览器支持播放什么格式的
		if(jsplayersound.canPlayType("audio/mpeg")){return "mp3";}
		else if(jsplayersound.canPlayType("audio/ogg")){return "ogg";}
		else{return false;}
	}
	var ended = function(){//循环播放
		var p = parseInt(jsplayersound.className)
		if(p === (list.length - 1)){
			this.src = list[0][checkbrowser()];
			this.className = "0thsong";
			jsplayer.childNodes[0].className = "jsplaying";
		}
		else{
			this.src = list[p + 1][checkbrowser()];
			this.className = (p + 1) + "thsong"
			jsplayer.childNodes[p + 1].className = "jsplaying";
		}
		jsplayer.childNodes[p].className = "";
		this.play();
	}
	var durationchange = function(){
		setInterval("var jsprogress2 = document.getElementById('jsprogress2');\
			var jsplayersound = document.getElementById('jsplayersound');\
			var width = jsplayersound.currentTime/jsplayersound.duration;\
			jsprogress2.style.width = (width * 100) + '%';",10)
	}
	var addtolist = function(){
		for(var i = 0;i < list.length;i++){//把曲目加入播放列表
			var songli = document.createElement("li");
			var songhref = document.createElement("a");
			songhref.href = list[i][checkbrowser()];
			songhref.innerHTML = list[i].title;
			jsplayer.appendChild(songli);
			jsplayer.lastChild.appendChild(songhref);
			jsplayer.getElementsByTagName("a")[i].onclick = function(){//点击播放
				var that = this;
				var countarr = function(){
					for(j=0;j<jsplayer.getElementsByTagName("a").length;j++){
						if(that === jsplayer.getElementsByTagName("a")[j])
						return j;
					}
				}
				jsplayersound.className = countarr()+"thsong";
				jsplayersound.src = that.href;
				jsplayersound.play();
				for(var h = 0;h < jsplayer.childNodes.length;h++){
					jsplayer.childNodes[h].className = "";
				}
				jsplayer.childNodes[countarr()].className = "jsplaying";
				jsplay.style.display = "none";
				jspause.style.display = "block";
				return false;
			}
		}
		jsplayer.childNodes[0].className = "jsplaying";
		jsplayersound.className = "0thsong";
		jsplayersound.src = jsplayer.getElementsByTagName("a")[0].href;
	}
	var jsplayit = function(){//播放
		jsplayersound.play();
		this.style.display = "none";
		jspause.style.display = "block";
	}
	var jspauseit = function(){//暂停
		jsplayersound.pause();
		this.style.display = "none";
		jsplay.style.display = "block";
	}
	var jsstopit = function(){//停止（jsplaying和jsplayersound的class、src都归零）
		jspause.style.display = "none";
		jsplay.style.display = "block";
		for(i in jsplayer.childNodes){jsplayer.childNodes[i].className = "";}
		jsplayer.childNodes[0].className = "jsplaying";
		jsplayersound.className = "0thsong";
		jsplayersound.src = "";
		jsplayersound.src = jsplayer.getElementsByTagName("a")[0].href;
	}
	addtolist();
	jsplayer.parentNode.appendChild(jsplayersound);
	jsplay.onclick = jsplayit;
	jspause.onclick = jspauseit;
	jsstop.onclick = jsstopit;
	jsplayersound.addEventListener("ended", ended);
	jsplayersound.addEventListener("durationchange", durationchange);
}
if (typeof window.onload !== "function"){//防止onload冲突,如果依然有冲突的话再酌情修改
	window.onload = generatelist;
}
else{
	old = window.onload;
	window.onload = function(){
		old();
		generatelist();
	}
}