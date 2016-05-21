/* modalwindow */

;(function($){
	$.fn.modalwindow = function(data_, class_, _options){
		var _data = data_;
		var _class = class_;
		var opts = $.extend({},$.fn.modalwindow.defaults, _options);
		focusedElementBeforeModal = jQuery(':focus');
		overlayset();
		var _visClass = '';
		if(opts.type=='video'){
			_visClass = ' class="visual"';
		}
		$('#lightbox-overlay').append('<div id="modalwindow-wrapper"'+_visClass+'><div id="modalwindow-bg"><a href="#" class="btn-close"><img src="/etc/designs/panasonic/common-clientlibs/images/btn-lightbox-close.png" alt="'+opts.alt[0]+'"></a><div id="modalwindow" class="'+_class+'"></div><span id="modalFocusend" tabindex="0"></span></div></div>');
		allSepecsContent('#modalwindow',_data);
		$('#modalFocusend').on('focus', function(e){
			$('#modalwindow-wrapper').find(':focusable').eq(0).focus();
		});
		//sizeSetting('#modalwindow-wrapper');
		//
		function setupLightBoxContainer(){
			$('#lightbox-overlay').fadeIn({
				start : function(){
					/*$(this).find('.copyguard').copyguardImage();
					$(this).find('.title.section').children('.Title').titleMinHeight();
					$(this).find('.mouseover.swap').mouseOverSwapImage();
					$(this).find('.ext-table').extTableLayout();
					if($(this).find('.video').length){
						$(this).find('.video').each(function(index, element) {
							$(this).videoComponent();
							YouTubeUtils.setupPlayer($(this).find('.youtube-placeholder'),'onlightbox'+index);
						});
					}*/
				},
				complete : function(){
					setInitialFocusModal($(this));
					$(this).keydown(function(event){trapTabKey($(this),event);});
					/*opts.callback();*/
				}
			});
			$('#modalwindow-wrapper .btn-close, #lightbox-bgcolor').click(function(e) {
				$('#lightbox-overlay').fadeOut(function(){
					overlayRemove();
					focusedElementBeforeModal.focus();
					opts.onClose();
				});
				return false;
			});
		}
		function sizeSetting(box){
			var _box = box;
			var _wSctop = $(window).scrollTop();
			var _hbH = 0;
			var _bgBox = $(_box).find('#modalwindow-bg');
			var _scrlBox = $(_box).find('.modal_content');
			var _video = $(_box).find('.video');
			var _bgBoxH, _bgBoxMtg, _scrlBoxH,_hbH;
			if(_scrlBox.find('img').length){
				_scrlBox.find('img').imagesLoaded(function(e){
					setupSize();
				});
			}else{
				setupSize();
			}
			$(window).on('resize', function(e){
				resetSize(_hbH);
			});
			function setupSize(){
				_bgBoxH = _bgBox.height();
				_bgBoxMtg = parseInt(_bgBox.css('margin-top')) + parseInt(_bgBox.css('margin-bottom'));
				_scrlBoxH = _scrlBox.height();
				_hbH = _bgBoxH-_scrlBoxH;
				resetSize(_hbH);
			}
			function resetSize(_gp){
				var _ww = $('body').width();
				var _wh = window.innerHeight ? window.innerHeight : $(window).height();
				if($('#page').css('min-width') != '320px'){
					//position
					$(_box).height(_wh-100);
					$(_box).css({'left':_ww/2-$(_box).width()/2 +'px', 'top':_wSctop + 50+'px'});
					if(_bgBoxH >= _wh-100){
						_bgBox.css({'margin-top':0});
						_scrlBox.height($(_box).height() - _gp);
					}else{
						_bgBox.css({'margin-top':($(_box).height() - _bgBox.height())/2+'px'});
						_scrlBox.height(_scrlBoxH);
					}
					if(!$('html').hasClass('touch-device')){
						if(!_scrlBox.find('jspContainer').length){
							_scrlBox.jScrollPane({mouseWheelSpeed : 20, autoReinitialise:true});
						}
					}
				}else{
					//position
					$(_box).height(_wh);
					$(_box).css({'top':_wSctop + 'px'});
					if(_bgBoxH >= _wh - _bgBoxMtg){
						_scrlBox.height($(_box).height() - _gp - _bgBoxMtg);
					}else{
						_scrlBox.height(_scrlBoxH);
					}
					if(_video.length){
						_bgBox.css({'max-height':'300px'});
						_video.removeAttr('style');
						_video.find('.youtube-placeholder').removeAttr('style');
						setTimeout(function(){
							if(_bgBox.width()/_bgBox.height() > 16/9 && _bgBox.height() > 0){
								//_bgBox.css({'margin-top': '10px'});
								_video.removeAttr('style');
								_video.css({'min-height':'169px'});
								_video.height(_bgBox.height());
								_video.width(16*_video.height()/9);
								_video.find('.youtube-placeholder').height(_video.height());
							}else{
								//_bgBox.css({'margin-top':($(_box).height() - _bgBox.height())/2 - _bgBox.css('padding-top').split('px')[0]*2 +'px'});
								_video.find('.youtube-placeholder').height(9*_video.width()/16);
							}
							
						},100);
					}
					if(navigator.userAgent.indexOf("Android 2") != -1){
						$(_box).addClass('android2');
						if(!_scrlBox.find('jspContainer').length){
							_scrlBox.jScrollPane({mouseWheelSpeed : 20, autoReinitialise:true});
						}
					}
				}
			}
		}
		function allSepecsContent(_id,_data){
			switch(opts.type){
				case 'video' :
					setupLightBoxContainer();
					//var youku = (class_.indexOf('youku-video') > -1)? ' youku-player' : '';
					var _addClass = '';
					if(class_.match(/youku-video|youku-player/)){
						_addClass = ' youku-player';
						var _yid;
					}else if(class_.indexOf('chan-pana') > -1){
						_addClass = ' chan-pana';
					}
					var _videoObj = $('<div class="video"></div>');
					$(_videoObj).append('<div><div class="youtube-placeholder'+_addClass+'" src="'+_data+'" data-clientid="'+opts.client_id+'"  data-editmode="'+opts.editmode+'" data-endmessage="'+opts.endmessage+'"></div></div>');
					///$(_id).append('<div class="video"><div><div class="youtube-placeholder'+_addClass+'" src="'+_data+'" data-clientid="'+opts.client_id+'"  data-editmode="'+opts.editmode+'"></div></div></div>');
					
					/*if(opts.video_caption || opts.video_btnlink)  $(_videoObj).children('div').append('<div class="video-caption-link"></div>');
					if(opts.video_caption)  $(_videoObj).find('.video-caption-link').append('<p><span class="bodycopy1">'+opts.video_caption+'</span></p>');
					if(opts.video_btnlink && opts.video_btnname)  $(_videoObj).find('.video-caption-link').append('<div class="learnmore"><a href="'+opts.video_btnlink+'"><span>'+opts.video_btnname+'</span></a></div>');*/
					
					if(opts.video_caption || opts.videobtns.length)  $(_videoObj).children('div').append('<div class="video-caption-link"></div>');
					if(opts.video_caption) {
						var $videoCaption = $('#'+opts.video_caption);
						if ($.trim($videoCaption.text())) {
							$(_videoObj).find('.video-caption-link').append($videoCaption.html());
						}
					}
					if(opts.videobtns.length){
						$(_videoObj).find('.video-caption-link').append('<div class="learnmore"></div>');
						$.each(opts.videobtns, function(index, value){
							var html = '<a href="'+value.btnlink+'"><span>'+value.btntitle+'</span></a>';
							$(_videoObj).find('.video-caption-link .learnmore').append('<a href="'+value.btnlink+'" target="'+value.btntarget+'"><span>'+value.btntitle+'</span></a>');
						});
					}
					
					$(_id).append(_videoObj);
					var _yph = $(_id).find('.youtube-placeholder');
					_yph.height(9*_yph.parent().parent().width()/16);
					YouTubeUtils.setupPlayer(_yph,'onlightbox');
					setTimeout(function(){
						sizeSetting('#modalwindow-wrapper');
					},100);
				break;
				default : 
					$(_id).append(
						'<div class="lightbox" id="printme">\
							<div class="lightbox_title">\
								<a href="javascript:void(0);" class="printbut"><span>'+opts.alt[1]+'</span></a></div>\
							<div class="modal_content"><div class="lightbox-content"></div></div>\
						</div>\
					');
					//$(_id).find('.lightbox_title h1 span').load(_data+' #browsebar-name .name', function(responseText, statusText, xhr){
						$(_id).find('.lightbox-content').eq(0).load(_data+' #sections .wpmparsys', function(responseText, statusText, xhr){
							setupLightBoxContainer();
							sizeSetting('#modalwindow-wrapper');
							$(_id).find('.printbut').on('click', this, function(e){
								$(_id).append('<div id="printdoc"></div>');
								var _printObj = $(_id).find('#printdoc');
								//$('<div class="lightbox_title"></div>').clone().appendTo(_printObj);
								//$(_id).find('.lightbox_title .Title').clone().appendTo($(_printObj).find('.lightbox_title'));
								$(_id).find('.lightbox-content').clone().appendTo(_printObj);
								if(!$.support.opacity){
									$(_printObj).find('section').children().unwrap();
								}
								printIt($(_printObj).html(), printStyle);
								$(_printObj).remove();
								e.preventDefault();
								return false;
							});
						});
					//});
				break;
			}
		}
	}
	$.fn.modalwindow.defaults = {
		type : 'default',
		client_id : '',
		editmode : 'false',
		alt : ['CLOSE','PRINT'],
		callback : function(){
		},
		onClose : function(){
		}
	}
})(jQuery);

//Announcements
function renderAnnoucements(targetId){
	$('#'+targetId+' .announcementsContainer').renderAnnoucements();
}
;(function($){
	$.fn.renderAnnoucements = function(){
		$.each(this, function(index, value){
			var _container = $(this);
			var _newslist = _container.find('.newslist');
			var _newsTabs = _container.find('.newscatTabs');
			var _imgLen = (_newslist.children().attr('data-imglen') && _newslist.children().attr('data-imglen')!='')? _newslist.children().attr('data-imglen') : _newslist.find('li').length;
			if(_newslist.find('.imageL, .imageM, .imageS').length){
				 imgShow(_imgLen);
				 //dtWidth();
				 if($(this).closest('.ui-tabs').length){
					 $(this).closest('.ui-tabs').on('tabsactivate', function(event, ui){
						 dtWidth();
						 $(this).closest('.ui-tabs').tabs('refresh');
					 });
				 }
			}
			if(_newsTabs.length){
				setAria();
			}
			_newsTabs.find('li a').each(function(index, element) {
				if($(this).parent().hasClass('all')){
					$(this).addClass('selected').attr('aria-selected','true');
				}
				$(this).on('click', function(e){
					if($(this).parent().hasClass('all')){
						_newslist.find('li').show();
						if(_newslist.find('li').length){
							_newslist.find('.notfound').hide();
						}
					}else{
						var tag = $(this).text();
						var count = 0;
						_newslist.find('li').each(function() {
							if($(this).attr('data-cat')==tag){
								$(this).show();
								count++;
							}else{
								$(this).hide();
							}
						});
						if(count==0){
							_newslist.find('.notfound').show();
						}else{
							_newslist.find('.notfound').hide();
						}
					}
					imgShow(_imgLen);
					$(this).addClass('selected').parent().attr('aria-selected','true');
					$(this).parent().siblings().children('a').removeClass('selected').parent().attr('aria-selected','false');
					e.preventDefault();
					return false;
				});
			});
			_newsTabs.find('ul').on('keydown',function(e){
				var _obj;
				var _current = $(':focus');
				var _index = _current.parent().index();
				var btns = $(this).find('li a')
				var _len = btns.length;
				if (e.keyCode == 37 || e.keyCode == 38) {
					if(_index == 0){
						_index = _len-1;
					}else{
						_index --; 
					}
					btns.eq(_index).attr('tabindex','0').focus();
					btns.eq(_index).parent().siblings().find('a').attr('tabindex','-1');
					e.preventDefault();
					return false;
				}
				if (e.keyCode == 39 || e.keyCode == 40 ) {
					if(_index == _len-1){
						_index = 0;
					}else{
						_index ++;
					}
					btns.eq(_index).attr('tabindex','0').focus();
					btns.eq(_index).parent().siblings().find('a').attr('tabindex','-1');
					e.preventDefault();
					return false;
				}
			});
			if($(this).closest('.ui-tabs').length){
				$(this).closest('.ui-tabs').tabs( "refresh");
				if(!$('html').hasClass('touch-device') && $('#page').css('min-width') != '320px'){
					$(this).closest('.scrollbox').jScrollPane({
						autoReinitialise : true,
						mouseWheelSpeed : 20
					});
				}
			}
			function dtWidth(){
				if($('#page').css('min-width')!='320px' && _newslist.children().hasClass('horizontal')){
					_newslist.find('dl dt').width('auto');
					var maxWidth = Math.max.apply(null, $.makeArray(_newslist.find('.news-image:not(.show) + dl dt, dl:first-child dt').map(function() {return $(this).width();})));
					_newslist.find('.news-image:not(.show) + dl dt, dl:first-child dt').width(maxWidth+1);
				}
			}
			function imgShow(num){
				var counter = 0;
				_newslist.find('li').each(function(index, element) {
					var newsimage = $(this).find('.news-image');
					if($(this).css('display')!='none'){
						if(counter < num){
							newsimage.addClass('show');
							newsimage.show();
						}else{
							newsimage.removeClass('show');
							newsimage.hide();
						}
						counter++;
					}
				});
				dtWidth();
			}
			function setAria(){
				initAria();
				_newsTabs.attr('role','tablist');
				_newslist.attr('role','tabpanel');
				_newsTabs.find('li').each(function(index, element) {
					$(this).attr('role','tab');
				});
			}
			function initAria(){
				_newsTabs.find('li a').each(function(index, element) {
					if(index==0){
						$(this).attr('tabindex','0');
					}else{
						$(this).attr('tabindex','-1');
					}
					$(this).parent().attr('aria-selected','false').attr('tabindex','-1');
				});
				_newslist.attr('aria-expanded','true').attr('aria-hidden','false');
			}
		});
	}
})(jQuery);


//hero slider
/* mod start (scsk)
jQuery(function($){
*/
;(function($){
// mod end (scsk)
	var heroSlider = function(){
		var _heroContainer,_tabs;
		this.init = function(id){
			_heroContainer = $(id);
			_tabs = _heroContainer.find('.hero-tabs').eq(0);
			startSlideSetUp();
		}
		function startSlideSetUp(){
			var startSlide = _heroContainer.find('#startup');
			var startSlideSlider = startSlide.find('.slider');
			var altPrev = _heroContainer.find('.slider-wrapper').eq(1).find('.slide-controller .prev img').attr('alt');
			var altNext = _heroContainer.find('.slider-wrapper').eq(1).find('.slide-controller .next img').attr('alt');
			startSlide.find('.slide-controller .prev img').attr('alt',altPrev);
			startSlide.find('.slide-controller .next img').attr('alt',altNext);
			if(_heroContainer.find('.slider-wrapper').length > 2){
				_heroContainer.find('.slider-wrapper').each(function(index, element){
					var _obj = $(this).find('.slide-block').eq(0).clone();
					startSlideSlider.append(_obj);
				});
				tabSetUp(0);
				// add start (scsk)
				$('.copyguard', startSlideSlider).copyguardImage();
				// add end (scsk)
			}else{
				_tabs.find('.tabs-menu').hide();
				tabSetUp(1);
			}
		}
		function tabSetUp(_num){
			var opt = {};
			
			opt = {
				active: _num,
				create: function( event, ui ) {
					$(ui.panel).attr('tabindex','0');
					var _s = $(ui.panel).find('.slider');
					slider(_s);
					var _pauseBtn = $(ui.panel).find('.slider-wrapper').eq(0).find('.btn-pause');
					if($(ui.panel).find('.slider').find('.slide-block').length == 1){
						_pauseBtn.hide();
					}
				},
				activate: function( event, ui ) {
					var _ns = $(ui.newPanel).find('.slider');
					var _os = $(ui.oldPanel).find('.slider');
					var _active = _tabs.tabs('option', 'active');
					var _pauseBtn = _ns.parents('.slider-wrapper').eq(0).find('.btn-pause');
					_tabs.tabs('disable', 0 );
					_os.trigger('stop');
					if(_ns.parents('.caroufredsel_wrapper').length==0){
						slider(_ns);
					}else{
						_ns.trigger("updateSizes");
						_ns.trigger('play',true);
					}
					if(_heroContainer.hasClass('paused')){
						_ns.trigger('pause');
						_pauseBtn.find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-play.png').attr('alt','Play');
					}else{
						_pauseBtn.find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-pause.png').attr('alt','Pause');
					}
					if(_ns.find('.slide-block').length == 1){
						_pauseBtn.hide();
					}
					$(ui.newPanel).attr('tabindex','0');
					$(ui.oldPanel).removeAttr('tabindex');
				}
			};
			_tabs.tabs(opt);
			if($('#page').css('min-width')=='320px'){
				_tabs.find('.tabs-menu-text').text(_tabs.find('.tabs-menu-select-mob option').eq(0).text());
				_tabs.find('.tabs-menu-select-mob').on('change',function(){
					_tabs.tabs('option', 'active', $(this).val());
					_tabs.find('.tabs-menu-select-mob option').eq(0).attr({'disabled':'disabled'})
					_tabs.find('.tabs-menu-text').text(_tabs.find('.tabs-menu-select-mob option').eq($(this).val()).text());
				});
				$(window).on('resize', function(e){
					// add start (scsk)
					if (!_tabs.data('ui-tabs')) {
						return;
					}
					// add end (scsk)
					var atcive = _tabs.tabs( "option", "active" );
					var maxH = 0;
					_tabs.find('.ui-tabs-panel').eq(atcive).find('.slider .slide-block').each(function(index, element){
						if($(this).outerHeight() > maxH){
							maxH = $(this).outerHeight();
						}
					});
					_tabs.find('.ui-tabs-panel').eq(atcive).find('.caroufredsel_wrapper,.slider').height(maxH);
					//_tabs.find('.ui-tabs-panel').eq(atcive).find('.slider').trigger('updateSizes');
				});
			}
		}
		function slider(_target){
			var carousel = $(_target);  
			var children =  carousel.children();
			var container = carousel.parent();
			var paginator = container.find('.paginator');
			var width = container.width();
			var height = container.height();
			var countSlides = children.size();
			var dotname = 'icn-slideshow-dot';
			initAria();
			carousel.carouFredSel({
				scroll: { 
					duration : 800,
					onBefore : function(data){
						/*children.each(function(index, element){
							$(this).find('a').attr('tabindex', '-1');
						});
						data.items.visible.find('a').attr('tabindex', '0');*/
					},
					onAfter : function(data){
						insertDots(container);
						data.items.visible.addClass('activePanel').attr('aria-expanded','true').attr('aria-hidden','false');
						$(data.items.visible).siblings().removeClass('activePanel').attr('aria-expanded','false').attr('aria-hidden','true');
						// add start (scsk)
						carousel.trigger('slideScrollAfter.gwc');
						// add end (scsk)
					}
				},
				width: '100%',
				height: 'auto',
				responsive: true,
				onCreate : function(data){
					pauseToggle();
					focusDots();
					videobths();
				},
				pagination: {
					container: paginator, 
					keys: true,
					anchorBuilder   : function(nr,item) {
						var currPos = carousel.triggerHandler('currentPosition');
						if(currPos !== undefined ? (currPos + 1 == nr) : nr==1){
							return '<span role="tab"><a href="#" class="dots"><span><img src="/etc/designs/panasonic/common-clientlibs/images/'+dotname+'-on.png" alt="'+nr+'"></span></a></span>'
						}else{
							return '<span role="tab"><a href="#" class="dots"><span><img src="/etc/designs/panasonic/common-clientlibs/images/'+dotname+'-off.png" alt="'+nr+'"></span></a></span>'
						}
					}
				},
				prev: container.find('.prev'),
				next: container.find('.next'),
				auto: {
					timeoutDuration : 6000
				},
				swipe : {
					onMouse : true,
					onTouch : true
				}
			});
			function videobths(){
				carousel.find('.seemore.type-video').each(function(e){
					$(this).children('a').on('click',function(e){
						if(!_heroContainer.hasClass('paused')){
							_heroContainer.addClass('paused');
							carousel.trigger('pause');
							container.find('.btn-pause').find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-play.png').attr('alt','Play');
							playVideo(this,{
								onClose : function(){
									_heroContainer.removeClass('paused');
									carousel.trigger('play');
									container.find('.btn-pause').find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-pause.png').attr('alt','Pause');
								}
							});
						}else{
							playVideo(this);
						}
						e.preventDefault();

						/*var _opt = {};
						var data = $(this).attr('data-video-src');
						var _alt = [$(this).parent().attr('data-close-alt'), ''];
						var _videobtns = [];
						_opt.type = 'video';
						_opt.alt = _alt;
						if($('#page').css('min-width')=='320px'){
							_opt.onClose = function(){
								_heroContainer.removeClass('paused');
								carousel.trigger('play');
								container.find('.btn-pause').find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-pause.png').attr('alt','Pause');
							}
						}
						if( ($(this).attr('data-link') && $(this).attr('data-link')!='') && ($(this).attr('data-link-title') && $(this).attr('data-link-title')!='')){
							_videobtns.push({btnlink : $(this).attr('data-link'), btntitle : $(this).attr('data-link-title')});
						}
						if( ($(this).attr('data-link2') && $(this).attr('data-link2')!='') && ($(this).attr('data-link2-title') && $(this).attr('data-link2-title')!='')){
							_videobtns.push({btnlink : $(this).attr('data-link2'), btntitle : $(this).attr('data-link2-title')});
						}
						_opt.videobtns = _videobtns;
						if($(this).attr('data-caption') && $(this).attr('data-caption')!='') _opt.video_caption = $(this).attr('data-caption');
						$(this).modalwindow(data, 'dynamicHomepage',_opt);
						e.preventDefault();*/
					});
				});
			}
			function insertDots(_container){
				paginator.find(' .dots').each(function(index, element) {
					if($(this).parent().hasClass('selected')){
						$(this).attr('tabindex','0');
						$(this).find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/'+dotname+'-on.png');
					}else{
						$(this).attr('tabindex','-1');
						$(this).find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/'+dotname+'-off.png');
					}
				});
			}
			function pauseToggle(){
				var pausebtn = container.find('.btn-pause');
				if(children.length == 1){
					pausebtn.hide();
				}
				pausebtn.on('click',function(e) {
					if(_heroContainer.hasClass('paused')){
						_heroContainer.removeClass('paused');
						carousel.trigger('play');
						$(this).find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-pause.png').attr('alt','Pause');
					}else{
						_heroContainer.addClass('paused');
						carousel.trigger('pause');
						$(this).find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-play.png').attr('alt','Play');
					}
				});
			}
			function initAria(){
				paginator.attr('role','tablist');
				children.attr('role','tabpanel').attr('aria-expanded','false').attr('aria-hidden','true');
				children.eq(0).addClass('activePanel').attr('aria-expanded','true').attr('aria-hidden','false');
				children.append('<span class="focusEnd" tabindex="0"></span>').prepend('<span class="focusFirst" tabindex="0"></span>');
				container.append('<span class="focusEnd" tabindex="0"></span>').prepend('<span class="focusFirst" tabindex="0"></span>');
				container.find('.prev').attr('tabindex','-1');
				container.find('.next').attr('tabindex','-1');
				container.find('.btn-pause').on({
					focus: function(e){
						if($('html').hasClass('pressTabkey')){
							_heroContainer.addClass('paused');
							carousel.trigger('pause');
							$(this).find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-play.png').attr('alt','Play');
						}
					},
					keydown: function(e){
						if(e.keyCode == 9 && e.shiftKey == true){
							container.children('.focusFirst').focus();
							return false;
						}
					}
				});
				container.children('.focusFirst').on({
					keydown: function(e){
						if(e.keyCode == 9 && e.shiftKey == false){
							container.find('.btn-pause').focus();
							return false;
						}
					}
				});
				container.children('.focusEnd').on({
					keydown: function(e){
						if(e.keyCode == 9 && e.shiftKey == true){
							children.filter('.activePanel').find('.focusEnd').focus();
							return false;
						}
					}
				});
				children.children('.focusFirst').on({
					keydown: function(e){
						if(e.keyCode == 9 && e.shiftKey == true){
							paginator.find('.selected a').focus();
							return false;
						}
					}
				});
				children.children('.focusEnd').on({
					keydown: function(e){
						if(e.keyCode == 9 && e.shiftKey == false){
							container.children('.focusEnd').focus();
							return false;
						}
					}
				});
			}
			function focusDots(){
				paginator.on('keydown',function(e){
					var _obj;
					var _current = $(this).find('.selected > a');
					var _index = _current.parent().index();
					var btns = $(this).children('span').children('a');
					var _len = btns.length;
					if (e.keyCode == 37 || e.keyCode == 38) {
						if(_index == 0){
							_index = _len-1;
						}else{
							_index --; 
						}
						btns.eq(_index).attr('tabindex','0').focus();
						btns.eq(_index).parent().siblings().children('a').attr('tabindex','-1');
						e.preventDefault();
						return false;
					}
					if (e.keyCode == 39 || e.keyCode == 40 ) {
						if(_index == _len-1){
							_index = 0;
						}else{
							_index ++;
						}
						btns.eq(_index).attr('tabindex','0').focus();
						btns.eq(_index).parent().siblings().children('a').attr('tabindex','-1');
						e.preventDefault();
						return false;
					}
					if (e.keyCode == 9 ){
						if(e.shiftKey == true){
							container.find('.btn-pause').focus();
						}else{
							carousel.find('.activePanel .focusFirst').focus();
						}
						$(this).find('.selected').children().attr('tabindex','0');
						$(this).find('.selected').siblings().children().attr('tabindex','-1');
						return false;
					}
				});
				paginator.on('focus', 'a', function(e){
					carousel.trigger("slideTo", paginator.children().index($(this).parent()));
				});
			}
		}
	};

	// mod start (scsk)
/*
	var HeroSlider = new heroSlider();
	HeroSlider.init('#hero');
});
*/
	$.fn.heroSlider = function() {
		return $(this).each(function() {
			new heroSlider().init(this);
			$(this).trigger('ready.hero-slider.gwc');
		});
	};
	// mod end (scsk)
})(jQuery);
// mod end (scsk)


//play video
function playVideo(_vbtn,_options){
	(function($){
		var _opt = {};
		var data = $(_vbtn).attr('data-video-src');
		var _alt = [$(_vbtn).attr('data-close-alt'), ''];
		var _videobtns = [];
		var _class = $(_vbtn).attr('class');
		_opt = $.extend({}, _opt, _options); 
		_opt.type = 'video';
		_opt.alt = _alt;
		if(_class){
			if(_class.match(/youku-player|youku-video/)){
				_opt.client_id = $(_vbtn).attr('data-clientid');
			}
			if(_class.match(/chan-pana/)){
				_opt.endmessage = $(_vbtn).attr('data-endmessage');
			}
		}
		/*if($('#page').css('min-width')=='320px'){
			_opt.onClose = function(){
				_heroContainer.removeClass('paused');
				carousel.trigger('play');
				container.find('.btn-pause').find('img').attr('src','/etc/designs/panasonic/common-clientlibs/images/btn-pause.png').attr('alt','Pause');
			}
		}*/
		if( ($(_vbtn).attr('data-link') && $(_vbtn).attr('data-link')!='') && ($(_vbtn).attr('data-link-title') && $(_vbtn).attr('data-link-title')!='')){
			_videobtns.push({btnlink : $(_vbtn).attr('data-link'), btntitle : $(_vbtn).attr('data-link-title'), btntarget : $(_vbtn).attr('data-link-target') && $(_vbtn).attr('data-link-target')!='' ? $(_vbtn).attr('data-link-target') : '_self'});
		}
		if( ($(_vbtn).attr('data-link2') && $(_vbtn).attr('data-link2')!='') && ($(_vbtn).attr('data-link2-title') && $(_vbtn).attr('data-link2-title')!='')){
			_videobtns.push({btnlink : $(_vbtn).attr('data-link2'), btntitle : $(_vbtn).attr('data-link2-title'), btntarget : $(_vbtn).attr('data-link2-target') && $(_vbtn).attr('data-link2-target')!='' ? $(_vbtn).attr('data-link2-target') : '_self'});
		}
		_opt.videobtns = _videobtns;
		if($(_vbtn).attr('data-caption') && $(_vbtn).attr('data-caption')!='') _opt.video_caption = $(_vbtn).attr('data-caption');
		$(_vbtn).modalwindow(data, 'dynamicHomepage '+_class, _opt);
	})(jQuery);
}

//pushcontents
jQuery(function($){
	/* mod start (scsk)
	$('#pushcontents').find('a.type-video').each(function(index, element) {
		$(this).on('click', function(e){
			playVideo(this);
			e.preventDefault();
		});
	});
	*/
	$(document).on('click', '#pushcontents a.type-video', function(e){
		playVideo(this);
		e.preventDefault();
	});
	// mod end (scsk)
});

jQuery(function($){
	var newslist = function(){
		var container = $('#newslist');
		var header = $('#newslist-header');
		var contents = $('#newslist-contents');
		var _newsTabs = header.find('ul');
		if(!$('html').hasClass('touch-device') && $('#page').css('min-width') != '320px'){
			contents.find('.scrollbox').eq(0).jScrollPane({
				autoReinitialise : true,
				mouseWheelSpeed : 20
			});
		}
		setAria();
		header.find('li > a').each(function(index, element) {
			var tag = $(this).attr('data-tag');
			$(this).on('click focus',function(e) {
				if(tag != 'all'){
					contents.find('dl').each(function(index, element) {
						if($(this).hasClass(tag)){
							$(this).css('display','block');
						}else{
							$(this).css('display','none');
						}
					});
				}else{
					contents.find('dl').css('display','block');
				}
				$(this).addClass('selected');
				$(this).parent().siblings().children('a').removeClass('selected');
				//$(this).parent().
				return false;
			});
			if(index==0 && $(this).attr('data-tag')!='all'){
				contents.find('dl').each(function(index, element) {
					if($(this).hasClass(tag)){
						$(this).css('display','block');
					}else{
						$(this).css('display','none');
					}
				});
			}
		});
		_newsTabs.on('keydown',function(e){
			var _obj;
			var _current = $(':focus');
			var _index = _current.parent().index();
			var btns = $(this).find('li a')
			var _len = btns.length;
			if (e.keyCode == 37 || e.keyCode == 38) {
				if(_index == 0){
					_index = _len-1;
				}else{
					_index --; 
				}
				btns.eq(_index).attr('tabindex','0').focus();
				btns.eq(_index).parent().siblings().find('a').attr('tabindex','-1');
				e.preventDefault();
				return false;
			}
			if (e.keyCode == 39 || e.keyCode == 40 ) {
				if(_index == _len-1){
					_index = 0;
				}else{
					_index ++;
				}
				btns.eq(_index).attr('tabindex','0').focus();
				btns.eq(_index).parent().siblings().find('a').attr('tabindex','-1');
				e.preventDefault();
				return false;
			}
		});
		function setAria(){
			initAria();
			_newsTabs.attr('role','tablist');
			contents.attr('role','tabpanel').attr('tabindex','0');
			_newsTabs.find('li').each(function(index, element) {
				$(this).attr('role','tab');
			});
		}
		function initAria(){
			_newsTabs.find('li a').each(function(index, element) {
				if(index==0){
					$(this).attr('tabindex','0');
				}else{
					$(this).attr('tabindex','-1');
				}
				$(this).parent().attr('aria-selected','false').attr('tabindex','-1');
			});
			contents.attr('aria-expanded','true').attr('aria-hidden','false');
		}
	}
	newslist();
	
	$('#newstabs').each(function(index, element) {
		var activeTab = $(this).attr('data-active') && $(this).attr('data-active')!='' ? $(this).attr('data-active') : 0;
		if($('#newstabs-in > ul').find('li').length ==1 && !$('#newstabs-in > ul').find('li').eq(0).children('a').length){
			$(this).children('h2').append($('#newstabs-in > ul').find('li').html());
			$('#newstabs-in > ul').hide();
		}else{
			$(this).children('#newstabs-in').tabs({
				active : activeTab,
				heightStyle : (function(){
					if($('#page').css('min-width')!='320px'){
						return'auto'
					}
				})(),
				create : function(event, ui){
					$(ui.tab).find('.rss_icon a').attr('tabindex','0');
					$(ui.tab).siblings().find('.rss_icon a').attr('tabindex','-1');
				},
				activate : function(event, ui){
					$(ui.newTab).find('.rss_icon a').attr('tabindex','0');
					$(ui.newTab).siblings().find('.rss_icon a').attr('tabindex','-1');
				}
			});
		}
	});

	var snsgadgets = function() {
	    $.ajax({ 
			type: "GET",
			//url: "/recover/dummy_sns4.js",// debug 
			url: "/servlet/ajax/sns/timeline?_=0",
			dataType:"script",
			success: function (data) {
				$("#snsgadgets").tabs({});
			}
		});
	}
	if($("#snsgadgets").length){
		snsgadgets();
	}
	
	swapImg("#newslist-contents dd a", '-ro');
	swapImg("#pushcontents a", '-ro', '.icn-externallink');
	swapImg("#campaign a", '-ro', '.icn-externallink');
});

// add start (scsk)
!function($) {
	// for Mbox
	$(document).on('at-embedded.gwc',function(e, params){
		if (!params) {
			return;
		}
		var $target = $(params.at_content);
		if (params.offer_url) {
			$.ajax({
				url: params.offer_url,
				dataType: 'html'
			}).done(function(data) {
				$target.html(data);
				if ($target.closest('#hero').size() > 0) {
					$target.heroSlider();
				}
				$('.copyguard', $target).copyguardImage();
			}).always(function() {
				$target.css('visibility', 'visible');
			});
		} else {
			$target.css('visibility', 'visible');
		}
	});

	$(function() {
		// for AIC
		$('#hero').on('ready.hero-slider.gwc', function() {
			function loadSlideImagesAsNeed($targetSlider) {
				var $currentVisibleSilide = $targetSlider.children().first();
				var $targetSlideConts = $currentVisibleSilide.add($currentVisibleSilide.next()).add($currentVisibleSilide.nextAll(':last-child'));
				$targetSlideConts.find('[data-type="img-conv"]').each(function() {
					$(this).on('imageconverted.gwc',function(){
						if(isMobile() && navigator.userAgent.match(/Android/i)){
							var $parent = $(this).parent();
							$parent.children().detach().appendTo($parent);
						}
					}).imageConverter();
				});
			}
			// each slider
			// on slideScrollAfter for carousel
			$('.slider').on('slideScrollAfter.gwc', function() {
				// load current visible slide image, prev slide image and next slide image.
				loadSlideImagesAsNeed($(this));
			}).filter(function() {
				var $target = $(this);
				// filtering: features-slider of first tab and getinspired-slider
				var $heroTabs = $target.closest('.hero-tabs');
				if (!!$heroTabs.data('ui-tabs') && $('.slider', $heroTabs).index($target) !== $heroTabs.tabs('option', 'active')) {
					return false;
				}
				return true;
			}).each(function() {
				// load init display images for first carousel
				loadSlideImagesAsNeed($(this));
			});
			$('.hero-tabs').on('tabsactivate', function(event, ui) {
				loadSlideImagesAsNeed($('.slider', ui.newPanel));
			});
		}).heroSlider();
	});
}(jQuery);
// add end (scsk)