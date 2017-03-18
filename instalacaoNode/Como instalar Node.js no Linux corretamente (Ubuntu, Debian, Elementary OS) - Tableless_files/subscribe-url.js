$(document).ready(function() {
    var dateFormat;

    function is_valid_sms(sms) {
        sms = sms.replace(/\b(0(?!\b))+/g, "");
        $(document).find('#SMS').val(sms);

        var temp_sms = sms.replace(/( |\(|\)|\.|\-)/g, '');

        if (temp_sms.length > 19  || temp_sms.length < 6){
            return false;
        }
        return true;
    }

    function is_valid_date(date) {
        var filter = '';
        if(dateFormat == 'dd/mm/yyyy')
        {
            filter = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }
        else if(dateFormat == 'dd-mm-yyyy')
        {
            filter = /^(((0[1-9]|[12]\d|3[01])-(0[13578]|1[02])-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)-(0[13456789]|1[012])-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])-02-((19|[2-9]\d)\d{2}))|(29-02-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }
        else if(dateFormat == 'mm-dd-yyyy')
        {
            filter = /^(((0[13578]|1[02])-(0[1-9]|[12]\d|3[01])-((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])-(0[1-9]|[12]\d|30)-((19|[2-9]\d)\d{2}))|(02-(0[1-9]|1\d|2[0-8])-((19|[2-9]\d)\d{2}))|(02-29-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }
        if(filter != '')
        {
            if (filter.test(date)) {
                return true;
            }
        }
        return false;
    }

    var u = data.subscribe_theme_content;
    var form_size = 'grand';
    if(u == '' || u == undefined){
        var DesignedJSon =[{name:"body_img", value:""},{"name":"color","value":"#dcdcdc"},{"name":"container_color","value":"#fcfcfc"},{"name":"inner_containercolor","value":"#f1f1f1"},{"name":"fontheader","value":"'Helvetica Neue',Helvetica,Arial,sans-serif"},{"name":"fontdesc","value":"'Helvetica Neue',Helvetica,Arial,sans-serif"},{"name":"fontbutton","value":"'Helvetica Neue',Helvetica,Arial,sans-serif"},{"name":"heading-color","value":"#232323"},{"name":"description-color","value":"#343434"},{"name":"subscription-button-color","value":"#ffffff"},{"name":"subscription-bg-color","value":"#050505"},{"name":"fontsize-header","value":"45"}, {"name":"fontsize-desc","value":"17"},{"name":"fontsize-button","value":"14"},{"name":"fontsize-field","value":"13"}, {"name":"header-display","value":"Title,Sub title,Description"},{"name":"grand","value":"Grand"}];
    }else{
        var defaultDesign = jQuery.parseJSON(u);
    }
    var lang = defaultDesign.lang;

    /**
     * Code to initiate translation
     *
     * @author DG-SLIT
     * @modified   DG - 29 Dec'14
     */
    jQuery.i18n.properties({
        name: 'lang',
        path: SITE_BASE_URL + 'public/language2/',
        mode: 'map',
        language: lang,
        callback: function () {}
    });
    $.t = jQuery.i18n.prop;

    if(data.company_org !='' && data.company_org!= undefined){
        $("."+sib_prefix+"-container").find("#company-name").text(bytrans+" "+data.company_org);
    }

    if(defaultDesign.rowhtml!='' && defaultDesign.rowhtml!=undefined){
        $("."+sib_prefix+"-container").html(defaultDesign.rowhtml);
    }

    if(defaultDesign.csscontent !='' && defaultDesign.csscontent !=undefined){
        defaultDesign = defaultDesign.csscontent;
    }
    var result = $.grep(defaultDesign, function(e){ return e.name == 'containeropacity'; });
    if(result.length == 0) {
        var _containeropacity = 100;
    }else{
        var _containeropacity = result[0].value;
    }
    for(i=0; i<defaultDesign.length; i++){
        var inputName = defaultDesign[i].name;
        var inputValue = defaultDesign[i].value;
        $('[name='+inputName+']').val(inputValue).css('background', inputValue);
        //var selectedInputId=$('[name='+inputName+']').attr('id');

        if(inputName=='heading-color'){
            $('.'+sib_prefix+'-container').find('h1').css('color', inputValue);
        }
        else if(inputName=='body_img'){
            $('body').css({'background-Image': 'url("'+inputValue+'")', 'background-repeat':'repeat'});
        }
        else if(inputName=='color'){
            $('body').css('background-color', inputValue);
        }
        else if(inputName=='description-color'){
            //  $('.container').find('.forms-builder-footer , .description, .fake-label, .row, #company-name').css('color', inputValue);
            $('.'+sib_prefix+'-container').css('color', inputValue);
        }
        else if(inputName=='subscription-button-color'){
            $('.'+sib_prefix+'-container').find('.button').css('color', inputValue);
        }
        else if(inputName=='subscription-bg-color'){
            $('.'+sib_prefix+'-container').find('.button').css('background', inputValue);
        }
        else if(inputName=='container_color'){
            inputValue = convertHex(inputValue, _containeropacity);
            $('.'+sib_prefix+'-container').css('background', inputValue);
        }
        else if(inputName=='fontheader'){
            $('.'+sib_prefix+'-container').find('h1').css('font-family', inputValue);
        }
        else if(inputName=='fontdesc'){
            $('.'+sib_prefix+'-container').find('.forms-builder-footer , .description, .fake-label, .row, #company-name').css('font-family', inputValue);
        }
        else if(inputName=='fontbutton'){
            $('.'+sib_prefix+'-container').find('.button').css('font-family', inputValue);
        }
        else if(inputName == 'small' ){
            form_size = 'small';
            $('div.forms-builder-wrapper').css('max-width', '200px');
            $('div.'+sib_prefix+'-container').css('padding', '10px 8px 8px');
            $('div.header').css('padding', '0 5px');
            $('h1.title').css({lineHeight:'24px'});
            $('h3.company-name').css({lineHeight:'14px'});
            $('div.description').css({padding:'0 5px 10px'});
            $('div.row').css('padding', '5px 10px');
            $('input[type="text"]').css({padding:'4px', width:'100%', boxSizing:'border-box'});
                //$('#SMS').css({padding: '10px 2%', width: '80%'});
                $('.tooltip').css({left: '101%'});

            $('button').css({padding:'0 10px'});
            $('.tooltip').addClass('tooltip_small');
        }
        else if(inputName == 'medium' ){
            form_size = 'medium';
            $('div.forms-builder-wrapper').css('max-width', '350px');
            $('div.'+sib_prefix+'-container').css('padding', '25px 15px 15px');
            $('div.header').css('padding', '0 10px');
            $('h1.title').css({lineHeight:'40px'});
            $('h3.company-name').css({lineHeight:'20px'});
            $('div.description').css({padding:'10px 15px'});
            $('div.row').css('padding', '10px');
            $('input[type="text"]').css({padding:'8px 4px', width:'100%', boxSizing:'border-box'});
                //$('#SMS').css({padding: '10px 2%', width: '85%'});
                $('.tooltip').css({left: '101%'});
            $('.tooltip').removeClass('tooltip_small');
            //$('button').css({height:'30px', lineHeight:'30px'});
        }
        else if(inputName == 'grand' ){
            form_size = 'grand';
            $('div.forms-builder-wrapper').css('max-width', '540px');
            $('div.'+sib_prefix+'-container').css('padding', '40px 20px 20px');
            $('div.header').css('padding', '0 20px');
            $('h1.title').css({lineHeight:'50px'});
            $('h3.company-name').css({lineHeight:'35px'});
            $('div.description').css({padding:'0 20px 15px'});
            $('div.row').css('padding', '10px 20px');
            $('input[type="text"]').css({padding:'10px 2%',  width:'100%', boxSizing:'border-box'});
                //$('#SMS').css({padding: '10px 2%', width: '85%'});
                $('.tooltip').css({left: '101%'});
            //$('button').css({height:'40px', lineHeight:'42px'});
            $('.tooltip').removeClass('tooltip_small');

        }

        else if(inputName=='fontsize-header'){
            $('h1.title').css('font-size', inputValue+'px');
        }
        else if(inputName=='fontsize-desc'){
            $('.forms-builder-footer , div.description, .fake-label, .row').css('font-size', inputValue+'px');
        }
        else if(inputName=='fontsize-button'){
            $('.button').css('font-size', inputValue+'px');
        }
        else if(inputName=='fontsize-field'){
            $('input').css('font-size', inputValue+'px');
        }
    }
    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }
    $('.'+sib_prefix+'-container').find('.hidden-btns').remove();
    $("div[contenteditable='true'],h1[contenteditable='true'],button[contenteditable='true'],h3[contenteditable='true']").attr("contenteditable", "false");
    var req_fileld=$('#req_hid').val();
    //req_fileld= req_fileld.replace("~", ",").substring(1);
    if(FORM_PRIMARY_TYPE == 'email'){
        req_fileld='email'+req_fileld;
    }else{
        req_fileld='SMS'+req_fileld;
    }
    required = req_fileld.split("~");
    //  required = ['email','FNAME'];
    //  alert(required);
    // If using an ID other than #email or #error then replace it here
    email = $("#email");
    //errornotice = $("#error");
    // The text to show up within a field when it is incorrect
    //var emptyerror = "Please fill out this field.";
    //var emailerror = "Please enter a valid e-mail.";
    var emptyerror = $.t('users_subscribe_url_1_error');
    var emailerror = $.t('users_subscribe_url_2_error');
    var general_err = $.t('users_subscribe_url_3_error');
    var date_err = $.t('import_1_warn');
    var alert_width, alert_padding, button_style;
    if (form_size == 'grand') {
        alert_width = '410px;'
        alert_padding = ''
        button_style = '';
    }
    else if (form_size == 'medium') {
        alert_width = '280px;'
        alert_padding = '';
        button_style = '';
    }
    else if (form_size == 'small') {
        alert_width = '165px;'
        alert_padding = ' padding:4px 16px 4px 4px;'
        button_style = ' font-size:13px;right:4px;';
    }

    $('#'+sib_prefix+'_loading_gif_area').width($('form#theform').width());
    $('#'+sib_prefix+'_loading_gif_area').height($('form#theform').height());

    $("#theform").on('submit', function(){
        if( $("#hdn_new_format").length )
        {
            dateFormat = sib_dateformat; console.log('yes');
        }
        else {
            dateFormat = 'dd/mm/yyyy';console.log('no');
        }

        $('div.alert').remove();
        //Validate required fields
        for (i=0;i<required.length;i++) {
            //alert(required[i]);
            var input = $('input[name="'+required[i]+'"]');
            var inputType = input.attr('type');
            if(inputType=='text'){
                //if ((required[i] != 'SMS') && ((input.val() == "") || (input.val() == emptyerror))) {
                if (input.val() == "" || input.val() == emptyerror) {

                    input.closest('.row').addClass("needsfilled");
                    input.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding +'"><button type="button" class="close" style="' + button_style +'">x</button>'+emptyerror+'</div>' );
                    //errornotice.fadeIn(750);
                } else {
                    if (required[i] == 'email') {
                        if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(input.val())) {
                            input.closest('.row').addClass("needsfilled");
                            input.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding +'"><button type="button" class="close" style="' + button_style +'">x</button>'+invalid_email_err+'</div>' );
                            input.val('');
                        } else{
                            input.closest('.row').removeClass("needsfilled");
                        }
                    }
                    else {
                        input.closest('.row').removeClass("needsfilled");
                    }
                }
            }
            else if(inputType=='radio'){

                if(input.is(':checked')==false){
                    input.closest('.row').addClass("needsfilled");
                    input.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding +'"><button type="button" class="close" style="' + button_style +'">x</button>'+emptyerror+'</div>' );
                }


            } else {
                var fields =input.serializeArray();
                //alert(fields.length)
                if (fields.length == 0)
                {
                    input.closest('.row').addClass("needsfilled");
                    //input.val(emptyerror);
                } else {
                    input.closest('.row').removeClass("needsfilled");
                }
            }
        }

        $(".row").each(function(){
            var span_ele = $(this).find('span');
            var ele = $(this).find("input");
            if (ele.attr('name') == 'SMS') {
                if (!is_valid_sms(ele.val()) && ele.val() != "") {
                    ele.closest('.row').addClass("needsfilled");
                    ele.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding + '"><button type="button" class="close" style="' + button_style +'">x</button>'+ general_err +'</div>' );
                    ele.val('');
                }
            }
            if(span_ele.text() == dateFormat){ 
                if (!is_valid_date(ele.val()) && ele.val() != ""){
                    ele.closest('.row').addClass("needsfilled");
                    ele.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding + '"><button type="button" class="close" style="' + button_style +'">x</button>'+ date_err +'</div>' );
                    ele.val('');
                }
            }
        });
        $('div.alert button.close').on('click', function() {
            $(this).parent().remove();
        });
        //if any inputs on the page have the class 'needsfilled' the form will not submit
        if ($(":input").closest('.row').hasClass("needsfilled")) {
            return false;
        } else {
            $('#'+sib_prefix+'_loading_gif_area').show();
            $('form#theform').css('opacity', '0.5');
            return true;
        }
    });

    // Clears any fields in the form when the user clicks on them
    $(":input").on('click', function(){
        if ($(this).closest('.row').hasClass("needsfilled") ) {

            $(this).closest('.row').find('div.alert').remove();
            $(this).closest('.row').removeClass("needsfilled");
            if($(this).attr('type') == 'radio'){
                $(this).attr('checked', true);
            }else{
                $(this).val("");
            }
        }

    });

    $.each(getparams, function(index, element) {
        if (index != 'controller' && index != 'action' && index != 'js_id' && index != 'id' && index != 'module') {
            var input_fields = $('form').find('input');
            for (var j = 0; j < input_fields.length; j++) {
                var field_name = $(input_fields[j]).attr('name');
                if (index.toLowerCase() == field_name.toLowerCase()) {
                    if ($("[name=" + field_name + "]").attr('type') == 'radio') {
                        $('[name="' + field_name + '"][value="' + element + '"]').attr('checked', true);
                    }
                    else {
                        $("[name=" + field_name + "]").val(element);
                    }
                    break;
                }
            }
        }
    });

    // set last submit to avoid refresh post
    $("#hdn_email_txt").val(new Date().getTime());

    // allow to input 0-9,(,) and +/- only for sms
    function validateInteger(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.charCode || theEvent.which;

        key = String.fromCharCode( key );
        // 0-9, +/-, space, brackets
        var regex = /[ +0-9()-]/;
        if( !regex.test(key) || $('#SMS').val().length > 19 ) {
            theEvent.returnValue = false;
            key = theEvent.keyCode;
            // ignore input for del,tab, back, left, right, home amd end
            if(theEvent.preventDefault && key != 46 && key != 9 && key != 8 && key != 37 && key != 39 && key != 35 && key != 36) theEvent.preventDefault();
        }
    }
    $("#SMS").on('keypress', function (event){
        validateInteger(event);
    });
});

