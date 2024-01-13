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
if(!$('body').hasClass('mk')){
	$('body,html').bind('contextmenu',function(){return false});
	$(document).keydown(function(e){return false;if(e.keyCode==85&&e.ctrlKey||e.keyCode==123){return false}});	
}
var startAgain = function(){
	$('.react>i').addClass('d-none');

	$('.thank-you').addClass('d-none');
	$('.expo,.text,.name,.text-numb').each(function(){
		$(this).removeClass($(this).data('in')).removeClass($(this).data('out')).addClass('d-none');
	});
	$('.name,.text-numb').removeClass('d-none').addClass('d-hide');
	$('.cake .cl').each(function(){
		$(this).removeClass($(this).data('in')).removeClass($(this).data('out')).removeClass('active activated');
	});
	$('.balloon .bln-has-itm').each(function(){
		var ball = $(this);
		ball.addClass('d-hide').removeClass(ball.data('in')+' animated '+ball.data('out'));
	});
	var gw = $('.gallery-wrap').removeClass('active');
	gw.animate({scrollTop:0},600);
	gw.removeClass(gw.data('in')).removeClass(gw.data('out')).addClass('d-hide-bdr d-hide-all');
	$('.confetti').hide();
	$('.title').addClass('d-fold');
	var txt_a = $('[data-ani="a"]'),
		txt_b = $('[data-ani="b"]'),
		txt_c = $('[data-ani="c"]');
	txt_a.textillate('in').removeClass('d-none').on('inAnimationEnd.tlt',function(){
		txt_b.textillate('in').removeClass('d-none').on('inAnimationEnd.tlt',function(){
			txt_c.textillate('in').removeClass('d-none');
		});
	});
	$(window).trigger('resize');
}
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
						in:{effect:usr.data('in'),delayScale:1.5,delay:50,
							callback:function(){
								setTimeout(function(){
									var expo_b = $('.expo-b');
									expo_b.removeClass('d-none '+expo_b.data('out')).addClass('animated '+expo_b.data('in'));
								},1500);
							}
						},
						out:{effect:usr.data('out'),delayScale:1.5,delay:50,shuffle:true,
							callback:function(){
								setTimeout(function(){
									sliceIn();
								},1000);
							}
						},
						callback:function(){
						}
					}).fitText(1,{minFontSize:'28px',maxFontSize:'72px'});
					usr.textillate('in');
					setTimeout(function(){
						$('.text-numb').removeClass('d-hide '+$('.text-numb').data('out')).addClass('animated '+$('.text-numb').data('in'));
						setTimeout(function(){
							/*$('.text-numb .yy').each(function(){
								$(this).prop('Counter',0).animate({
									Counter: $(this).text()
								},{
									duration: 800,
									easing: 'swing',
									step: function(now){ $(this).text(Math.ceil(now)); }
								});
							});*/
							$('.text-numb .yy').each(function(){
								var d = $(this).text(), yy = new CountUp($(this)[0], d, {startVal:d>5?1:9});
								if (!yy.error) {
									yy.start();
								}
							});
						},400);
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
		$('.gallery-wrap').scrollTop(0);
	}catch(err){}
}
var randNumb = function(max,arr=true){
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
		if(arr){
			return result;
		}else{
			var min = 0;
			return min + Math.floor((max - min) * Math.random());
		}
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
		$('.expo-a,.expo-b').each(function(){
			$(this).removeClass($(this).data('in')).removeClass($(this).data('out')).addClass('d-none');
		});
		var gw = $('.gallery-wrap'), expo_c = $('.expo-c');
		
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
		var bln = $('.balloon'), str = 'Happy Birthday '+(dear.nickname || 'Kanchho'), txt=str.toUpperCase().split(' '), htm='', itm=bln.html().replace(';display:none','')
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
var makeEmoji = function(){
	var react = $('.react').addClass('ball'), emoji = [
		'<i class="emoji emoji--like"><i class="emoji__hand"><i class="emoji__thumb"></i></i></i>',
		'<i class="emoji emoji--love"><i class="emoji__heart"></i></i>',
		'<i class="emoji emoji--haha"><i class="emoji__face"><i class="emoji__eyes"></i><i class="emoji__mouth"><i class="emoji__tongue"></i></i></i></i>',
		'<i class="emoji emoji--yay"><i class="emoji__face"><i class="emoji__eyebrows"></i><i class="emoji__mouth"></i></i></i>',
		'<i class="emoji emoji--wow"><i class="emoji__face"><i class="emoji__eyebrows"></i><i class="emoji__eyes"></i><i class="emoji__mouth"></i></i></i>',
		//'<i class="emoji emoji--sad"><i class="emoji__face"><i class="emoji__eyebrows"></i><i class="emoji__eyes"></i><i class="emoji__mouth"></i></i></i>',
		//'<i class="emoji emoji--angry"><i class="emoji__face"><i class="emoji__eyebrows"></i><i class="emoji__eyes"></i><i class="emoji__mouth"></i></i></i>',
		'<i class="emoji emoji--happy"><i class="emoji__face"><i class="emoji__eyes"></i><i class="emoji__mouth"></i></i></i>',
		'<i class="emoji emoji--funny"><i class="emoji__face"><i class="emoji__eyebrows"></i><i class="emoji__eyes"></i><i class="emoji__mouth"></i></i></i>',
		'<i class="emoji emoji--charmed"><i class="emoji__face"><i class="emoji__eyes"><i class="emoji__eye emoji__eye-left"></i><i class="emoji__eye emoji__eye-right"></i></i><i class="emoji__mouth"></i></i></i>',
	];
	for(var i=1;i<=20;i++){
		var emo = emoji[randNumb(emoji.length,false)];
		react.append('<i class="d-none">'+emo+'</i>');
	}
}
makeEmoji();
try{
	var btn = new Howl({
		loop:false,
		volume:1,
		autoplay:false,
		src:['ado/btn.mp3','ado/btn.ogg']
	});
	var box = new Howl({
		loop:false,
		volume:1,
		autoplay:false,
		src:['ado/box.mp3','ado/box.ogg','ado/box.wav']
	});
	var pop = new Howl({
		loop:false,
		volume:1,
		autoplay:false,
		src:['ado/pop.mp3','ado/pop.ogg','ado/pop.wav']
	});
	var hbd = new Howl({
		loop:true,
		volume:0,
		autoplay:false,
		src:['ado/hbd.mp3','ado/hbd.ogg']
	});
	var ins = new Howl({
		loop:true,
		volume:0,
		autoplay:false,
		src:['ado/ins.mp3','ado/ins.ogg']
	});
	var thx = new Howl({
		loop:true,
		volume:0,
		autoplay:false,
		src:['ado/thx.mp3','ado/thx.ogg']
	})
}catch(err){
	
}
$(function(){
	try{
		var wish = [ [0,4,'Good night!'], [5,11,'Good morning!'], [12,16,'Good afternoon!'], [17,20,'Good evening!'], [21,24,'Good night!'] ], hr = new Date().getHours();
		for(var i = 0; i < wish.length; i++){
			if(hr >= wish[i][0] && hr <= wish[i][1]){
				$('.greeting').text(wish[i][2]);
				break;
			}
		}
		var age = function(d1, d2){
			if(d1){
				d1 = new Date(d1);
				d2 = d2 || new Date();
				var diff = d2.getTime() - d1.getTime();
				return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
			}
		}
		if(typeof dear!='undefined') {
			$('[bday="name"]').text(dear.name || 'Dear');
			$('[bday="nickname"]').text(dear.nickname || dear.name || 'Dear');
			var gf = "%3Cdefs%3E%3Cstyle type='text/css'%3E @import url('https://fonts.googleapis.com/css?family=Rajdhani&amp;text=Happy Birthday "+(dear.nickname || dear.name || 'Dear')+"'); %3C/style%3E%3C/defs%3E";
			var bg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' height='65px' width='110px'%3E"+gf+"%3Cg style='font-family:Rajdhani, cursive' font-family='Rajdhani, cursive' font-size='14' fill='%23404040'%3E%3Ctext x='0' y='50' transform='rotate(-15)'%3EHappy Birthday%3C/text%3E%3Ctext x='40' y='70' transform='rotate(-15)'%3E"+(dear.nickname || dear.name)+"%3C/text%3E%3C/g%3E%3C/svg%3E";
			$('[bday="bg"]').css('background-image','url("'+bg+'")');
		}

		var born = new Date((dear.date || 'Dec 14, 1991')), mmm = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], bday = born,
		where = '', now = new Date(), candle_numb = age(born).toString().split('');
		now.setHours(0,0,0,0);

		bday.setFullYear(now.getFullYear());

		var prev = new Date(), next = new Date();
		prev.setHours(0,0,0,0);
		next.setHours(0,0,0,0);

		prev.setDate(now.getDate()-1);
		next.setDate(now.getDate()+1);

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
		if(candle_numb.length==2){
			$('.age:first-child .yy').text(candle_numb[0]);
			$('.age:last-child .yy').text(candle_numb[1]);
		}

		var txt_a = $('[data-ani="a"]'),
			txt_b = $('[data-ani="b"]'),
			txt_c = $('[data-ani="c"]'),
			expo_a = $('.expo-a'),
			expo_b = $('.expo-b'),
			expo_c = $('.expo-c'),
			expo_d = $('.expo-d'),
			expo_t = $('.expo-thanks'),
			expo_x = $('.expo-close'),
			expo_r = $('.expo-restart');

		$(window).bind('load',function(){
			var title = new CircleType(document.querySelector('.title')).radius(130);
			$(title.element).fitText(1,{minFontSize:'20px',maxFontSize:'72px'});
			$('.text-numb').fitText(1,{minFontSize:'72px',maxFontSize:'100px'});

			txt_a.textillate({
				initialDelay:300,
				in:{effect:txt_a.data('in'),delayScale:1.5,delay:50,
					callback:function(){
						$('.react').fadeIn(600);
						var index = 1, reactInit = setInterval(function(){
							$('.react i:nth-child('+index+')').removeClass('d-none');
							index = index+1;
							if(index==$('.react>i').length){
								clearInterval(reactInit);
							}
						},500);
					}
				},
				out:{effect:txt_a.data('out'),delayScale:1,delay:20,shuffle:true},
				callback:function(e){
					txt_b.textillate({
						delay:1000,
						in:{effect:txt_b.data('in'),delayScale:1.5,delay:50,
							callback:function(){
								txt_c.textillate({
									initialDelay:100,
									in:{effect:txt_c.data('in'),delayScale:1.5,delay:30,
										callback:function(){
											setTimeout(function(){
												expo_a.removeClass('d-none').addClass('animated '+expo_a.data('in'));
											},1000);
										}
									},
									out:{effect:txt_c.data('out'),delayScale:1,delay:5,shuffle:true,
										callback:function(){
											startCake();
										}
									},
									callback:function(){
										//only work for first initalize
									}
								});
							}
						},
						out:{effect:txt_b.data('out'),delayScale:1,delay:20,shuffle:true},
						callback:function(){
							
						}
					});
				}
			});
		});
		$('[data-ani]').on('start.tlt',function(){ $(this).removeClass('d-hide'); });

		expo_a.on('vclick',function(){
			var $btn = $(this);
			$btn.removeClass($btn.data('in')).addClass($btn.data('out'));
			$('.react').fadeOut(600);
			$btn.on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
				if($btn.hasClass($btn.data('out'))){
					$btn.addClass('d-none');
					$('.text-wrap .text').textillate('out');
				}
			});
		});

		expo_b.on('vclick',function(){
			var $btn = $(this);
			$btn.removeClass($btn.data('in')).addClass($btn.data('out'));
			$btn.on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
				if($btn.hasClass($btn.data('out'))){
					$btn.addClass('d-none');
					stopCake();
				}
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
				$btn.on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
					if($btn.hasClass($btn.data('out'))){
						$btn.addClass('d-none');
					}
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
				$btn.on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
					if($btn.hasClass($btn.data('out'))){
						$btn.addClass('d-none');
					}
				});
			},2000);
			
		});
		$(window).bind('load',function(){
			$('.loader').fadeOut(400);
			$('.balloon').inViewport(function(visible){
				if(visible){
					var ball = $('.balloon .bln-itm-wrp:first-child>.bln-has-itm:first-child');
					if(!ball.hasClass('animated')){
						if(!$('.thank-you').is(':visible') && $('.gallery-wrap').hasClass('active')){
							pop.play();
						}
					}
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
				if(!$('.thank-you').is(':visible') && $('.gallery-wrap').hasClass('active')){
					if(nxt.length || bln.closest('.bln-itm-wrp').next('.bln-itm-wrp').find('.bln-has-itm').siblings().eq(0).length){
						pop.play();
					}
				}
				if(nxt.index()<0 && !bln.closest('.bln-itm-wrp').next('.bln-itm-wrp').length){
					expo_t.removeClass('d-none animated '+expo_t.data('out')).addClass('animated '+expo_t.data('in')).animate({scrollTop:0},100);
					$('.gallery-wrap').animate({scrollTop:$('.gallery-wrap').prop('scrollHeight')},600);
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

		hbd.on('end',function(){
			//ins.play();
		}).on('fade',function(e,b){
			sidp();
		});
		ins.on('end',function(){
			//hbd.play();
		}).on('fade',function(e){
			sidp();
		});
		thx.on('fade',function(e){
			if(!$('.thank-you').is(':visible')){
				if($('.gallery-wrap').hasClass('active')){
					hbd.stop()
					thx.stop();
					ins.play();
					ins.fade(0,.55,9000);
				}else{
					hbd.stop();
					ins.stop();
					thx.stop();
				}
			}
		});
		var sidp = function(){
			if(!hbd.playing()){
				hbd.pause();
			}
			if(!ins.playing()){
				ins.pause();
			}
			if(!thx.playing()){
				thx.pause();
			}
		}
		var sidx = function(){
			if(hbd.playing()){
				hbd.fade(1,0,500);
			}
			if(ins.playing()){
				ins.fade(1,0,500);
			}
			if(thx.playing()){
				thx.fade(1,0,500);
			}
		};
		expo_a.on('vclick',function(){
			sidx();
			hbd.play();
			hbd.fade(0,.70,2000);
		});
		expo_b.on('vclick',function(){
			sidx();
			ins.play();
			ins.fade(0,.55,9000);
		});
		expo_r.on('vclick',function(){
			thx.fade(0.45,0,200);
		});
		expo_x.on('vclick',function(){
			thx.fade(0.45,0,200);
		});
		expo_t.on('vclick',function(){
			hbd.stop()
			ins.stop();
			thx.play();
			thx.fade(0,0.45,3000);
		});
		$('.expo').on('vclick',function(){
			btn.play();
		});
		$('.gallery figure').each(function(){
			var fig = $(this);
			fig.on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd',function(){
				//if(fig.hasClass(fig.closest('.gallery-wrap').data('out'))){
					box.stop();
					box.play();
				//}
			});
		});
	}catch(err){}
});