;(function($,win){
	$.fn.inViewport = function(cb,qc){
		return this.each(function(i,el){
			function visPx(){
			var H = $(this).height(),
			r = el.getBoundingClientRect(),t=r.top,b=r.bottom;
			return cb.call(el, Math.max(0,t>0?H-t:(b<H?b:H)));
		}visPx();
		$(qc?qc:win).on('resize scroll',visPx);
		});
	};
}(jQuery,window));
$('body,html').bind('contextmenu',function(){return false});
$(document).keydown(function(e){return false;if(e.keyCode==85&&e.ctrlKey||e.keyCode==123){return false}});
var startCake = function(){
	try{
		var cl = $('.cake .cl:last-child');
		cl.removeClass('actived '+cl.data('out')).addClass('active '+cl.data('in'));
		$('.cake .cl').off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
			$(this).removeClass('actived '+$(this).data('out')).addClass('active');
			var cl = $(this).prev('.cl');
			cl.removeClass('actived '+cl.data('out')).addClass('active '+cl.data('in'));
			if(cl.hasClass('layer_c')){
				$('.title').addClass('d-fold');
			}
			if(cl.hasClass('layer_b')){
				$('.title').removeClass('d-color');
			}
			if(cl.hasClass('candle')){
				setTimeout(function(){
					$('.title').removeClass('d-fold');
					$('.confetti').fadeIn(2000);
					var usr = $('.name');
					usr.removeClass('d-hide').textillate({
						in:{effect:usr.data('in'),delayScale:1.5,delay:50},
						out:{effect:usr.data('out'),delayScale:1.5,delay:50,shuffle:true},
						callback:function(){
						}
					}).fitText(1,{minFontSize:'28px',maxFontSize:'72px'});
					setTimeout(function(){
						$('.text-numb').removeClass('d-hide '+$('.text-numb').data('out')).addClass('animated '+$('.text-numb').data('in'));
					},1000);
				},2000);
			}
		});
	}catch(err){}
}
var stopCake = function(){
	try{
		var cl = $('.cake .cl:first-child');
		cl.removeClass('active '+cl.data('in')).addClass('activated '+cl.data('out'));
		$('.cake .cl').off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
			$(this).removeClass('active '+$(this).data('in')).addClass('activated');
			var cl = $(this).next('.cl');
			cl.removeClass('active '+cl.data('in')).addClass('activated '+cl.data('out'));
			if(cl.hasClass('layer_b')){
				$('.title').addClass('d-color');
			}
		});
		$('.text-numb').removeClass('d-hide '+$('.text-numb').data('in')).addClass('animated '+$('.text-numb').data('out'));
		$('.title').addClass('d-fold');
		$('.confetti').fadeOut(2000);
		$('.name').textillate('out');
	}catch(err){}
}
var randNumb = function(max){
	try{
		var randomNumbers = function(max){
			function range(upTo) {
				var result = [];
				for(var i = 0; i < upTo; i++) result.push(i);
				return result;
			}
			function shuffle(o){
				for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			}
			var myArr = shuffle(range(max));
			return function() {
				return myArr.shift();
			};
		}
		var randoms = randomNumbers(max),rand = randoms(),result = [];
		while(rand!=null){
			result.push(rand+1);
			rand = randoms();
		}
		return result;
	}catch(err){}
}
var makeSlice = function(){
	try{
		var g = $('.gallery'),
			h = g.outerHeight(),
			w = g.outerWidth(),
			j = 0,
			k = 0,
			bx = w/4,
			by = h/4,
			rw = 0;
		g.find('.item').each(function(i){
			if(i%4===0){
				j = 0;
				rw = rw+1;
			}else{
				j = j+1;
			}
			k = rw-1;
			var px,py = 0;
			switch(rw){
				case 1:
					px = bx*j;
					py = 0;
				break;
				case 2:
					px = bx*j;
					py = by*k;
				break;
				case 3:
					px = bx*j;
					py = by*k;
				break;
				case 4:
					px = bx*j;
					py = by*k;
				break;
			}
			$(this).addClass('row-'+rw+' col-'+(j+1)).find('figure').css({'background-size':w+'px','background-position':'-'+px+'px -'+py+'px'});
		});
	}catch(err){}
}
var sliceOut = function(){
	try{
		var g = randNumb(20);
		var gw = $('.gallery-wrap');
		for(i=0;i<g.length;i++){
			$('.gallery .item:nth-child('+g[i]+') figure').removeClass(gw.data('in')).css({'animation-duration':'.4s','animation-delay':i/20+'s'}).addClass('animated '+gw.data('out'));
		}
		gw.removeClass('d-hide').addClass('active');
	}catch(err){}
}
var sliceIn = function(){
	try{
		var gw = $('.gallery-wrap');
		var expo_c = $('.expo-c');
		gw.find('.item img,.item figure').addClass('d-hide');
		gw.addClass('d-hide-bdr').removeClass('d-hide-all active');
		expo_c.addClass('d-none').removeClass(expo_c.data('out')+' animated '+expo_c.data('in'));
		setTimeout(function(){
			for(i=0;i<20;i++){
				$('.gallery .item:nth-child('+(i+1)+') figure').removeClass('d-hide '+gw.data('out')).css({'animation-duration':'.4s','animation-delay':i/20+'s'}).addClass('animated '+gw.data('in'));
				if(i==19){
					setTimeout(function(){
						gw.removeClass('d-hide-bdr');
						gw.find('.item img').removeClass('d-hide');
						setTimeout(function(){
							expo_c.removeClass('d-none '+expo_c.data('out')).addClass('animated '+expo_c.data('in'));
						},1000);
					},2000);
				}
			}
		},1000);
	}catch(err){}
}
var makeBalloon = function(){
	try{
		var bln = $('.balloon'), str = 'Happy Birthday Fistu', txt=str.toUpperCase().split(' '), htm='', itm=bln.html().replace(';display:none','')
		var splitText = function(txt){
			var h='', s=txt.split('');
			for(var i=0;i<s.length;i++){
				var num = Math.floor(Math.random()*26)+1; // this will get a number between 1 and 26;
				num *= Math.floor(Math.random()*14)+1 == 1 ? 1 : -1; // this will add minus sign in (2:50%) (14:7.14%) of case
				itm = itm.replace('dur="0s"','dur="'+(Math.floor(Math.random()*5)+0.25)+'s"');
				//console.log((Math.floor(Math.random()*4)+1)/4);
				h=h+'<div class="bln-has-itm d-hide" data-in="fadeInUp" data-out="fadeOutDown"><div class="bln-itm" data-text="'+s[i]+'" style="top:'+num+'px;animation-delay:'+((Math.floor(Math.random()*4)+1)/4)+'s;animation-duration:'+((Math.floor(Math.random()*20)+4)/4)+'s">'+ itm +'</div></div>';
			}
			return h;
		}
		for(var i=0;i<txt.length; i++){
			htm =htm+'<div class="bln-itm-wrp">'+splitText(txt[i])+'</div>';
			if(i==(txt.length-1))bln.empty().html(htm);
		}
	}catch(err){}
}
makeBalloon();
$(function(){
	try{
		var wish = [ [0,4,'Good night!'], [5,11,'Good morning!'], [12,16,'Good afternoon!'], [17,20,'Good evening!'], [21,24,'Good night!'] ], hr = new Date().getHours();
		for(var i = 0; i < wish.length; i++){
			if(hr >= wish[i][0] && hr <= wish[i][1]){
				$('.greeting').text(wish[i][2]);
				break;
			}
		}

		var bday = new Date('Dec 14, 2018');
		var mmm = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var where = '';
		var now = new Date();
		now.setHours(0,0,0,0);
		var prev = new Date();
		prev.setHours(0,0,0,0);
		prev.setDate(prev.getDate()-1);
		var next = new Date();
		next.setHours(0,0,0,0);
		next.setDate(next.getDate()+1);
		if(now.getTime()==bday.getTime()){
			where = 'Today is';
		}else if(prev.getTime()==bday.getTime()){
			where = 'Yesterday was';
		}else if(next.getTime()==bday.getTime()){
			where = 'Tomorrow is';
		}else{
			where = mmm[bday.getMonth()]+' '+bday.getDate()+' is';
		}
		$('.text-wrap .where').text(where);

		var title = new CircleType(document.querySelector('.title')).radius(130);
		$(title.element).fitText(1,{minFontSize:'20px',maxFontSize:'72px'});
		$('.text-numb').fitText(1,{minFontSize:'72px',maxFontSize:'100px'});

		var txt_a = $('[data-ani="a"]'),
			txt_b = $('[data-ani="b"]'),
			txt_c = $('[data-ani="c"]'),
			expo_a = $('.expo-a'),
			expo_b = $('.expo-b'),
			expo_c = $('.expo-c');
			expo_d = $('.expo-d');

		txt_a.textillate({
			initialDelay:300,
			in:{effect:txt_a.data('in'),delayScale:1.5,delay:50},
			out:{effect:txt_a.data('out'),delayScale:1,delay:20,shuffle:true},
			callback:function(e){
				txt_b.textillate({
					delay:1000,
					in:{effect:txt_b.data('in'),delayScale:1.5,delay:50},
					out:{effect:txt_b.data('out'),delayScale:1,delay:20,shuffle:true},
					callback:function(){
						txt_c.textillate({
							initialDelay:100,
							in:{effect:txt_c.data('in'),delayScale:1.5,delay:30},
							out:{effect:txt_c.data('out'),delayScale:1,delay:5,shuffle:true},
							callback:function(){
								setTimeout(function(){
									expo_a.removeClass('d-none').addClass('animated '+expo_a.data('in'));
								},1000);
							}
						});
					}
				});
			}
		});
		$('[data-ani]').on('start.tlt',function(){ $(this).removeClass('d-hide'); });
		$('[data-ani="c"]').on('outAnimationEnd.tlt',function(){ startCake(); });
		$('.name').on('inAnimationEnd.tlt',function(){
			setTimeout(function(){
				expo_b.removeClass('d-none '+expo_b.data('out')).addClass('animated '+$('.expo-b').data('in'));
			},1500);
		});
		$('.name').on('outAnimationEnd.tlt',function(){
			setTimeout(function(){
				sliceIn();
			},1000);
		});

		expo_a.on('vclick',function(){
			$(this).removeClass($(this).data('in')).addClass($(this).data('out'));
			$(this).off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
				$(this).addClass('d-none');
				$('.text-wrap .text').textillate('out');
			});
		});

		expo_b.on('vclick',function(){
			$(this).removeClass($(this).data('in')).addClass($(this).data('out'));
			$(this).off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
				$(this).addClass('d-none');
				stopCake();
			});
		});
		$('.gallery').find('img').each(function(){
			if(this.complete){
				$(this).attr('src',$(this).data('src'));
			}else{
				$(this).bind('load',function(e){
					$(this).attr('src',$(this).data('src'));
				});
			}
		});
		makeSlice();
		$(window).bind('resize',makeSlice);
		expo_c.on('vclick',function(){
			var $btn = $(this);
			$('.gallery-wrap').animate({scrollTop:0},600,function(){
				$btn.removeClass($btn.data('in')).addClass($btn.data('out'));
				$btn.off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
					$btn.addClass('d-none');
				});
				sliceOut();
				setTimeout(function(){
					$('.gallery-wrap').animate({scrollTop:$('.row-2').offset().top},function(){
						setTimeout(function(){
							expo_d.removeClass('d-none').removeClass(expo_d.data('out')).addClass(expo_d.data('in'));
						},500);
					});
				},1500);
			});
		});
		expo_d.off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
			var $btn = $(this);
			setTimeout(function(){
				$btn.removeClass($btn.data('in')).addClass($btn.data('out'));
				$btn.off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
					$btn.addClass('d-none');
				});
			},2000);
			
		});
		$(window).bind('load',function(){
			$('.loader').fadeOut(400);
			$('.balloon').inViewport(function(visible){
				if(visible){
					var ball = $('.balloon .bln-itm-wrp:first-child>.bln-has-itm:first-child');
					ball.removeClass('d-hide animated '+ball.data('out')).addClass('animated '+ball.data('in'));
				}else{
					$('.balloon .bln-has-itm').each(function(){
						var ball = $(this);
						ball.addClass('d-hide').removeClass(ball.data('in')+' animated '+ball.data('out'));
					});
				}
			},'.gallery-wrap');
			$('.bln-has-itm').off().on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
				var bln = $(this), nxt = bln.next('.bln-has-itm');
				if(nxt.length){
					nxt.removeClass('d-hide animated '+nxt.data('out')).addClass('animated '+nxt.data('in'));
				}else{
					bln.closest('.bln-itm-wrp').next('.bln-itm-wrp').find('.bln-has-itm').siblings().eq(0).removeClass('d-hide animated '+bln.data('out')).addClass('animated '+bln.data('in'));
				}
			});
		});
		$('.gallery-wrap').bind('scroll',function(){
			if($('.scrollme').attr('style')){
				$('.scroll-wrap').removeClass('d-hide');
			}else{
				$('.scroll-wrap').addClass('d-hide');
			}
		});
		$(window).bind('orientationchange',function(){
			$('.gallery-wrap').scrollTop(0);
		});
		var sound = new Howl({
			loop:true,
			volume:1,
			autoplay:true,
			src:['ado/hbd.mp3','ado/hbd.ogg']
		}).play();
	}catch(err){}
});