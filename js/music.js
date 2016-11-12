window.onload = function (){
		//歌词处理
		var str ='[ar:杨宗纬][ti:其实都没有] [00:00.69]杨宗纬 - 其实都没有 [00:15.84]从什么都没有的地方[00:19.29]到什么都没有的地方 [00:22.29]我们像没发生事一样 [00:25.49]自顾地 走在路上 [00:29.70]忘掉了的人只是泡沫 [00:33.36]用双手轻轻一触就破 [00:36.20]泛黄 有他泛黄的理由[00:39.81]思念将 越来越薄[00:42.96]你微风中浮现的 从前的面容[00:46.61]已被吹送到天空[00:49.87]我在脚步急促的城市之中[00:53.82]依然一个人生活[00:57.23]我也曾经憧憬过 后来没结果[01:01.03]只能靠一首歌真的在说我[01:04.49]是用那种特别干哑的喉咙[01:07.74]唱着淡淡的哀愁[01:11.04]我也曾经作梦过 后来更寂寞[01:15.11]我们能留下的其实都没有[01:18.56]原谅我用特别沧桑的喉咙[01:21.96]假装我很怀旧[01:25.47]假装我很痛[01:43.99]从什么都没有的地方[01:47.29]到什么都没有的地方[01:50.39]我们 像没发生事一样[01:53.85]自顾地 走在路上[01:58.16]忘掉了的人只是泡沫[02:01.31]用双手轻轻一触就破[02:04.41]泛黄 有他泛黄的理由[02:07.91]思念将 越来越薄[02:11.32]你微风中浮现的 从前的面容[02:15.02]已被吹送到天空[02:18.18]我在脚步急促的城市之中[02:21.93]依然一个人生活[02:28.99]我也曾经憧憬过 后来没结果[02:32.65]只能靠一首歌真的在说我[02:36.20]是用那种特别干哑的喉咙[02:39.45]唱着淡淡的哀愁[02:42.86]我也曾经作梦过 后来更寂寞[02:46.92]我们能留下的其实都没有[02:50.32]原谅我用特别沧桑的喉咙[02:53.77]假装我很怀旧[02:57.07]假装我很痛[03:00.73]我也曾经憧憬过 后来没结果[03:04.54]只能靠一首歌真的在说我[03:07.94]是用那种特别干哑的喉咙[03:11.30]唱着淡淡的哀愁[03:14.64]我也曾经作梦过 后来更寂寞[03:18.65]我们能留下的其实都没有[03:22.06]原谅我用特别沧桑的喉咙[03:25.41]假装我很怀旧[03:28.51]假装我很痛[03:32.42]其实我真的很怀旧[03:36.79]而且也很痛'
	function cl(str){
		var arr = str.split('[');
		var pattern = /\d{2}:\d{2}\.\d{2}\]/;
		var result = [];
		while(!pattern.test(arr[0]))
		{
			 arr = arr.slice(1);
		}
		for(var i = 0;i<arr.length;i++)
		{	
			var temp = [];
			var temp1 = [];
			temp = arr[i].split(']');
			temp1= temp[0].split(':');
			result.push([parseInt(temp1[0])*60+parseFloat(temp1[1]),temp[1]]);
		}
		result.sort(function(a,b){
			return a[0]-b[0];
		})
		return result;
		}
		var arr1 = cl(str);
		function addLyric()
		{	var str = '';
			for(var j = 0;j<arr1.length;j++)
			{
				str+='<p>'+arr1[j][1]+'</p>';
			}
			$('lyric_text').innerHTML = str;
		}
		addLyric();
		var oP =tag($('lyric_text'),'p'); 
		for(var i = 0;i<oP.length;i++)
		{
			oP[i].index = i;
		}
		var num = 0;
		var yb = $('lyric_text').offsetTop;
		function changeLyric()
		{
				var idx = $('lyric_text').offsetTop;
				if($('au').currentTime>arr1[num][0])
				{
					idx=yb-20*num;
					for(var i = 0;i<oP.length;i++)
					{
						oP[i].className = '';
					}
					oP[num].className = 'active';
					num++;
				}
				var scale_1 = $('au').currentTime/$('au').duration;
				tag($('timer'),'time')[0].innerHTML = tranT($('au').currentTime);
				tag($('progress'),'a')[0].style.left =($('progress').offsetWidth - tag($('progress'),'a')[0].offsetWidth)*scale_1+'px';
				tag($('progress'),'span')[0].style.width = (tag($('progress'),'a')[0].offsetLeft+3)+'px';
			$('lyric_text').style.top = idx+'px';
		}

		//获取元素函数
		function $(id){
			return document.getElementById(id);
		}
		function tag(obj,tagName){
			return obj.getElementsByTagName(tagName);
		}
		//播放控件
		var onoff = true;
		tag($('play'),'a')[1].onclick = function (){
			if(onoff)
			{
				this.innerHTML =  '&#xe600;'
				onoff = false;
				$('au').play();
			}else{
				this.innerHTML =  '&#xe628;'
				onoff = true;
				$('au').pause();
			}
		}
		//时间显示
		tag($('timer'),'time')[0].innerHTML = tranT($('au').currentTime);
		tag($('timer'),'time')[1].innerHTML = tranT($('au').duration);
		//歌曲进度条加音量进度条；
		drag(tag($('progress'),'a')[0],$('progress'))
		function drag (obj,oP){
		obj.onmousedown = function (ev){
		var ev = ev || event;
		var disX = ev.clientX-obj.offsetLeft;
		var disY = ev.clientY-obj.offsetTop;
		if(obj.setCapture)
		{
			obj.setCapture();
		}
		document.onmousemove = function (ev)
		{
			var ev = ev || event;
			var L = ev.clientX-disX;
			var T = ev.clientY-disY;
			if(L<0)
			{
				L = 0;
			}else if(L>oP.offsetWidth - obj.offsetWidth)
			{
				L = oP.offsetWidth - obj.offsetWidth;
			}
			obj.style.left = L+'px';
			obj.style.top = obj.offsetTop+'px';
			var scale = obj.offsetLeft/(oP.offsetWidth - obj.offsetWidth);
			if(obj ==tag($('progress'),'a')[0])
			{
				$('au').currentTime = $('au').duration*scale;
				tag($('timer'),'time')[0].innerHTML = tranT($('au').currentTime);
				tag($('progress'),'span')[0].style.width = (obj.offsetLeft+3)+'px';
				if(scale==1)
				{
					tag($('play'),'a')[1].innerHTML =  '&#xe628;';
					$('au').pause();
				}
				num = parseInt(arr1.length*scale);
			}else if(obj ==tag($('voice_p'),'a')[0]){
				$('au').volume = 1*scale;
				tag($('voice_p'),'span')[0].style.width = (obj.offsetLeft+3)+'px';
			}
			}
			document.onmouseup = function (){
		   	 document.onmouseup =document.onmousemove = null;
		  	 if(obj.releaseCapture)
			{
			obj.releaseCapture();
			}
			}
			return false;
			}
			}	
		
		//静音控件
		tag($('voice_ico'),'a')[0].onclick = function ()
		{
			if(!$('au').muted)
			{
				this.innerHTML = '&#xe66f;';
				$('au').muted = true;
			}else{
				this.innerHTML = '&#xe675;';
				$('au').muted = false;
			}
		}
		//音量控件
		drag(tag($('voice_p'),'a')[0],$('voice_p'));

		//转换时间格式
		function tranT(iTime)
		{
			var iM = tranN(parseInt(iTime/60));
			var iS = tranN(parseInt(iTime%60));
			return iM+':'+iS;
		}

		//转换数字格式
		function tranN(num)
		{
			if(num<=9)
			{
				return '0'+num;
			}else{
				return ''+num;
			}
		}
		$('au').addEventListener('timeupdate',function(){
			changeLyric();
		})
	}