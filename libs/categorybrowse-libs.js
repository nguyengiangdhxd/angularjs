// JavaScript Document

jQuery(function($){
	/* add start */
	var checkResult = function() {
		$('#formFilters').submit();
	}
	/* add end */
	var moreinfo = function(){
		var dw = 0;
		$('#categorybrowse-header .moreinfo li span').removeAttr('style');
		$('#categorybrowse-header .moreinfo li').each(function(index, element) {
			var _w = $(this).find('span').width();
			if(dw<_w){
				dw = _w;
			}
		});
		$('#categorybrowse-header .moreinfo li span').width(dw+1);
	}
	var morefilters = function(){
		var _dh = $('#filterbar-in').outerHeight();
		if($('#page').css('min-width') != '320px'){
			$('#filterbar-more a, #categoryselect .top-block a, #sortby .top-block a').click(function(e) {
				if($('#filterbar').hasClass('opened')){
					hide();
				}else{
					show();
				}
				$('#filterbar-more a').find('span').toggleClass('hid');
			});
		}else{
			$('#filterbar-more a').click(function(e) {
				$('#filters').slideToggle();
				$(this).find('span').toggleClass('hid');
			});
		}
		function show(){
			$('#filterbar-in').find('.hide-block').show();
			var _h = $('#filterbar-in > .container').outerHeight();
			$('#filterbar-in').animate({height: _h+'px'},500,'swing',function(){
			});
			$('#filterbar').addClass('opened');
		}
		function hide(){
			$('#filterbar-in').animate({height: _dh+'px'},500,'swing',function(){
				$('#filterbar-in').find('.hide-block').hide();
			});
			$('#filterbar').removeClass('opened');
		}
	}
	var filterCheckbox = function(){
		check();
		$("#filters .filters-box input:checkbox").each(function(index, element) {
			$(this).change(function(e) {
				$(this).parent().toggleClass('checked');
			});
		});
		function check(){
			$("#filters .filters-box :checkbox").each(function(index, element) {
				var parent = $(this).parent();
				parent.addClass('checkbox')
				if($(this).is(':checked')){
					parent.addClass('checked');
				}else{
					parent.removeClass('checked');
				}
			});
		}
	}
	var filterSilder = function(_target){
		/* mod start */
		var value_max = eval($(_target).find('.x2-max').val());
		var value__min = eval($(_target).find('.x1-min').val());
//		var data_max = eval($(_target).attr('data-max'));
//		var data__min = eval($(_target).attr('data-min'));
		var data_max = eval($(_target).find('.x2-range').val());
		var data__min = eval($(_target).find('.x1-range').val());
		var data_unit = $(_target).attr('data-unit');
		var data_unitstyle = $(_target).attr('data-unitstyle');
		var data_decimalchar = $(_target).attr('data-decimalchar');
		var data_isdecimal = $(_target).attr('data-isdecimal');
		var _text = $(_target).find('.filter-text');
//		var _range = data_max - data__min;
		var _range = value_max - value__min;
		/* mod end */
		_text.html('<span class="min"></span> - <span class="max"></span>');
		if(data_unitstyle=='before'){
			_text.find('span').before(data_unit);
		}
		if(data_unitstyle=='after'){
			_text.find('span').after(data_unit);
		}
		$(_target).find('.scrollbar').eq(0).slider({
			/* mod start */
			min: value__min,
			max: value_max,
//			values: [ 0, 100 ],
			values: [ data__min, data_max ],
			/* mod end */
			range: true,
			create: function( event, ui ) {
				updateSlider($(this).slider('values'),this);
				$(this).find('a').append('<img src="/etc/designs/panasonic/categorybrowse-clientlibs/images/btn-scrollbar-bg-gray.png" alt="slider">');
				$(this).find('a').attr('role', 'slider');
				/* mod start */
//				$(this).find('a').attr('aria-valuemin', $(this).slider('values')[0]/100*_range+data__min);
//				$(this).find('a').attr('aria-valuemax', $(this).slider('values')[1]/100*_range+data__min);
				$(this).find('a').attr('aria-valuemin', value__min);
				$(this).find('a').attr('aria-valuemax', value_max);
				/* mod end */
			},
			slide :function( event, ui ) {
				updateSlider(ui.values,this);
			},
			/* add start */
			change :function( event, ui ) {
				checkResult();
			},
			step : (data_isdecimal == 'true' ? 0.1 : 1)
			/* add end */
		});

		function updateSlider(_values, _ui){
			var values = _values;
			/* mod start */
//			var _min = Math.floor(_range*(values[0]/100)) + data__min;
//			var _max = Math.floor(_range*(values[1]/100)) + data__min;
			var _min = values[0];
			var _max = values[1];
//			_text.find('.min').html(_min);
//			_text.find('.max').html(_max);
			_text.find('.min').html(formatNumber(_min));
			_text.find('.max').html(formatNumber(_max));
			/* mod end */
			$(_ui).find('a').eq(0).attr('aria-valuenow',_min);
			$(_ui).find('a').eq(0).attr('aria-valuetext',_min + data_unit);
			$(_ui).find('a').eq(1).attr('aria-valuenow',_max);
			$(_ui).find('a').eq(1).attr('aria-valuetext',_max + data_unit);
			// add by jtk(scsk)@2013/06/11 start 
			$('.x1-range', _target).val(_min);
			$('.x2-range', _target).val(_max);
			// add by jtk(scsk)@2013/06/11 close
		}
		/* add start */
		function formatNumber(num) {
			if (data_isdecimal == 'true') {
				var numStr = String(num);
				if (numStr.indexOf('.') < 0) {
					numStr = numStr + data_decimalchar + '0';
				}
				return numStr.replace('\.', data_decimalchar);
			} else {
				return num;
			}
		}
		/* add end */
	}

	/* add start */
	var grayFacets = function() {
		$('.checkeditems ul li a').click(function(){
			var x = $(this);
			var textgray = x.text().replace(/\s/g, "");
			var filterBoxes = $(".filters-box");
			var n = filterBoxes.find("li").size();
			for (var i = 0; i < n; i++) {
				var fbox = $(filterBoxes.find("li")[i]);
				var aux = $.trim(fbox.find("label").text().replace(/\n/g, ""));
				if(aux.replace(/\s/g, "") == textgray){
					fbox.parent().toggleClass('checked');
					fbox.find(":checkbox").attr("checked", false);
				}
			};
			checkResult();
		});
	}
	/* add end */
	var categoryScrollbox = function(_target){
		if(!$('html').hasClass('touch-device')){
			$(_target).jScrollPane({
				autoReinitialise: true
			});
		}
		
	}
	var compareCheckbox = function(){
		var compareCbox = $(".product-box .compare-checkbox input[type=checkbox]");
		check();
		limit();
		compareCbox.change(function(e) {
			$(this).parent().toggleClass('checked');
			limit();
		});
		function check(){
			compareCbox.each(function(index, element) {
				var parent = $(this).parent();
				parent.addClass('checkbox')
				if($(this).is(':checked')){
					parent.addClass('checked');
				}
			});
		}
		function limit(){
			var count =  $(".product-box .compare-checkbox input[type=checkbox]:checked").length;
			var not = compareCbox.not(':checked');
			if(count >= 4){
				not.attr('disabled','disabled');
				not.parents('.compare-checkbox').addClass('disabled');
			}else{
				not.removeAttr('disabled');
				not.parents('.compare-checkbox').removeClass('disabled');
				if(count == 0){
					$('#browsebar-compare').css('display','none');
				}else{
					$('#browsebar-compare').css('display','block');
				}
			}
		}
	}
	moreinfo();
	morefilters();
	filterCheckbox();
	/* add start */
	grayFacets();
	if($('#page').css('min-width') == '320px') {
		$('select.filterbar-mob-select').on('change', function() {
			document.location = $(this).val();
		});
	}
	/* add end */
	$('#filters .top-block .filter-set').each(function(index, element) {
		filterSilder(element);
	});
	categoryScrollbox('#categoryselect .categoryselect-box');
	compareCheckbox();
});