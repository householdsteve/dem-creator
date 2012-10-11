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


});
