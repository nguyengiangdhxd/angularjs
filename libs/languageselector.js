 var LanguageSelector = {
    preferedLanguageCookieId: 'language_prefered',
    pageCountryLanguage: {},
    languageCollection:null,
    defaultLocale:null,
    countrySite:null,
    
    /**
     * Init method of the class.
     */
    init: function() {
        
        this.languageCollection = jQuery("#language-data tr");
        this.defaultLocale = this.getDefaultLocale(this.languageCollection);
        this.countrySite = jQuery("#language-data");
        if (this.countrySite != null) {
            this.countrySite = this.countrySite.attr("cnty");
        }
    },
    applyPreferredLanguageByCookie: function(){
        if( (typeof cookieStatus == "undefined" || (typeof cookieStatus != "undefined" && cookieStatus == 0))){
        	this.checkCookie();
        }
    },
    onclick:function(target) {
        var newLanguage = jQuery(target).attr('lang-path');
        if (this.countrySite != null) {
        	if(typeof cookieStatus != "undefined"){
        		CookiePolicy.checkCpCookie();
        	}
        	var self = this;
	    	if((typeof cookieStatus == "undefined") || ((typeof cookieStatus != "undefined") && (cookieStatus == 0))){
	        	self.setCookie(self.preferedLanguageCookieId + "_" + this.countrySite, "", -1); //Delete the last cookie created
    	        self.setCookie(self.preferedLanguageCookieId + "_" + this.countrySite, newLanguage, 365); // create the new cookie
    	        self.checkCookie();
	        }else{
	        	self.checkCookieUnset(newLanguage);
	        }
        }
    },
    
    getDefaultLocale : function(a) {
         for (var i = 0; i < a.length; i++) {
            if (a.eq(i).attr('default') == 'true' ) {
                return a.eq(i).attr('path');
            }
        }
        return null;
    },
    validatePreferredLanguage : function(lang) {
    	var language_selectors = jQuery(".modalmenu .languageSelectorItem");
    	for (var i = 0; i < language_selectors.length; i++) {
    		if (language_selectors.eq(i).attr('lang-path') == lang ) {
    			return true;
    		}
    	}
    	return false;
    },
    
    urlLanguageParse : function(url) {
    	if (this.countrySite == null) {
    		return;
    	}
    	this.pageCountryLanguage = "/"+ this.countrySite;
        if (url.indexOf(this.pageCountryLanguage+"/") != -1 || url.indexOf(this.pageCountryLanguage+".") != -1 ) {
            var result = {};
            result.preLang = url.substring(0,location.href.indexOf(this.pageCountryLanguage)+this.pageCountryLanguage.length);
            result.postLang = url.substring(location.href.indexOf(this.pageCountryLanguage)+this.pageCountryLanguage.length);
            var pos = result.postLang.indexOf("/",2);
            if (pos == -1){
            	pos = result.postLang.indexOf(".");
            }
  
            result.lang = result.postLang.substring(1,pos);
            if (this.islang(this.languageCollection, result.lang)){
                result.postLang = result.postLang.substring(pos);
            }
            else  {
                result.lang = this.defaultLocale;
            }
      
            this.pageCountryLanguage = result;   
        }   
    },
    
    islang: function(a,item) {
         for (var i = 0; i < a.length; i++) {
                if (a.eq(i).attr('path') == item ) {
                    return true;
                }
            }
         return false;
    },
    /**
     * Get cookie method for manage the selected language with cookie value.
     */
    getCookie: function(c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        
        if (c_start == -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            
            if (c_end == -1) {
                c_end = c_value.length;
            }
            
            c_value = unescape(c_value.substring(c_start,c_end));
        }
        
        return c_value;
    },
    
    /**
     * Method to set the cookie with the selected language
     */
    setCookie: function(c_name, value, exdays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()+";Path = /");
        document.cookie=c_name + "=" + c_value;
    },
    
    /**
     * Method to check the cookie stored.For language selector itself.
     */
	checkCookie: function() {
    	if (this.countrySite == null) {
    		return;
    	}
        var language_cookie = this.getCookie(this.preferedLanguageCookieId+'_'+this.countrySite);
        if (language_cookie != null && language_cookie != "") {
            var language_preferred = language_cookie.replace(/^\s+/g,'').replace(/\s+$/g,'');
            if(!this.validatePreferredLanguage(language_preferred)){
            	return;
            }
            this.urlLanguageParse(location.href);
            if (this.pageCountryLanguage != null && language_preferred != this.pageCountryLanguage.lang && 
            		this.pageCountryLanguage.preLang != undefined && this.pageCountryLanguage.postLang != undefined ) {
            	if (this.pageCountryLanguage.postLang.indexOf("/") != 0 && this.pageCountryLanguage.postLang.indexOf(".") != 0){
            		this.pageCountryLanguage.postLang = "/" + this.pageCountryLanguage.postLang;
            	}
                if (language_preferred != this.defaultLocale) {
                    location.href = this.pageCountryLanguage.preLang + "/" + language_preferred + this.pageCountryLanguage.postLang;
                }
                else {
                    location.href = this.pageCountryLanguage.preLang + this.pageCountryLanguage.postLang;
                }
            }
           if (this.pageCountryLanguage != null && language_preferred == this.pageCountryLanguage.lang) {
               if (jQuery('#lightbox-bgcolor ,#modalmenu-box-wrapper .btn-close')) {
                   jQuery('#lightbox-bgcolor ,#modalmenu-box-wrapper .btn-close').click();
               }
           } 
        }
    },
    	
    /**
     * Method to check the cookie stored. Check cookie policy status when select language.
     */
        checkCookieUnset: function(target) {
        	if (this.countrySite == null) {
        		return;
        	}
        	var language_preferred = target;
        	this.urlLanguageParse(location.href);
                if (this.pageCountryLanguage != null && language_preferred != this.pageCountryLanguage.lang && 
                		this.pageCountryLanguage.preLang != undefined && this.pageCountryLanguage.postLang != undefined ) {
                	if (this.pageCountryLanguage.postLang.indexOf("/") != 0 && this.pageCountryLanguage.postLang.indexOf(".") != 0){
                		this.pageCountryLanguage.postLang = "/" + this.pageCountryLanguage.postLang;
                	}
                    if (language_preferred != this.defaultLocale) {
                        location.href = this.pageCountryLanguage.preLang + "/" + language_preferred + this.pageCountryLanguage.postLang;
                    }
                    else {
                        location.href = this.pageCountryLanguage.preLang + this.pageCountryLanguage.postLang;
                    }
                }
               if (this.pageCountryLanguage != null && language_preferred == this.pageCountryLanguage.lang) {
                   if (jQuery('#lightbox-bgcolor ,#modalmenu-box-wrapper .btn-close')) {
                       jQuery('#lightbox-bgcolor ,#modalmenu-box-wrapper .btn-close').click();
                   }
               } 
        }
};
LanguageSelector.init();
    