// JavaScript Document
;
jQuery(function($){
	/*$('.breadcrumbs-flyout').find('.flyout > p > a').on('tap click', function(e){
		if($(this).closest('.flyout').hasClass('active')){
			$(this).closest('.flyout').removeClass('active');
		}else{
			$(this).closest('.flyout').addClass('active');
		}
	});*/
	if($('html').hasClass('touch-device')){
		$('.breadcrumbs-flyout').find('.flyout > p > a').on('tap click', function(e){
			if($(this).closest('.flyout').hasClass('active')){
				$(this).closest('.flyout').removeClass('active');
			}else{
				$(this).closest('.flyout').addClass('active');
			}
		});
	}else{
		$('.breadcrumbs-flyout').find('.flyout').on({
			'mouseenter' : function(e){
				$(this).addClass('active');
			},
			'mouseleave' : function(e){
				$(this).removeClass('active');
			},
			'click': function(e){
				e.preventDefault();
			}
		});
	}
});