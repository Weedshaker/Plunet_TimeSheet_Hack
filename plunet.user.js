(function(plunetJS, undefined){
    plunetJS.init = function(){
        $ = jQuery;
        $(document).ready(function(){
            run(this);
        });
    }
    run = function(public){
        // fix enable scroll
        $('[scrolling="no"]').attr('scrolling', 'yes');
        // time and login
        var mod = {
            startTimeHour: '09',
            startTimeMin: '30',
            endTimeHour: '18',
            endTimeMin: '30',
            lunchTimeHour: '01',
            lunchTimeMin: '00',
            startEndTimeTxt: 'Start/End Time',
            lunchTxt: 'Lunch',
            otherActivities: 'select#OUTZE24',
            startEndTime: 'select#OUTZE23',
            startEndTimeValuesHour: 'input[id*="OUTZE"][id*="HH"]',
            startEndTimeValuesMin: 'input[id*="OUTZE"][id*="MN"]',
            timeOutVal: 1000,
            controller: function() {
                mod.initTime();
                mod.initLogin();
                setTimeout(function(){mod.initLocalStorage(mod.localStorage);}, mod.timeOutVal);
                //mod.login();
            },
            initLocalStorage: function(obj){
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        if(localStorage.getItem(key) === 'true'){
                            obj[key]();
                        }
                    }
                }
            },
            initTime: function(){
                if($('span.scrollColContent:contains(' + mod.startEndTimeTxt + ')').length < 1 && $('div.zeitErfassung').length >= 1){
                    console.log('initTime');
                    // addOtherActivities
                    $('div.zeitErfassung').prepend('<button id="addTime" type="button" style="color:red">Add Time</button>');
                    $('button#addTime').click(function(){
                        mod.localStorage.addOtherActivities('addStartEndTime');
                    });
                }
            },
            localStorage: {
                addOtherActivities: function(next){
                    console.log('addOtherActivities');
                    if($(mod.otherActivities + ' option:selected').val() != '4'){
                        $(mod.otherActivities).val('4').trigger('change');
                    }
                    if($(mod.otherActivities + ' option:selected').val() == '4'){
                        localStorage.setItem('addOtherActivities', 'false');
                        if(next){
                            localStorage.setItem(next, 'true');
                        }else{
                            localStorage.setItem('addLunch', 'true');
                        }
                    }
                    // restart when val still undefined
                    setTimeout(function(){mod.initLocalStorage(mod.localStorage);}, mod.timeOutVal);
                },
                addStartEndTime: function(){
                    console.log('addStartEndTime');
                    if($(mod.startEndTime + ' option:selected').val() != '5'){
                        $(mod.startEndTime).val('5').trigger('change');
                    }
                    if($(mod.startEndTime + ' option:selected').val() == '5' || $('span.scrollColContent:contains(' + mod.startEndTimeTxt + ')').length >= 1){
                        localStorage.setItem('addStartEndTime', 'false');
                        localStorage.setItem('addStartEndTimeValues', 'true');
                    }
                    // restart when val still undefined
                    setTimeout(function(){mod.initLocalStorage(mod.localStorage);}, mod.timeOutVal);
                },
                addStartEndTimeValues: function(){
                    console.log('addStartEndTimeValues');
                    var allSet = false;
                    if($(mod.startEndTimeValuesHour).eq(0).val() != mod.startTimeHour){
                        $(mod.startEndTimeValuesHour).eq(0).val(mod.startTimeHour);
                    }else{
                        allSet = true;
                    }
                    if($(mod.startEndTimeValuesMin).eq(0).val() != mod.startTimeMin){
                        $(mod.startEndTimeValuesMin).eq(0).val(mod.startTimeMin);
                    }else{
                        allSet = true;
                    }
                    if($(mod.startEndTimeValuesHour).eq(1).val() != mod.endTimeHour){
                        $(mod.startEndTimeValuesHour).eq(1).val(mod.endTimeHour);
                    }else{
                        allSet = true;
                    }
                    if($(mod.startEndTimeValuesMin).eq(1).val() != mod.endTimeMin){
                        $(mod.startEndTimeValuesMin).eq(1).val(mod.endTimeMin);
                    }else{
                        allSet = true;
                    }
                    if(allSet){
                        localStorage.setItem('addStartEndTimeValues', 'false');
                        localStorage.setItem('addOtherActivities', 'true');
                    }
                    // restart (no save on changes)
                    setTimeout(function(){mod.initLocalStorage(mod.localStorage);}, mod.timeOutVal);
                },
                addLunch: function(){
                    console.log('addLunch');
                    if($(mod.startEndTime + ' option:selected').val() != '13'){
                        $(mod.startEndTime).val('13').trigger('change');
                    }
                    if($(mod.startEndTime + ' option:selected').val() == '13' || $('span.scrollColContent:contains(' + mod.lunchTxt + ')').length >= 1){
                        localStorage.setItem('addLunch', 'false');
                        localStorage.setItem('addLunchTimeValues', 'true');
                    }
                    // restart when val still undefined
                    setTimeout(function(){mod.initLocalStorage(mod.localStorage);}, mod.timeOutVal);
                },
                addLunchTimeValues: function(){
                    console.log('addLunchTimeValues');
                    var allSet = false;
                    if($(mod.startEndTimeValuesHour).eq(2).val() != mod.lunchTimeHour){
                        $(mod.startEndTimeValuesHour).eq(2).val(mod.lunchTimeHour);
                    }else{
                        allSet = true;
                    }
                    if($(mod.startEndTimeValuesMin).eq(2).val() != mod.lunchTimeMin){
                        $(mod.startEndTimeValuesMin).eq(2).val(mod.lunchTimeMin);
                    }else{
                        allSet = true;
                    }
                    if(allSet){
                        localStorage.setItem('addLunchTimeValues', 'false');
                        localStorage.setItem('save', 'true');
                    }
                    // restart (no save on changes)
                    setTimeout(function(){mod.initLocalStorage(mod.localStorage);}, mod.timeOutVal);
                },
                save: function(){
                    console.log('save');
                    $('button#submitButton').click();
                    localStorage.setItem('save', 'false');
                },
                login: function(){
                    console.log('login');
                    if($(mod.loginSel).text() == mod.loginTxt){
                        window.setInterval(function(){$(mod.loginBtnSel).click();}, 20000);
                    }
                }
            },
            // remove the login functions and mod.initLogin(); [line 25] if you share this
            loginTxt: 'Login',
            loginSel: 'h1.ft_headline',
            loginBtnSel: 'button[alt="Login"]',
            cLoginBtnPos: 'div#header',
            youCanNotLogin: 'div.hinweis',
            initLogin: function(){
                if($(mod.loginSel).text() == mod.loginTxt && $(mod.loginBtnSel).length >= 1){
                    // addOtherActivities
                    $(mod.cLoginBtnPos).append('<button id="continuesLogin" style="color:red; position: absolute; top: 486px;" type="button">Continues Login</button>');
                    $('button#continuesLogin').click(function(){
                        localStorage.setItem('login', 'true');
                        mod.localStorage.login();
                    });
                    // if back at login page with Note:  You cannot login due to license problems!
                    if($(mod.youCanNotLogin).length >= 1){
                        mod.localStorage.login();
                    }
                }else{
                    localStorage.setItem('login', 'false');
                }
            }
        };
        mod.controller();
    }
}(window.plunetJS = window.plunetJS || {}));
//check if jQuery is loaded
if(typeof jQuery=="undefined") {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement("script");
    jqTag.type = "text/javascript";
    jqTag.src = "http://code.jquery.com/jquery-1.10.1.min.js";
    jqTag.onload = plunetJS.init;
    headTag.appendChild(jqTag);
}else {
     plunetJS.init();
}