/*
 * jQuery File Upload Plugin JS Example 6.7
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */
var createDEMObj = {};

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    //$('#fileupload').fileupload();
    var demoImg = $("#demoreplace"),
    demoHeader = $("#nlheader"),
    demoFooter = $("#nlfooter"),
    inputH = $('input[name="header"]'),
    inputF = $('input[name="footer"]');
    
    inputH.click(function(){
      if(!$(this).is(':checked')){ 
        demoHeader.hide();
      }else{
        demoHeader.show();
      }
    });
    
    inputF.click(function(){
      if(!$(this).is(':checked')){
        demoFooter.hide();
      }else{
        demoFooter.show();
      } 
    });
    
    $('#fileupload').fileupload({
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            done: function (e, data) {
                $.each(data.result, function (index, file) {
                    var _d = $('<img/>');
                    _d[0].src = file.url;
                    
                    _d.load(function(e){
                      
                      demoImg.attr({src:file.url}).width(this.width).height(this.height);
                      if($('input[name="link"]').val() != "") demoImg.wrap($("<a/>",{'href':$('input[name="link"]').val()}));
                      if(!$('input[name="header"]').is(':checked')) demoHeader.hide();
                      if(!$('input[name="footer"]').is(':checked')) demoFooter.hide();                      
                      createDEMObj.url = file.url;
                      createDEMObj.width = this.width;
                      createDEMObj.height = this.height;
                    });
                    
                });
            }
        });


    $("#createHTML").click(function(e){
      var l = $('input[name="link"]').val();
      createDEMObj.header = $('input[name="header"]').is(':checked');
      createDEMObj.footer = $('input[name="footer"]').is(':checked');
      if(l != "") createDEMObj.link = l;
      createDEMObj.collection = $('select[name="collection"] option:selected').val();
      window.location = "server/php/download.php?"+$.param(createDEMObj);
      return false;
    });
    
    
    // Boxer plugin
    $.widget("ui.boxer", $.extend({}, $.ui.mouse, {

    	_init: function() {
    		this.element.addClass("ui-boxer");

    		this.dragged = false;

    		this._mouseInit();

    		this.helper = $(document.createElement('div'))
    			.css({border:'1px dotted black'})
    			.addClass("ui-boxer-helper");
    	},

    	destroy: function() {
    		this.element
    			.removeClass("ui-boxer ui-boxer-disabled")
    			.removeData("boxer")
    			.unbind(".boxer");
    		this._mouseDestroy();

    		return this;
    	},

    	_mouseStart: function(event) {
    		var self = this;

    		this.opos = [event.pageX, event.pageY];

    		if (this.options.disabled)
    			return;

    		var options = this.options;

    		this._trigger("start", event);

    		$(options.appendTo).append(this.helper);

    		this.helper.css({
    			"z-index": 100,
    			"position": "absolute",
    			"left": event.clientX,
    			"top": event.clientY,
    			"width": 0,
    			"height": 0
    		});
    	},

    	_mouseDrag: function(event) {
    		var self = this;
    		this.dragged = true;

    		if (this.options.disabled)
    			return;

    		var options = this.options;

    		var x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
    		if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
    		if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
    		this.helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});

    		this._trigger("drag", event);

    		return false;
    	},

    	_mouseStop: function(event) {
    		var self = this;

    		this.dragged = false;

    		var options = this.options;

    		var clone = this.helper.clone()
    			.removeClass('ui-boxer-helper').appendTo(this.element);

    		this._trigger("stop", event, { box: clone });

    		this.helper.remove();

    		return false;
    	}

    }));
    $.extend($.ui.boxer, {
    	defaults: $.extend({}, $.ui.mouse.defaults, {
    		appendTo: 'body',
    		distance: 0
    	})
    });
    
    (function ($) {
        $.fn.liveDraggable = function (opts) {
            this.live("mouseover", function() {
                if (!$(this).data("init")) {
                    $(this).data("init", true).draggable(opts);
                }
            });
            return $();
        };
    }(jQuery));
    

    // Using the boxer plugin
    $("#addmap").boxer({
    	stop: function(event, ui) {
    		var offset = ui.box.offset(),
    		position = ui.box.position();
    		ui.box.css({ border: '1px solid white', background: 'orange', padding: '0.5em' })
    			.append('x:' + offset.left + ', y:' + offset.top)
    			.append('<br>')
    			.append('w:' + ui.box.width() + ', h:' + ui.box.height());
    			console.log(offset.left,offset.top)
    			console.log(position.left,position.top)
    			console.log(ui.box.width(),ui.box.height())
    			ui.box.click(function(){
    			  this.remove()
    			});
          
    	}
    });


});
