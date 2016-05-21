if (!window.AnnouncementsUtil) AnnouncementsUtil = {};
/* Public */
AnnouncementsUtil.render = function(options) {

	options = $.extend({
		url			: null,
		rssType		: 'rss2_0',
		timezone	: '',
		dateFormat	: 'YYYY-MM-DD',
		targetId	: '',
		showImage	: true,
		max			: null,
		showCategory : true,
		cache		: true,
	}, options);

	/* Show No Result Message */
	var showNoRsltMsg = function() {
		var notFoundMsg = jQuery("#" + options.targetId + " .newslist .notfound");
		notFoundMsg.show();
	};

	/* Render */
	var renderHtml = function(items) {
		jQuery(function(){
			var node = jQuery("#" + options.targetId + " .newslist ul");
			if (node) {
				var nodeCnt = 0;
				for (var i = 0; i < items.length; i++) {

					var item = items[i];
					var listNode = '';
					if (item.category) {
						listNode = jQuery(
							'<li data-cat="'+item.category+'"></li>'
						);
					} else {
						listNode = jQuery(
							'<li></li>'
						);
					}

					if (options.showImage && item.image) {
						var imageDivNode = jQuery('<div class="news-image"></div>');
						var imageNode = jQuery('<img width="146" height="110" alt="" src="'+item.image+'">');

						imageDivNode.append(imageNode);
						listNode.append(imageDivNode);
					}

					var line = jQuery('<dl><dt></dt><dd></dd></dl>');
					var dtNode = jQuery("dt", line);
					var ddNode = jQuery("dd", line);

					/* Date ------------------------------ */
					if (item.pubDate) {
						var updatedDate = new Date(item.pubDate);
						// Android2.3.* is not supported W3C date format.
						if (isNaN(updatedDate)) {
							updatedDate = AnnouncementsUtil.getParseDate(item.pubDate);
						}
						if (!isNaN(updatedDate)) {
							dtNode.append('<span class="date">'+AnnouncementsUtil.getFormatDate(updatedDate, options.timezone,  options.dateFormat)+'</span>');
						}
					}

					/* Category ------------------------------ */
					if (options.showCategory && item.category) {
						ddNode.append('<span class="catLabel">[ '+item.category+' ]</span>');
					}

					/* title & Link ------------------------------ */
					if (item.link.length > 0) {
						var linkNode = jQuery('<a href="'+item.link+'"></a>');
						/* TODO New Window */
						linkNode.text(item.title);
						ddNode.append(linkNode);
					} else {
						ddNode.text(item.title);
					}

					listNode.append(line);
					node.append(listNode);
					++nodeCnt;
				}
				if (nodeCnt == 0) {
					showNoRsltMsg();
				}
			}
		});
	};

	/* Parse */
	$.ajax({
		type: 'GET',
		url: options.url,
		cache: options.cache,
		dataType: "xml",
		success: function(xml) {
			var feed = [];
			var ltSel = '';
			if (options.max) {
				ltSel = ':lt('+options.max+')';
			}
			if (options.rssType == 'rss1_0' || options.rssType == 'rss2_0') {
				jQuery('item'+ltSel, xml).each(function() {
					var item = new AnnouncementsUtil.FeedItem();
					item.title		= jQuery(this).find('title').eq(0).text();
					item.link		= jQuery(this).find('link').eq(0).text();
					item.pubDate	= jQuery(this).find('pubDate').eq(0).text();
					item.image		= jQuery(this).find("enclosure[type^='image']").eq(0).attr('url');
					item.category	= jQuery(this).find('category').eq(0).text();
					feed.push(item);
				});
			} else {
				jQuery('entry'+ltSel, xml).each( function() {
					var item = new AnnouncementsUtil.FeedItem();
					item.title = jQuery(this).find('title').eq(0).text();
					item.link = jQuery(this).find('link').eq(0).attr('href');
					item.pubDate = jQuery(this).find('updated').eq(0).text();
					/* image-content */
					item.image = jQuery(this).find("content[type^='image']").eq(0).attr('src');
					/* image-enclosuer */
					if (!item.image) {
						item.image = jQuery(this).find("link[rel='enclosure'][type^='image']").eq(0).attr('href');
					}
					item.category	= jQuery(this).find('category').eq(0).attr('term');
					feed.push(item);
				});
			}
			renderHtml(feed);
			renderAnnoucements(options.targetId);
		},
		error: function() {
			showNoRsltMsg();
		}
	});
};

AnnouncementsUtil.getParseDate = function(pubDate) {
	var dtfSplit = RegExp("^(\\d{4})\\-?(\\d{2})?\\-?(\\d{2})?T?(\\d{2})?:?(\\d{2})?:?(\\d{2})?(\\.\\d+)?(\\+|-|Z)?(\\d{2})?:?(\\d{2})?$");
	var splitDate = pubDate.match(dtfSplit);
	var combineDate = "Invalid Date";
	if (!!splitDate) {
		var splitYear = splitDate[1];
		var splitMonth = splitDate[2] ? parseInt(splitDate[2], 10) - 1 : 0;
		var splitDay = splitDate[3] ? parseInt(splitDate[3], 10) : 1;
		var splitHour = splitDate[4] ? parseInt(splitDate[4], 10) : 0;
		var splitMinute = splitDate[5] ? parseInt(splitDate[5], 10) : 0;
		var splitSecond = splitDate[6] ? parseInt(splitDate[6], 10) : 0;
		var splitMillisecond = splitDate[7] ? parseFloat(splitDate[7]) * 1000 : 0;
		
		combineDate = new Date(splitYear, splitMonth, splitDay, splitHour, splitMinute, splitSecond, splitMillisecond);
		
		//get the time offset from local
		var localTimezoneOffset = combineDate.getTimezoneOffset();

		var dataTimezoneOffset;
		if (!!splitDate[8]) {
			//get the time offset from data
			switch (splitDate[8]) {
				case '+':
					dataTimezoneOffset = -(parseInt(splitDate[9], 10) * 60 + parseInt(splitDate[10], 10));
					break;
				case '-':
					dataTimezoneOffset = parseInt(splitDate[9], 10) * 60 + parseInt(splitDate[10], 10);
					break;
				case 'Z':
					dataTimezoneOffset = 0;
					break;
			}
		}
		else {
			dataTimezoneOffset = 0;
		}
		var addTimezoneOffset = localTimezoneOffset - dataTimezoneOffset;
		combineDate.setTime(combineDate.getTime() - addTimezoneOffset * 60 * 1000);
	}
	return combineDate;
}

AnnouncementsUtil.getFormatDate = function(date, timezone, dateFormat) {
    if (!timezone) {
        return $.datepicker.formatDate(dateFormat, date);
    }

	var aDateFormat = 'yy-m-d';
	if (dateFormat == 'YYYY-MM-DD') {
		aDateFormat = 'yy-mm-dd';
	} else if (dateFormat == 'MM-DD-YYYY') {
		aDateFormat = 'mm-dd-yy';
	} else if (dateFormat == 'DD-MM-YYYY') {
		aDateFormat = 'dd-mm-yy';
	}
    var utc = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var tzm = +(timezone.replace(/:/g, '')); // -0545 → -545
    var mm = tzm % 100; // -45
    var hh = tzm - mm;  // -500
    return $.datepicker.formatDate(aDateFormat, new Date(utc.getTime() + ((hh / 100 * 60) + mm) * 60 * 1000));
};

/* Private */
(function () {
	function FeedItem() {};
	FeedItem.prototype = {
		title: '',
		link: '',
		pubDate: '',
		category: '',
		image: ''
	};
	AnnouncementsUtil.FeedItem = FeedItem;
})();

