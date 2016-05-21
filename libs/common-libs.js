// add start scsk
var _gaq = _gaq || [];
// add end scsk
var browser = "";
(function(){
	if(!jQuery.support.opacity){
    	if(!jQuery.support.tbody){
			browser = "ie7or6";
		}else{
			browser = "ie8";
   		}
	}
});

/* BUILD VERSION 0.1.83 */
var addthis_config = addthis_config || {};
addthis_config.ui_offset_top = 0;
var isMobile;
/* -start- embeded by scsk ------------------------------------- */
var GwcCommon = {
	/* cookie-policy related utilities. */
	cookiePolicyOptIn: $.Deferred(),
	isCookieUsable: function(){return !window.CookiePolicy || cookieStatus == 0;},

	/*
	 * After logging in, viewing a non-authenticated pages to redirect to the authentication page path.
	 */
	authAreaForwardPath: '',
	/*
	 * Gets the forwardPath.
	 * GwcCommon.authAreaForwardPath(if specified) or own page path.
	 */
	getForwardPath: function() {
		return GwcCommon.authAreaForwardPath || document.location.pathname;
	},
	getSamlUrl: function(basePath) {
		var params = {relayState: document.location.pathname, d: document.domain};
		if (basePath.match(/\{0\}/)) {
			return basePath.replace(/\{0\}/, 'relay=' + encodeURIComponent('relayState='+params.relayState+'&d='+params.d));
		}
		return basePath + '?' + $.param(params);
	},
	replaceUrlForLogin: function(target) {
		$(target).prop('href', GwcCommon.getSamlUrl($.trim($('#sp_sso_login_url_eu').text()) || 'https://' + document.domain + '/servlet/saml/login'));
	},
	replaceUrlForLogout: function(target) {
		$(target).prop('href', GwcCommon.getSamlUrl($.trim($('#sp_sso_logout_url_eu').text()) || 'https://' + document.domain + '/servlet/saml/logout'));
	}
};
/* -end- embeded by scsk ------------------------------------- */

jQuery(function($){
	/* -start- embeded by scsk ------------------------------------- */
	isMobile = function(){
		if($('#page').css('min-width')=='320px'){
			return true;
		}
		return false;
	}
	/* -end- embeded by scsk ------------------------------------- */
	if((navigator.userAgent.indexOf("iPhone") != -1)||(navigator.userAgent.indexOf("Android") != -1)||(navigator.userAgent.indexOf('iPod')  !=-1)||(navigator.userAgent.indexOf('iPad')  !=-1)){
		$('html').addClass('touch-device');
	}
	$(document).keydown(function(e) {
		Code = e.keyCode || e.which;
		if(Code == 9){
			$('html').addClass('pressTabkey');
			//$('a:focus, area:focus, input:focus, select:focus, textarea:focus, button:focus, iframe:focus, object:focus, embed:focus').css('outline','dotted 1px invert');
		}
	});
	var placeholder = {
	  init: function(formId, attrs){
		if(attrs.length > 0 && attrs!=undefined && $('#'+formId).is('form')){
		  placeholder.addValues(formId, attrs);
		  placeholder.focus(formId, attrs);
		  placeholder.blur(formId, attrs);
		  placeholder.submit(formId, attrs);
		}
	  },
	  addValues: function(formId, attrs){
		$('#'+formId).addClass('no-submitform');
		for(var x=0; x<attrs.length; x++ ){
		  var input = $('#'+formId+' '+'#'+attrs[x].id);
		  input.attr('value',attrs[x].value);
		  input.addClass('placeholder');
		  input.addClass('no-submit');
		}
	  },
	  focus: function(formId, attrs){
		$('#'+formId+' '+'.'+'placeholder').focus(function(){
		  var target = $(this);
		  for(var x=0; x<attrs.length; x++ ){
			if(target.attr('id')==attrs[x].id && target.val()==attrs[x].value){
			  target.val('');
			  target.removeClass('no-submit');
			  target.parent().removeClass('no-submitform');
			  break;
			}else if(target.attr('id')==attrs[x].id && target.val()!=attrs[x].value &&  target.val()!=''){
			  target.removeClass('no-submit');
			  target.parent().removeClass('no-submitform');
			  break;
			}
		  }
		});
	  },
	  blur: function(formId, attrs){
		$('#'+formId+' '+'.'+'placeholder').blur(function(){
		  var target = $(this);
		  for(var x=0; x<attrs.length; x++ ){
			if(target.attr('id')==attrs[x].id && target.val()===""){
			  //target.attr('value', attrs[x].value);
			  target.addClass('no-submit');
			  target.parent().addClass('no-submitform');
			  target.val(attrs[x].value);
			  break;
			}
			else{
			  target.removeClass('no-submit');
			  target.parent().removeClass('no-submitform');
			}
		   } 
		});
	  },
	  submit: function(formId, attrs){
		var form, valid;
		form = $('#'+formId);
		form.submit(function(){
			var target = $(this).find('.placeholder');
		  if(form.children().hasClass('no-submit') || target.val()==""){
			return false;
		  }
		  return true;
		});
	  }
	}

	var blurTxt = $('#searchformhead label').text();
	placeholder.init('searchformhead',
	[{
		id:'s',
		value: blurTxt
	}]
	);
	var searchFormPlaceholderValue = $('#searchPageForm #sp').val();
	placeholder.init('searchPageForm',
			[{
			  id:'sp',
			  value:searchFormPlaceholderValue
			}]
	);
	
	/* add start */
	if (!isMobile()) {
		var headerPanelImageLoader = function($base) {
			var $d_imageLoaded = $.Deferred();
			var $targetImages = $('.img-element img[data-type="delay-load"]', $base).filter(function() {
				return !$(this).data('ic-state');
			});
			if ($targetImages.size() > 0) {
				$targetImages.on('imageconverted.gwc', function() {
					$d_imageLoaded.resolve(this);
				}).imageConverter();
			} else {
				$d_imageLoaded.resolve($targetImages);
			}
			return $d_imageLoaded.promise();
		};
		$(window).on('load', function() {
			setTimeout(headerPanelImageLoader, 200, '#navmenucat');
		});
	}
	/* add end */

	// Function to initialize the header panel navigation
	var initializeHeaderPanelNavigation = function() {
		var navmenucats = $('#navmenucats');
		var inbread = navmenucats.find('.inbread');
		var product_text = $.trim($(".link-products").text());
		$('.inbread').html('<span>' + product_text + '</span>');
		var active_child;
		var bread = function(){
			inbread.find('a').on({'click': function(){
				var title = $(this).attr('title');
				var text = $(this).text();
				var nextAll = $(this).parent().nextAll().addClass('next');
				var indexNum = $(this).parent().index();
				active_child.children('li').children('.parbase').fadeOut('fast',function(){
					if(indexNum <= 0){
						navmenucats.find('.parrays > ul > li > .parbase').fadeIn();
					}else{
						active_child.parent().parent('ul').children('li').children('.parbase').fadeIn(function(){
							active_child = $(this).parent().parent();
						});
					}
				});
				nextAll.remove();
				$(this).parent().html(text)
				return false;
			}});
		}
		navmenucats.find('.parbase > a').on({'click': function(){
			var href = $(this).attr('href');
			var child = $(this).parent('div').next('ul');
			if (child.length) {
				var active_cat = $(this).attr("title");
				var hide_item = $(this).parent().parent('li').parent('ul').children('li').children('.parbase');
				inbread.find('span').each(function(index, element) {
					if(!$(this).find('a').length){
						var text = $(this).text();
						$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
					}
				});
				inbread.append('<span class="subcat"> ' + active_cat + '</span>');
				hide_item.fadeOut('fast',function(){
					/* mod start
					child.children('li').children('.parbase').fadeIn('fast',function(){});
					*/
					if (!$(this).is($(child).siblings('.parbase'))) {
						return;
					}
					child.children('li').children('.parbase').fadeIn({
						duration: 'fast',
						complete: function(){}
					});
					/* mod end */
				});
				active_child = child;
				bread();
				return false;
			} else {
				return true;
			}
		}});
	}
	//initializeHeaderPanelNavigation();
	
	var initializeMegaPanelNavigation2 = function() {
		$('#globalheader-nav').find('.link-megaPanel').each(function(index, element) {
			var navmenucats = $('#' + $(this).attr('data-panelnav-id'));
			var _this = this;
			if(navmenucats.find('.parrays').children().hasClass('wrapper-noimage')){
				navmenucats.addClass('noimage');
			}			
			
			
			navmenucats.find('.btn-slide').on('click', function(e){
				$("#navmenucat .hide").slideUp('slow');
				$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				e.preventDefault();
			});
			
			
			var inbread = navmenucats.find('.inbread');
			var root_text = $.trim($(this).text());
			if(root_text=="") root_text='Root';
			inbread.html('<span>' + root_text + '</span>');
			var active_child;
			var bread = function(){
				inbread.find('a').on({
					'click': function(){
						var title = $(this).attr('title');
						var text = $(this).text();
						var nextAll = $(this).parent().nextAll().addClass('next');
						var indexNum = $(this).parent().index();
						var active_child_children_length = active_child.children('li,div.noimage-container').length;
						active_child.children('li,div.noimage-container').children('.parbase').each(function(index, val){
							$(this).fadeOut('fast',function(){
								active_child.removeAttr('style');
								if(indexNum <= 0){
									active_child.parent().parent('ul').removeAttr('style');
									navmenucats.find('.parrays > ul > li > .parbase').fadeIn({
										start : function(){
											active_child.closest('.megapannel').removeClass('noimage');
										},
										complete:function(){
											if(active_child_children_length-1 == index && $(this).parent().siblings().length == $(this).parent().index()){
												setHeight(navmenucats.find('.parrays > ul'));
											}
										}
									});
								}else{
									active_child.parent().parent('ul').children('li').children('.parbase').fadeIn({
										start : function(){
											active_child.closest('.megapannel').removeClass('noimage');
										},
										complete : function(){
											active_child = $(this).parent().parent();
										}
									});
								}
							});
						});
						
						nextAll.remove();
						$(this).parent().html(text);
						return false;
					}
				});
			}
			navmenucats.find('.parbase > a').on({
				'click': function(){
					var href = $(this).attr('href');
					var child = $(this).parent('div').next('ul,div.wrapper-noimage');
					if (child.length) {
						var active_cat = $(this).attr("title");
						var hide_item = $(this).parent().parent('li').parent('ul').children('li').children('.parbase');
						inbread.find('span').each(function(index, element) {
							if(!$(this).find('a').length){
								var text = $(this).text();
								$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
							}
						});
						inbread.append('<span class="subcat"> ' + active_cat + '</span>');
						child.show();
						hide_item.fadeOut('fast',function(){
							/* add start */
							if (!$(this).is($(child).siblings('.parbase'))) {
								return;
							}
							/* add end */
							child.children('li,div.noimage-container').children('.parbase').fadeIn({
								duration : 'fast',
								start : function(){
									setHeight(child);
								}
							});
						});
						active_child = child;
						bread();
						return false;
					} else {
						return true;
					}
				}
			});
			function setHeight(_elm){
				var parrays = $(_elm).closest('.parrays')
				var ph = parrays.height();
				var ch = $(_elm).height();
				parrays.stop().animate({height:ch+'px'},{duration:'fast'});
				if($(_elm).hasClass('wrapper-noimage')){
					$(_elm).closest('.megapannel').addClass('noimage');
				}else{
					$(_elm).closest('.megapannel').removeClass('noimage');
				}
				/*if(ch > 145){
					parrays.animate({height:ch+'px'},{duration:'fast'});
				}else{
					parrays.height(145);
				}*/
			}
		});		
		/*
		$('#globalheader-nav').find('.support').each(function(index, element) {
			var _this = this;
			if($('#link-products').find('.parrays').children().hasClass('wrapper-noimage')){
				$('#link-products').addClass('noimage');
			}	
			$(_this).on('click', function(e){
				$("#navmenucat .hide").slideUp('slow');
				$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				
			});
			
			
		});

		$('.megapannel').find('.support').each(function(index, element) {
			var _this = this;
			if($('#link-products').find('.parrays').children().hasClass('wrapper-noimage')){
				$('#link-products').addClass('noimage');
			}	
			$(_this).on('click', function(e){
				$("#navmenucat .hide").slideUp('slow');
				$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				
			});
			
			
		});	*/
		
		$('#page').find('.support').each(function(index, element) {
			var _this = this;
			if($('#link-products').find('.parrays').children().hasClass('wrapper-noimage')){
				$('#link-products').addClass('noimage');
			}	
			$(_this).on('click', function(e){
				$("#navmenucat .hide").slideUp('slow');
				$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				
			});
			
			
		});	
	
	}
	
	
	//megaPanelNavigation
	var initializeMegaPanelNavigation = function() {
		$('#globalheader-nav').find('.link-megaPanel').each(function(index, element) {
			var navmenucats = $('#' + $(this).attr('data-panelnav-id'));
			var _this = this;
			if(navmenucats.find('.parrays').children().hasClass('wrapper-noimage')){
				navmenucats.addClass('noimage');
			}			
			$(_this).on('click', function(e){
				if($('#kt_menu').hasClass('kt_menu_chua_kh')){
					//alert("ff");
					$('#kt_menu').removeClass("kt_menu_chua_kh");
					//$('#kt_menu').addClass("kt_menu_da_kh");
					initializeMegaPanelNavigation2();
					
				}
				if($(this).parent().hasClass('active')){
					$("#navmenucat .hide").slideUp('slow');
					$(_this).parent().removeClass("active");
				}else{
					if($("#navmenucat .hide").css('display')=='none'){
						navmenucats.show().siblings().hide();
						$("#navmenucat .hide").slideDown({
							duration : 'slow',
							start : function(){
							}
						});
						$(_this).parent().addClass("active");
					}else{
						$("#navmenucat .hide").slideUp('slow',function(){
							navmenucats.show().siblings().hide();
							$(_this).parent().siblings().removeClass('active');
							
							$("#navmenucat .hide").slideDown({
								duration : 'slow',
								start : function(){
								}
							});
							$(_this).parent().addClass("active");
						});
					}
				}
				
				e.preventDefault();
			});
			$('#link-products-2').on('click', function(e){
				if($('#kt_menu').hasClass('kt_menu_chua_kh')){
					//alert("ff");
					$('#kt_menu').removeClass("kt_menu_chua_kh");
					//$('#kt_menu').addClass("kt_menu_da_kh");
					initializeMegaPanelNavigation2();
					
				}
				if($(this).parent().hasClass('active')){
					$("#navmenucat .hide").slideUp('slow');
					$(_this).parent().removeClass("active");
				}else{
					if($("#navmenucat .hide").css('display')=='none'){
						navmenucats.show().siblings().hide();
						$("#navmenucat .hide").slideDown({
							duration : 'slow',
							start : function(){
							}
						});
						$(_this).parent().addClass("active");
					}else{
						$("#navmenucat .hide").slideUp('slow',function(){
							navmenucats.show().siblings().hide();
							$(_this).parent().siblings().removeClass('active');
							
							$("#navmenucat .hide").slideDown({
								duration : 'slow',
								start : function(){
								}
							});
							$(_this).parent().addClass("active");
						});
					}
				}
				
				e.preventDefault();
			});
			
			navmenucats.find('.btn-slide').on('click', function(e){
				$("#navmenucat .hide").slideUp('slow');
				$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				e.preventDefault();
			});
			
			
			var inbread = navmenucats.find('.inbread');
			var root_text = $.trim($(this).text());
			if(root_text=="") root_text='Root';
			inbread.html('<span>' + root_text + '</span>');
			var active_child;
			var bread = function(){
				inbread.find('a').on({
					'click': function(){
						var title = $(this).attr('title');
						var text = $(this).text();
						var nextAll = $(this).parent().nextAll().addClass('next');
						var indexNum = $(this).parent().index();
						var active_child_children_length = active_child.children('li,div.noimage-container').length;
						active_child.children('li,div.noimage-container').children('.parbase').each(function(index, val){
							$(this).fadeOut('fast',function(){
								active_child.removeAttr('style');
								if(indexNum <= 0){
									active_child.parent().parent('ul').removeAttr('style');
									navmenucats.find('.parrays > ul > li > .parbase').fadeIn({
										start : function(){
											active_child.closest('.megapannel').removeClass('noimage');
										},
										complete:function(){
											if(active_child_children_length-1 == index && $(this).parent().siblings().length == $(this).parent().index()){
												setHeight(navmenucats.find('.parrays > ul'));
											}
										}
									});
								}else{
									active_child.parent().parent('ul').children('li').children('.parbase').fadeIn({
										start : function(){
											active_child.closest('.megapannel').removeClass('noimage');
										},
										complete : function(){
											active_child = $(this).parent().parent();
										}
									});
								}
							});
						});
						
						nextAll.remove();
						$(this).parent().html(text);
						return false;
					}
				});
			}
			navmenucats.find('.parbase > a').on({
				'click': function(){
					var href = $(this).attr('href');
					var child = $(this).parent('div').next('ul,div.wrapper-noimage');
					if (child.length) {
						var active_cat = $(this).attr("title");
						var hide_item = $(this).parent().parent('li').parent('ul').children('li').children('.parbase');
						inbread.find('span').each(function(index, element) {
							if(!$(this).find('a').length){
								var text = $(this).text();
								$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
							}
						});
						//inbread.append('<span class="subcat"> ' + active_cat + '</span>');
						child.show();
						hide_item.fadeOut('fast',function(){
							/* add start */
							if (!$(this).is($(child).siblings('.parbase'))) {
								return;
							}
							/* add end */
							child.children('li,div.noimage-container').children('.parbase').fadeIn({
								duration : 'fast',
								start : function(){
									setHeight(child);
								}
							});
						});
						active_child = child;
						bread();
						return false;
					} else {
						return true;
					}
				}
			});
			function setHeight(_elm){
				var parrays = $(_elm).closest('.parrays')
				var ph = parrays.height();
				var ch = $(_elm).height();
				parrays.stop().animate({height:ch+'px'},{duration:'fast'});
				if($(_elm).hasClass('wrapper-noimage')){
					$(_elm).closest('.megapannel').addClass('noimage');
				}else{
					$(_elm).closest('.megapannel').removeClass('noimage');
				}
				/*if(ch > 145){
					parrays.animate({height:ch+'px'},{duration:'fast'});
				}else{
					parrays.height(145);
				}*/
			}
		});		
	}
	//initializeMegaPanelNavigation();
	//$(window).ready(function() {
		initializeHeaderPanelNavigation();
		initializeMegaPanelNavigation();
		
	//});
	//secondarynav listmenu
	var gheaderlistmenu = function(){
		$('#globalheader-secondarynav .withlistmenu').each(function(index, element) {
			if(!$('html').hasClass('touch-device')){
			$(this).hover(
				function(e){
					if(!$('html').hasClass('opacity')){
						$(this).find('.listmenu').addClass('active').show(10).css({'visibility':'visible'});
					}else{
						$(this).find('.listmenu').addClass('active').show();
					}
				},
				function(e){
					if(!$('html').hasClass('opacity')){
						$(this).find('.listmenu').removeClass('active').css({'visibility':'hidden'});
					}else{
						$(this).find('.listmenu').removeClass('active').hide();
					}
				}
			);
			}else{
				$(this).children('a').click(function(e){
					$(this).parent().find('.listmenu').toggleClass('active').toggle();
					return false;
				});
			}
		});
	}
	gheaderlistmenu();

	//secondarynav modalmenu
	var gheadermodalmenu = function(){
		$('#globalheader-secondarynav .withmodalmenu').each(function(index, element) {
			$(this).click(function(e) {
				gheadermodalmenuOpen(this);
				return false;
			});
		});
		$(document).on("click", ".modalmenu .languageSelectorItem", function(e) {
			e.preventDefault();
		});
	}
	function gheadermodalmenuOpen(_target){
		overlayset();
		var _menu = $(_target).find('.modalmenu').clone();
		$('#lightbox-overlay').append('<div id="modalmenu-box-wrapper"><div id="modalmenu-box-bg"><div id="modalmenu-box"></div><a href="#" class="btn-close"><img src="/etc/designs/panasonic/common-clientlibs/images/btn-close.png" alt="Close"></a></div></div>');
		$('#modalmenu-box').append(_menu);
		$(window).scrollTop(0);
		focusedElementBeforeModal = jQuery(':focus');
		$('#lightbox-overlay').fadeIn(function(){
			setInitialFocusModal($(this));
			$(this).keydown(function(event){trapTabKey($(this),event);});
			$('#lightbox-bgcolor ,#modalmenu-box-wrapper .btn-close').click(function(e) {
				$('#lightbox-overlay').fadeOut(function(e){
					overlayRemove();
				});
				focusedElementBeforeModal.focus();
				return false;
			});
		});
	}
	gheadermodalmenu();
	
	//langage selector
	$('#nav-menu-mob .lang').eq(0).bind('click', function(e){
		gheadermodalmenuOpen($('#globalheader-secondarynav .withmodalmenu .lang').eq(0).parent());
		e.preventDefault();
		return false;
	});

	// Global nav products link event
	//var userbartop,browsebartop,bookmarkbartop,filterbartop,fixareatop;
	/*var barSetting = function(){
		if($('#userbar').length){
			userbartop = $('#userbar').offset().top;
			$('#browsebar-in').addClass('withuserbar');
		}else{
			userbartop = 0;
		}
		browsebartop = ($('#browsebar').length)? $('#browsebar').offset().top : 0;
		bookmarkbartop = ($('#bookmarkbar').length)? $('#bookmarkbar').offset().top : 0;
		filterbartop = ($('#filterbar').length)? $('#filterbar').offset().top : 0;
	}*/
	
	
	//optout cookies
	var optout_cookies;
	/*
		load and write cookies
	*/
	//cookies ok
	var noteCookies = function(_container){
		$(_container).each(function(index, element) {
			var container = $(this);
			/* SCSK del start Temp */
/*
			if(optout_cookies == 'optout'){
				container.remove();
			}else{
				container.removeClass('hid');
				$('#user-login .user-login-panel').addClass('nocookie');
				$('#smartportal #login-btns').addClass('nocookie').find('a.btn').removeClass('nocookie').removeClass('btn').addClass('btn');
			}
*/
			/* SCSK del end Temp */
			container.find('.btn-cookiesok').on('click', function(e){
				container.slideUp(function(){
					//$('.optout_container').addClass('already-optout');
					/* SCSK del start (move to userbar-libs.js) */
					// $('#user-login .user-login-panel').removeClass('nocookie');
					/* SCSK del end */
					/* SCSK del start (move to smartportal-libs.js) */
					// $('#smartportal #login-btns').removeClass('nocookie').find('a.btn').removeClass('nocookie').removeClass('btn').addClass('btn');
					/* SCSK del end */
					//barSetting();
					/*
						load and write cookies
					*/
					/* SCSK add start */
					$('.optout_container').removeClass('already-optout');
					GwcCommon.cookiePolicyOptIn.resolve();
					/* SCSK add end */
				});
				return false;
			});
		});
	}
	noteCookies('#notescookies');
	noteCookies('#notescookies-rwd');
	/* SCSK add start */
	if (!window.CookiePolicy || cookieStatus == 0) {
		GwcCommon.cookiePolicyOptIn.resolve();
	}
	/* SCSK add end */
	
	//cookies opt out
	$('.optout_container').each(function(index, element) {
		var container = $(this);
		/* SCSK del start Temp */
/*
		if(optout_cookies == 'optout'){
			container.addClass('already-optout');
		}else{
			container.removeClass('already-optout');
		}
*/
		/* SCSK del end Temp */
		$(this).find('.btn-optout').on('click', function(e){
			if(!container.hasClass('already-optout')){
				container.addClass('already-optout');
				/* SCSK del start */
//				$('#notescookies').slideUp(function(){
					//barSetting();
					/*
						load and write cookies
					*/
//				});
//				$('#notescookies-rwd').slideUp(function(){
					/*
						load and write cookies
					*/
//				});
				/* SCSK del end */
				/* SCSK add start */
				$(isMobile() ? '#notescookies-rwd' : '#notescookies').slideDown();
				/* SCSK add end */
			}
			return false;
		});
		$(this).find('.btn-optin').on('click', function(e){
			if(container.hasClass('already-optout')){
				container.removeClass('already-optout');
				/*
				if($('#page').css('min-width')!='320px'){
					$('#notescookies').slideDown(function(){
						barSetting();
					});
				}else{
					$('#notescookies-rwd').slideDown(function(){
					});
				}
				*/
				/* SCSK add start */
				$(isMobile() ? '#notescookies-rwd' : '#notescookies').slideUp();
				/* SCSK add end */
			}
			return false;
		});
	});

	//barSetting();
	//navmenucat
	/* mod start
	$(".link-products:not(.link-megaPanel), #navmenucats .btn-slide").click(function(){
	*/
	$("#globalheader-nav .link-products:not(.link-megaPanel), #navmenucats .btn-slide").click(function(){
	/* mod end */
		if(browser == 'ie7or6') return true;
		$("#navmenucat .hide").slideToggle("slow",function(){
			//barSetting();
		});
		$('#link-products').parent().toggleClass("active");
		return false;
	});
	
	// userbar
	$(window).on('scroll resize',function(e) {
		$('#userbar-wrapper').each(function(index, element) {
			if($(window).scrollTop() >= $(this).offset().top && $('#page').css('min-width')!='320px'){
				$(this).css('height',$('#userbar').height()+'px');
				$(this).find('#userbar').addClass('fix').css('top', '0px');
			}else {
				/* mod start
				$(this).removeAttr('style');
				*/
				$(this).css('height', '');
				/* mod end */
				$(this).find('#userbar').removeClass('fix').removeAttr('style');
			}
		});
	});

	// browsebar
	$(window).on('scroll resize',function(e) {
		$('#browsebar-wrapper').each(function(index, element) {
			if($(window).scrollTop() >= $(this).offset().top - $('#userbar').height()){
				$(this).find('#browsebar').addClass('fix').css('top', $('#userbar').height() + 'px');
			}else {
				$(this).find('#browsebar').removeClass('fix').removeAttr('style');
			}
			//if($('#browsebar').find('.sharebtn').length) addthis_config.ui_offset_top = $(window).scrollTop();
			$('#browsebar').find('.sharebtn a.addthis_button').hover(
				function(){
					 addthis_config.ui_offset_top = $(window).scrollTop();
				},
				function(){
					 addthis_config.ui_offset_top = 0;
				}
			);
		});
	});
	
	//browsebar-buy
	$('#browsebar').on('click', '#browsebar-buy a', function(e) {
		if($(this).attr('href')=="#" || $(this).attr('href').indexOf("javascript:void(0)") !=-1 && !$(this).hasClass('cart-direct')){
			$('#browsebar-buyslide .layer-slide').slideToggle();		
			return false;
		}
	});
	
	// bookmarkbar
	$(window).on('scroll resize',function(e) {
		$('#bookmarkbar-wrapper').each(function(index, element) {
			if($(window).scrollTop() >= $(this).offset().top - $('#browsebar').height() - $('#userbar').height()){
				$(this).find('#bookmarkbar').addClass('fix').css('top', ($('#browsebar').height() + $('#userbar').height()) + 'px');
			}else {
				$(this).find('#bookmarkbar').removeClass('fix').removeAttr('style');
			}
		});
	});
	// filterbar
	$(window).on('scroll resize',function(e) {
		if($('#page').css('min-width')!='320px'){
			$('#filterbar-wrapper').each(function(index, element) {
				if($(window).scrollTop() >= $(this).offset().top - $('#browsebar').height() - $('#userbar').height()){
					$(this).find('#filterbar').addClass('fix').css('top', ($('#browsebar').height() + $('#userbar').height()) + 'px');
				}else {
					$(this).find('#filterbar').removeClass('fix').removeAttr('style');
				}
			});
		}
	});
	// .fixarea
	$(window).on('scroll resize',function(e) {
		$('.fixarea-wrapper').each(function(index, element) {
			var fixarea = $(this).find('.fixarea');
			var preH = 0;
			$('.fixarea').each(function(i, e) {
				if(i<index){
					preH += $(this).height();
				}
			});
			if($(window).scrollTop() >= $(this).offset().top - $('#browsebar').height() - $('#userbar').height() - preH){
				$(this).css('height',fixarea.height()+'px');
				fixarea.addClass('fix').css('top', (preH + $('#browsebar').height() + $('#userbar').height()) + 'px');
			}else {
				$(this).css('height','auto');
				fixarea.removeClass('fix').removeAttr('style');
			}
		});
	});
	
	
	// Footer Area/Country link event
	$("#globalfooter-nav .btn-fooslide").click(function(){
		if(browser == 'ie7or6') return true;
		var target = $(this).attr('data-content');
		var container = $('#globalfooter-expanded .hide');
		if(!$('#globalfooter-expanded #'+target).length) return true;
		if(container.css('display') == 'none'){
			$('#'+target).css({'display' : 'block'});
			$('#'+target).siblings().css({'display' : 'none'});
			container.slideDown('slow',function(){
				$('html, body').animate({
					scrollTop: ($('#globalfooter-expanded').offset().top)-83
				}, 1000);
			});
			$(this).addClass('active');
		}else if($(this).hasClass('active')){
			container.slideUp('slow');
			$(this).removeClass('active');
		}else{
			$('#'+target).css({'display' : 'block'});
			$('#'+target).siblings().css({'display' : 'none'});
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
		}
		return false;
	});
	$('#globalfooter-expanded .btn-slide').click(function(){
		$('#globalfooter-expanded .hide').slideUp('slow');
		$("#globalfooter-nav .btn-fooslide").removeClass('active');
		return false;
	});
		
	
	// Area Country Tabs initialization
	$("#areacountry .tabs").tabs({
	fx: { 
		opacity: 'toggle' 
		}
	});
	//$("#areacountry .tabs").find("li").find("a").attr("tabindex","-1");
	$("#areacountry .tabs").find("li").on('click, focus', function(){
		//$(this).find("a").attr("tabindex","0");
	});
	$('#areacountry .area-country-text').text($('#areacountry select option').eq(0).text());
	$('#areacountry select').on('change',function(){
		$('#areacountry .tabs').tabs('option', 'active', $(this).val());
		$('#areacountry .area-country-text').text($('#areacountry select option').eq($(this).val()).text());
	});
	
	
	
	// Mobile Navigation
	$('#globalheader .toggleMenu').click(function(e) {
		$('#globalheader-utils').slideToggle();
	});
	$("#nav-menu-mob .accordion > li a").each(function(index, element) {
		if($(this).siblings('ul').length){
			$(this).addClass('accordion-head');
			$(this).siblings('ul').css({'display':'none'});
		}
	});
	$("#nav-menu-mob .accordion > li a.accordion-head").each(function(index, element) {
		var ul = $(this).siblings('ul');
		$(this).click(function(e) {
			$(this).toggleClass('active');
			ul.slideToggle();
			return false;
		});
	});
	
	//backToTop
	$('#globalfooter .pagetop a, #utility .anchorcopy a, #float-btn-backtotop .btn a').click( function(event){
		$.scrollTo(
			0,
			{
				duration: 1000,
				easing: 'easeOutExpo',
				offset: { 'left':0, 'top':0}
			}
		);
		return false;
	});
	$('#float-btn-backtotop').hide();
	$(window).on('scroll', function(){
		var showPosition = ($('html').css('min-width')=='320px') ? 350 : 720;
		if($(window).scrollTop() > showPosition){
			$('#float-btn-backtotop').show();
		}else{
			$('#float-btn-backtotop').hide();
		}
	});
	
	//product-box energy label
	$('.product-energy').each(function(index, element) {
		$(this).children('a').on('click', function(e){
			var url = $(this).attr('href');
			var alt = $(this).attr('data-alt');
			var title = $(this).attr('data-title');
			picBoxOpen(url,alt,title);
			return false;
		});
	});
});


function productBoxH(/* add argument */$root){
	jQuery(function($){
		// add start
		$root = $root || $(document);
		var $productBoxIn = $('.product-box-in', $root);
		if ($productBoxIn.size() <= 0) {
			return;
		}
		// add end
		var _h = 0;
		/* mod start
		$('.product-box-in, .product-box-in > a, .product-box-in > div:first-child, .product-box-in .product-price, .product-box-in  .product-copy').css('height','auto');
		$.each(['.product-box-in .product-price', '.product-box-in .product-copy', '.product-box-in > a, .product-box-in > div:first-child'], function(i, selector) {
			var $productBoxInElem = $(selector);
		*/
		$('.product-box-in, .product-box-in > a, .product-box-in .product-price, .product-box-in  .product-copy', $root).css('height','auto');
		/* mod end */
		$.each(['.product-box-in .product-price', '.product-box-in .product-copy', '.product-box-in > a:first', '.product-box-in > a:last'], function(i, selector) {
			var $productBoxInElem = $(selector, $root);
			if ($productBoxInElem.size() <= 0) {
				return;
			}
		// mod end
			var maxHeight = Math.max.apply(null,
				$.makeArray($productBoxInElem.map(function() { return $(this).height(); }))
			);
			$productBoxInElem.height(maxHeight);
		})
		$productBoxIn.each(function() {
			_h = Math.max($(this).height(), _h);
		}).height(_h);
	});
}

jQuery(window).on('load',function(e) {
	if(!jQuery('.pagesectioncomponent').length || jQuery('#page').css('min-width')!='320px'){
		productBoxH();
	}
});
if(jQuery('html').hasClass('opacity')){
	jQuery(window).on('resize',function(e) {
		if(!jQuery('.pagesectioncomponent').length || jQuery('#page').css('min-width')!='320px'){
			productBoxH();
		}
	});
}

//Overlay

var focusableElementsString ="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
var focusedElementBeforeModal;
function trapTabKey(obj,evt) {
	// if tab or shift-tab pressed
	if ( evt.which == 9 ) {
		// get list of all children elements in given object
		var o = obj.find('*');
		// get list of focusable items
		var focusableItems;
		focusableItems = o.filter(focusableElementsString).filter(':visible')
		// get currently focused item
		var focusedItem;
		focusedItem = jQuery(':focus');

		// get the number of focusable items
		var numberOfFocusableItems;
		numberOfFocusableItems = focusableItems.length
		// get the index of the currently focused item
		var focusedItemIndex;
		focusedItemIndex = focusableItems.index(focusedItem);
		if (evt.shiftKey) {
			//back tab
			// if focused on first item and user preses back-tab, go to the last focusable item
			if(focusedItemIndex==0){
				focusableItems.get(numberOfFocusableItems-1).focus();
				//focusableItems.get(numberOfFocusableItems-1).select();
				evt.preventDefault();
			}
		} else {
			//forward tab
			// if focused on the last item and user preses tab, go to the first focusable item
			if(focusedItemIndex==numberOfFocusableItems-1){
				focusableItems.get(0).focus();
				//focusableItems.get(numberOfFocusableItems-1).select();
				evt.preventDefault();				
			}
		}
	}

}
function setInitialFocusModal(obj){
	// get list of all children elements in given object
	var o = obj.find('*');
	// set focus to first focusable item
	var focusableItems;
	focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();
}
function overlayset(_fix){
	var fix = _fix || 'fix';
	jQuery(function($){
		$('body').addClass('lightbox-lock');
		$('body').append('<div id="lightbox-overlay"><div id="lightbox-bgcolor"></div></div>');
		setWH();
		if(fix=='fix'){
			$('#lightbox-bgcolor').on('mousewheel', function(e){
				e.preventDefault();
			});
		}
		if($('html').hasClass('touch-device') && fix=='fix'){
			$('#lightbox-bgcolor, #modalwindow *').on('touchmove',function(e){
				e.preventDefault();
			});
			if(navigator.userAgent.indexOf("Android 2") == -1){
				var sctop = $(window).scrollTop();
				$(window).on('scroll', {top:sctop} ,overlayFix);
			}else{
				$('body').on('touchmove',function(e){e.preventDefault();});
			}
		}
		$(window).bind('resize',function(e){
			setWH();
		});
		function setWH(){
			var _h = Math.max($(window).height(),$('body').height());
			var _w = $('body').width();
			$('#lightbox-bgcolor').css({'height':_h+'px', 'width':_w+'px'});
		}
	});
}
function overlayFix(event){
	$(window).scrollTop(event.data.top);
}
function overlayRemove(){
	jQuery(function($){
		if($('html').hasClass('touch-device')){
			$(window).off('scroll', overlayFix);
			$('body').off('touchmove');
		}
		$('body').removeClass('lightbox-lock').css('top','auto');
		$('#lightbox-overlay').remove();
	});
}

function picBoxOpen(_target,_alt,_title){
	overlayset('nonfix');
	jQuery(function($){
		$('#lightbox-overlay').append('<div id="pic-box-wrapper"><div id="pic-box-bg"><div id="pic-box"></div><a href="#" class="btn-close"><img src="/etc/designs/panasonic/common-clientlibs/images/btn-close.png" alt="Close"></a></div></div>');
		var alt = _alt || "";
		var title = _title || "";
		$('#pic-box').append('<img src="'+_target+'" alt="'+alt+'" title="'+title+'">');
		$('#pic-box').children('img').eq(0).load(function(e) {
			positionSetting('#pic-box-wrapper');
		});
		focusedElementBeforeModal = jQuery(':focus');
		$('#lightbox-overlay').fadeIn(function(){
			setInitialFocusModal($(this));
			$(this).keydown(function(event){trapTabKey($(this),event);});
			$('#lightbox-bgcolor ,#pic-box-wrapper .btn-close').click(function(e) {
				$('#lightbox-overlay').fadeOut(function(e){
					overlayRemove();
				});
				focusedElementBeforeModal.focus();
				return false;
			});
		});
		
		function positionSetting(_box){
			var _wh = window.innerHeight ? window.innerHeight : $(window).height();
			var _ww = $('body').width();
			var _wSctop = $(window).scrollTop();
			var _bh = $(_box).outerHeight();
			if(_wh > _bh){
				$(_box).css({'top':(_wh-_bh)/2 + _wSctop + 'px'});
			}else{
				$(_box).css({'top':5 + _wSctop + 'px', 'height':(_wh-10) + 'px'});
			}
		}
	});
}

//youtube
YouTubeUtils = {};
/* mod start scsk */
var youtubeVideos = [];

/*
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
var youtubeVideos = [];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
tag.src = "//www.youtube.com/iframe_api";
*/
$(window).load(function() {
	if ($('#language-data').attr('cnty') != 'cn') {
		var tag = document.createElement('script');
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		tag.src = "//www.youtube.com/iframe_api";
	} else {
		onYouTubeIframeAPIReady();
	}
});
/* mod end scsk */

function onYouTubeIframeAPIReady() {
	/* del start scsk */
//	jQuery(function($) {
//		$(window).load(function(e) {
	/* del end scsk */
			if(navigator.userAgent.indexOf("Android 2") == -1){
				$(".youtube-placeholder").each(function(index, video) {
					YouTubeUtils.setupPlayer(video,index);
				});
			}
			holderSize();
			$(window).bind('resize orientationchange', function(e){
				holderSize();
			});
	/* del start scsk */
//		});
//	});
	/* del end scsk */
}
//Function create Video
YouTubeUtils.setupPlayer = function(_elm,index){
	var videoObj = $(_elm), playerID;
	var videoID = YouTubeUtils.videoParser(videoObj.attr('src'));
	var videoParam = YouTubeUtils.paramParser(videoObj.attr('src'));
	// additional video params on html tag attribute
	var additionalVideoParams = {};
	$.each($(_elm).data(), function(key) {
			var keyMatches = key.match(/^video\-?params\-?(.*)$/i);
			if (keyMatches && keyMatches.length >= 2) {
				additionalVideoParams[keyMatches[1].toLowerCase()] = $(_elm).data(key);
			}
		return additionalVideoParams;
	});
	videoParam = $.extend(additionalVideoParams, videoParam);
	if(videoObj.hasClass('chan-pana')){
		videoObj.attr('data-cpanaid',videoID);
		playerID = 'cpana' + String(videoID)+index;
	}else{
		playerID = videoID+index;
	}
	videoObj.append('<div id="'+playerID+'"/>');
	var videoTarget = videoObj.children('div');
	if (videoID != null) {
		if (videoObj.hasClass('youku-player')) {
			var youkuVideo = YouTubeUtils.createYkuPlayer(playerID, videoObj.data('clientid'), videoID, videoParam);
		}else if(videoObj.hasClass('chan-pana')){
			YouTubeUtils.chanpanaId = videoID;
			var pStatus = (videoObj.attr('data-editmode') && videoObj.attr('data-editmode')=='true')? 0 : 1 ;
			var aUrl = '//channel.panasonic.com/api/videoid/?v='+videoID+'&status='+pStatus;
			$.ajax({
				url: aUrl,
				type:'GET',
				dataType: 'jsonp',
				timeout:5000,
				success: function(data) {
					if (data.item.ytvideoid && data.item.ytvideoid != "") {
						videoParam.rel = 0; videoParam.wmode = 'transparent';
						YouTubeUtils.createYTPlayer(playerID, data.item.ytvideoid, videoParam);
					} else {
						if(videoObj.attr('data-endmessage')){
							videoTarget.addClass('closed').append('<span>'+videoObj.attr('data-endmessage')+'</span>');
						}
					}
					/*if(data[0].feed.length > 0){
						videoParam.rel = 0; videoParam.wmode = 'transparent';
						YouTubeUtils.createYTPlayer(playerID, data[0].feed[0].item.ytvideoid, videoParam);
					}else{
						if(videoObj.attr('data-endmessage')){
							videoTarget.addClass('closed').append('<span>'+videoObj.attr('data-endmessage')+'</span>');
						}
					}*/
				},
				error: function(data) {
				}
			});
		}else {
			videoParam.rel = 0; videoParam.wmode = 'transparent';
			YouTubeUtils.createYTPlayer(playerID, videoID, videoParam);
		}
	}
}
// Function Youtube Event
function onPlayerStateChange(event){
	var target = event.target.getIframe();
	if(event.data == 1 && $(target).parent().hasClass('chan-pana') && !$(target).parent().hasClass('played')){
		$(target).parent().addClass('played');
		var v = $(target).parent().attr('data-cpanaid');
		var aUrl = '//channel.panasonic.com/api/addcount/?v='+v;
		$.ajax({
			url: aUrl,
			type:'GET',
			dataType: 'jsonp',
			timeout:5000,
			success: function(data) {
				try {
					console.log(data);
				} catch(e){
				}
			},
			error: function(data) {}
		});
	}
}
// Function that stops all the YouTubeVideos
YouTubeUtils.stopYoutubeVideos = function() {
	for (var indexVideo = 0; indexVideo < youtubeVideos.length; indexVideo++) {
		if (youtubeVideos[indexVideo].stopVideo != null) {
			 youtubeVideos[indexVideo].stopVideo();
		}
	}
}
// Fuction to get the YouTube or Youku video ID
YouTubeUtils.videoParser = function(url){
	if (url && url.indexOf('youku\.com') > -1) {
		return YouTubeUtils.youkuParser(url);
	} else if(url.indexOf('youtube\.com') > -1 || url.indexOf('youtu\.be') > -1){
		return YouTubeUtils.youtubeParser(url);
	} else {
		return YouTubeUtils.chanpanaParser(url);
		//return url.split('?')[0];
	}
}
// Fuction to get the YouTube video ID
YouTubeUtils.youtubeParser = function(url){
    var regExp = /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i;
    var regExpExec = regExp.exec(url);
    if (regExpExec && regExpExec[3]) {
        return regExpExec[3];
    }else{
        return null;
    }
}
// Fuction to get the Youku video ID
YouTubeUtils.youkuParser = function(url){
    var regExp = /(v\.youku\.com|player\.youku\.com)\/(v_show\/id_|embed\/)([^?]+?)(\.htm.*|\?.+|$)/i;
    var regExpExec = regExp.exec(url);
    if (regExpExec && regExpExec[3]) {
        return regExpExec[3];
    }else{
        return null;
    }
}
// Fuction to get the Channel Panasonic video ID
YouTubeUtils.chanpanaParser = function(url){
    var regExp = /(ch\.panasonic\.net|channel\.panasonic\.com)\/(embed\/)(\d+)\/.*/i;
    var regExpExec = regExp.exec(url);
    if (regExpExec && regExpExec[3]) {
        return regExpExec[3];
    }else{
        return null;
    }
}
// Fuction to get the YouTube or Youku video Param
YouTubeUtils.paramParser = function(url){
	if (url && url.indexOf('youku\.com') > -1) {
		/* same as Youtube*/
		return YouTubeUtils.youtubeParamParser(url);
	} else {
		return YouTubeUtils.youtubeParamParser(url);
	}
}
// Fuction to get the YouTube video Param
YouTubeUtils.youtubeParamParser = function(url){
    var regExp = /(\?.*)([^\?])/;
    var regExpExec = regExp.exec(url);
	var vars = new Object, params;
    if (regExpExec && regExpExec[0]) {
		var temp_params = regExpExec[0].replace(/\?/,'').split('&');
		for(var i = 0; i <temp_params.length; i++) {
			params = temp_params[i].split('=');
			vars[params[0]] = params[1];
		}
        return vars;
    }else{
        return {};
    }
}
/* Youtube Player */
YouTubeUtils.createYTPlayer = function(divId, ytId, param){
	/* del start scsk */
	if ("YT" in window) {
	/* del end scsk */
	youtubeVideos.push(new YT.Player(divId, {
		width:'100%',
		height:'100%',
		videoId: ytId, 
		playerVars: param,
		events: {
			'onStateChange': onPlayerStateChange
		}
	}));
	/* del start scsk */
	}
	/* del end scsk */
}
/* Youku Player */
YouTubeUtils.createYkuPlayer = function(divId, ykuCId, ykuVId, param){
	var $youkuFrame = $('<iframe>', {
		'id': 'iframe_p_'+divId,
		'src': '/servlet/ajax/sns/youku-player.html',
		'class': 'youku-player-iframe'
	}).css({
		'width': '100%',
		'height': '100%'
	}).on('load', function() {
		if (!!this.contentWindow && $.isFunction(this.contentWindow.createIframeYkuPlayer)) {
			/* kscs modified start */
			var childYkPlayer = this.contentWindow.createIframeYkuPlayer(ykuCId, ykuVId, param);
			if (childYkPlayer && childYkPlayer != null) {
				youtubeVideos.push(childYkPlayer);
			}
			YouTubeUtils.switchVisibleYkuPlayerIframe($('#'+divId));
			/* kscs modified end */
		}
	});
	/* scsk modified start */
	$('#'+divId).append($youkuFrame);
	/* scsk modified end */
}
/* scsk add start */
YouTubeUtils.switchVisibleYkuPlayerIframe = function(target, isVisible) {
	var playerIframe = $('iframe', target)[0];
	if (!!playerIframe && $.isFunction(playerIframe.contentWindow.switchVisibleYkuPlayer)) {
		if (typeof isVisible != 'boolean') {
			isVisible = $(target).parent().is(':visible');
		}
		playerIframe.contentWindow.switchVisibleYkuPlayer(isVisible);
	}
};
jQuery.fn.switchVisibleYkuPlayer = function(isVisible) {
	return $(this).each(function() {
		YouTubeUtils.switchVisibleYkuPlayerIframe(this, isVisible);
	});
};
/* scsk add end */

function holderSize(/* add argument */$root){
	// add start
	$root = $root || document;
	var $d_resizeComplete = $.Deferred();
	// add end
	jQuery(function($){
		if($('#page').css('min-width') == '320px'){
			// add start
			var $youtubePlaceholder = $(".youtube-placeholder:visible", $root);
			if ($youtubePlaceholder.size() <= 0) {
				$d_resizeComplete.resolve(); // add
				return;
			}
			// add end
			if(navigator.userAgent.indexOf("Android 2") != -1){
				setTimeout(function(){
					for (var indexVideo = 0; indexVideo < youtubeVideos.length; indexVideo++) {
						if (youtubeVideos[indexVideo].destroy != null) {
							 youtubeVideos[indexVideo].destroy();
						}
					}
					youtubeVideos = [];
					$youtubePlaceholder.each(function(index, video) {
						var parents = $(this).parents();
						var display = true;
						$(parents).each(function(i, ele) {
							if($(this).css('display')=='none'){
								display = false;
								return false;
							}
						});
						$(this).children().remove();
						for(var i in $(parents)){
							if($(parents).eq(i).css('display')=='none'){
								display = false;
								break;
							}
						}
						if(display==true){
							YouTubeUtils.setupPlayer(video,index);
						}
					});
				},500);
			}
			// add start
			var resizedCnt = 0;
			$d_resizeComplete.progress(function(secceed) {
				resizedCnt++;
				if (resizedCnt >= $youtubePlaceholder.size()) {
					$d_resizeComplete.resolve();
				}
			});
			// add end
			$youtubePlaceholder.each(function(index, element) {
				var intervalId;
				var retryCnt = 0; // add
				videoSize(this);
				function videoSize(_v){
					// add start
					if (retryCnt >= 30) {
						// clearInterval(intervalId);
						$d_resizeComplete.notify(false);
					}
					// add end
					var _this = _v;
					var _pw = $(_this).parent().width();
					var _w = (_pw!=0)? _pw : $(window).width() - 20;
					$(_this).css({'height':9*_w/16 + 'px'});
					if($(_this).closest('.ext-table').length && !$(_this).closest('.ui-tabs-panel').length && !$(_this).closest('.slide-block').length){
						$(_this).closest('.ext-table').children('table').css('table-layout','fixed');
						intervalId = setInterval(function(){
							if(Math.round($(_this).outerWidth()/16 - $(_this).height()/9) == 0){
								clearInterval(intervalId);
								$d_resizeComplete.notify(true); // add
							}else{
								videoSize(_v);
								retryCnt++; // add
							}
						},100);
					} else {
						$d_resizeComplete.notify(true); // add
					}
				}
			});
		} else {
			$d_resizeComplete.resolve();
		}
	});
	// add return value(Deferred object)
	return $d_resizeComplete.promise();
}

//swapimage

function swapImg(Class,ov,img){
	jQuery(function($){
		$(Class).each(function(){
			var target;
			if(img){
				target = $(this).find(img);
			}else{
				target = $(this).find('img')
			}
			if(target.length){
				var src = target.attr('src');
				src.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i);
				var srcOv = RegExp.leftContext + ov + '.' +RegExp.$1;
				var srcOvImg = new Image();
				srcOvImg.src = srcOv;
				
				$(this).mouseover(function(){
					target.attr('src',srcOv);
				});
				$(this).mouseout(function(){
					 target.attr('src',src);
				});
			}
		});
	});
}

//copyguard
;(function($){
	$.fn.copyguardImage = function(){
		if($('#page').css('min-width')!='320px'){
			$.each(this, function(index, value){
				var target = $(this);
				$(this).on('contextmenu', function(e){
					return false;
				});
				if($(this).get(0).tagName == 'img' || $(this).get(0).tagName == 'IMG' ){
					var slider = $(this).parents('.slider');
					if(!slider.length && $('html').hasClass('backgroundsize')){
						
						$(this).on('dragstart', function(e){
							e.preventDefault();
							return false;
						});
						if(window.navigator.taintEnabled != undefined){
							/* del start. WHY? load the image at async.
							var src = $(this).attr("src");
							// del end */
							var _this = $(this);
							$(this).css({
								webktBackgroundSize:"100%",
								backgroundSize:"100%"
							});
							$(this).on('mouseover', function(e){
								/* add start */
								var src = $(this).attr("src");
								if (src == 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D') {
									return;
								}
								$(this).data('org-src', src);
								/* add end */
								var w = $(this).width();
								var h = $(this).height();
								$(this).css({'background-image':"url(\""+encodeUriWithoutParams(src)+"\")"}).width(w).height(h).attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D");
							});
							$(this).on('mouseout', function(e){
								/* add start */
								var src = $(this).data("org-src");
								/* add end */
								$(this).attr("src",src).css({'background-image':"none"});
							});
						}
		
					}
				}
			});
			$('.copyguradimage').on('contextmenu', function(e){
				return false;
			});
		}
		if($('#page').css('min-width')=='320px' && navigator.userAgent.match(/Android/i)){
			var dummy = new Image();
			dummy.src = "/etc/designs/panasonic/common-clientlibs/images/pixel.png";
			$(this).filter('img').each(function(index, element) {
				/* del start. WHY? load the image at async.
				var imgsrc = $(this).attr('src');
				// del end */
				var _this = this;
				$(_this).on('touchstart mouseover focus mousedown tap click',function(e){
					//var _this = this;
					/* add start */
					var imgsrc = $(_this).attr('src');
					if (imgsrc.match(dummy.src)) {
						return;
					}
					/* add end */
					var w = $(_this).width();
					var h = $(_this).height();
					$(_this).attr("src",dummy.src).width(w).height(h);
					$(_this).css({
						"background":"url(\""+encodeUriWithoutParams(imgsrc)+"\") no-repeat",
						webktBackgroundSize:"100%",
						backgroundSize:"100%"
					});
					// add start
					$(_this).data('src-org', imgsrc);
					// add end
				});
				if(navigator.userAgent.indexOf("Android 2") != -1){
					$(_this).on('load', function(e){
						// add start
						var imgsrc = $(_this).attr('src');
						if (imgsrc.match(dummy.src)) {
							return;
						}
						var styleTmp = $(_this).attr('style');
						$(_this).removeAttr('style');
						var $parent = $(_this).parent();
						$parent.children().detach().appendTo($parent);
						// add end
						var w = $(_this).width();
						var h = $(_this).height();
						// add start
						$(_this).attr('style', styleTmp);
						// add end
						if(w && w!=0){
							$(_this).attr("src",dummy.src).width(w).height(h);
							$(_this).css({
								"background":"url(\""+encodeUriWithoutParams(imgsrc)+"\") no-repeat",
								webktBackgroundSize:"100%",
								backgroundSize:"100%"
							});
							// add start
							$(_this).data('src-org', imgsrc);
							// add end
						}
					});
				}
				$(window).on('resize', function(e){
					/* add start */
					var imgsrc = $(_this).attr('src');
					if (imgsrc.match(/\/etc\/designs\/panasonic\/common-clientlibs\/images\/pixel.png/)) {
						imgsrc = $(_this).data('src-org');
					}
					if (!imgsrc || imgsrc.match(/\/etc\/designs\/panasonic\/common-clientlibs\/images\/pixel.png/)) {
						return;
					}
					/* add end */
					$(_this).attr('src',imgsrc).removeAttr('style');
				});
			});
		}
		function encodeUriWithoutParams(uri) {
			if (!uri) return uri;
			var uriOrParamsArray = uri.split('?');
			var encodedUri = encodeURI(uriOrParamsArray.shift());
			return [encodedUri].concat(uriOrParamsArray).join('?');
		}
	};
})(jQuery);

jQuery(function($){
	$('.copyguard').copyguardImage();
	/* del start
	$(window).on('load', function(){
		$('.copyguard').copyguardImage();
	});
	// del end */
});

/************************** Search-autocomplete *****************************/

jQuery(function($){
	$('#search-autocomplete .search-autocomplete-label').attr('tabindex','0');
	$('#search-autocomplete').append('<span class="focusEnd" tabindex="0"></span>');
	$('#search-autocomplete .search-autocomplete-label, #search-normal .search-normal-mobile-label').on({
		'click' : function(e){
			action($(this).parent());
		},
		keydown : function(e){
			if(e.keyCode == 13){
				action($(this).parent());
			}
		}
	});
	$('#search-autocomplete .focusEnd').on('focus', function(e){
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
		}
	});
	function action(_parent){
		if(_parent.hasClass('active')){
			_parent.removeClass('active');
		}else{
			_parent.addClass('active');
			_parent.find('.gsc-input').focus();
			_parent.find('#s').focus();
		}
	}
});