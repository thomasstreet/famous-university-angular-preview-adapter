(function($)
{
	$.fn.wJSNova = function(option, settings)
	{	
		if(typeof option === 'object')
		{
			settings = option;
		}
		else if(typeof option === 'string')
		{
			var data = this.data('_wJSNova');

			if(data)
			{
				if(option == 'resize') { data.resize(); return true }
				else if($.fn.wJSNova.defaultSettings[option] !== undefined)
				{
					if(settings !== undefined){
						data.settings[option] = settings;
						return true;
					}
					else return data.settings[option];
				}
				else return false;
			}
			else return false;
		}

		settings = $.extend({}, $.fn.wJSNova.defaultSettings, settings || {});

		return this.each(function()
		{
			var $elem = $(this);

			var $settings = jQuery.extend(true, {}, settings);

			var jsn = new JSNova($settings);

			$elem.append(jsn.generate());
			jsn.resize();
			// jsn.run();

			$elem.data('_wJSNova', jsn);
		});
	}

	$.fn.wJSNova.defaultSettings = {};

	function JSNova(settings)
	{
		this.jsn = null;
		this.settings = settings;

		this.menu = null;

		this.sidebar = null;
		this.jQueryVersion = null;
		this.jQueryUIVersion = null;
		this.jQueryUITheme = null;

		this.codeArea = null;
		this.boxHTML = null;
		this.boxCSS = null;
		this.boxJS = null;
		this.boxResult = null;

		return this;
	}

	JSNova.prototype = 
	{
		init: function()
		{
			this.resize();
		},
		
		generate: function()
		{
			var $this = this;

			if($this.jsn) return $this.jsn;

			$(document).ready(function() { $this.run(); });

			$this.boxResult = $('<div id="result"></div>');
			
			$this.jsn = $('<div class="_wJSNova_holder"></div>').append($this.boxResult);
			
			return $this.jsn;
		},
		
		run: function()
		{
			var html = window.famousContent.html;
			var css = window.famousContent.css;
			var js = window.famousContent.js;
			
			var jQuery = '<script type="text/javascript" src="inc/jquery.1.7.1.min.js"></script>';
			
			var result = '<html><head>' + jQuery + '<style>' + css + '</style></head><body>' + html + '<script type="text/javascript">' + js + '</script></body></html>';
			
			this.writeResult(result);
		},
		
		reset: function()
		{
			this.boxHTML.val('');
			this.boxCSS.val('');
			this.boxJS.val('');
			this.writeResult('');
		},
		
		writeResult: function(result)
		{
			var $this = this;
			var iframe = $this.boxResult;
		
			if(iframe.contentDocument) doc = iframe.contentDocument;
			else if(iframe.contentWindow) doc = iframe.contentWindow.document;
			else doc = iframe.document;
			
			document.open();
			document.writeln(result);
			document.close();
		},
		
		resize: function()
		{
			var jsnHeight = this.jsn.outerHeight(true);
			
			var codeAreaWidth = this.jsn.outerWidth(true);
			
			this.run();
		}
	}
})(jQuery);