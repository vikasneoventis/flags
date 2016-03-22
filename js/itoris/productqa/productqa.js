if(!ItorisHelper){var ItorisHelper={};}
ItorisHelper.addClassName=function(element,className){if(!element.hasClassName(className)){element.addClassName(className);}};ItorisHelper.removeClassName=function(element,className){if(element.hasClassName(className)){element.removeClassName(className);}};var ItorisProductQa={queryParams:{},hashRegex:/qa\[(([^\]])|(\]=))*\]/,flagNotClearQueryParams:false,config:{},searchField:null,init:function(){this.searchField=$('itoris_qa_search');this.checkHash();this.initSearch();},initSearch:function(){this.isInit=false;if(this.searchField){this.searchField.observe('keypress',function(event){if(event.keyCode==13){if(this.getSearchQuery()){this.updateFormStraight();}}}.bind(this));this.searchField.observe('focus',this.searchFocus.bind(this));this.searchField.observe('blur',this.searchBlur.bind(this));if($('itoris_qa_search_go')){$('itoris_qa_search_go').observe('click',function(){if(this.getSearchQuery()){this.queryParams.q=null;this.updateFormStraight();}
this.searchBlur();}.bind(this));}
if($('itoris_qa_search_reset')){$('itoris_qa_search_reset').observe('click',function(){if(this.getSearchQuery()){this.searchField.value='';this.queryParams.q=null;this.updateFormStraight();this.searchBlur();}}.bind(this));}
this.searchBlur();}
this.isInit=true;},checkHash:function(){var hash=this.getQaHash(true);if(hash){var paramsStr=hash.substring(3,hash.length-1);if(paramsStr.length){paramsStr=this.decode64(paramsStr);this.queryParams=paramsStr.toQueryParams();}
if(this.validateQueryParams()){if(this.queryParams.q&&!(this.queryParams.q instanceof Array)){this.queryParams.q=[this.queryParams.q];}
if(this.queryParams[this.getSearchQueryVarName()]){this.searchField.value=this.queryParams[this.getSearchQueryVarName()];this.highlightKeywordQuery();}
this.updateForm();}}},validateQueryParams:function(){if((this.queryParams.q&&isNaN(this.queryParams.q))||(this.queryParams.mode&&isNaN(this.queryParams.mode))||(this.queryParams.page&&isNaN(this.queryParams.page))){this.queryParams={};return false;}
return true;},getQaHash:function(checkTabAnchor){var origHash=window.location.hash;var anchor=window.location.hash?window.location.hash.substring(1):'';var qaAnchor=anchor.match(this.hashRegex);if(checkTabAnchor&&typeof iTabsSlider!='undefined'){var tabAnchor=anchor.match(/.*qa\[/);if(tabAnchor){iTabsSlider.switchToSlideByTitle(tabAnchor[0].substring(0,tabAnchor[0].length-3));window.location.hash=origHash;}}
return qaAnchor?qaAnchor[0]:null;},updateHash:function(){var hash=this.getQaHash();var params=$H(this.queryParams).toQueryString();var hashParamsQa='qa['+this.encode64(params)+']';if(hash){window.location.hash=window.location.hash.replace(this.hashRegex,hashParamsQa);}else{window.location.hash+=hashParamsQa;}},updateFormStraight:function(){if(!this.queryParams.mode){this.queryParams.mode=mode;}
if(!this.queryParams.page){this.queryParams.page=(typeof page!=="undefined")?page:1;}
this.queryParams[this.getSearchQueryVarName()]=this.getSearchQuery();this.updateForm();},updateForm:function(){this.flagNotClearQueryParams=true;new Effect.ScrollTo($('itoris_qa'),{duration:1});if(this.queryParams.q){var elements=[];for(var i=0;i<$$('#itoris_qa .itoris_productqa_question_id').length;i++){if($$('#itoris_qa .itoris_productqa_question_id')[i].value==this.queryParams.q){if($$('#itoris_qa .answers')[i]&&!$$('#itoris_qa .answers')[i].visible()){elements.push($$('#itoris_qa .answers')[i]);itoris_toggleQuestion(i);$$('#itoris_qa .arrow_r')[i].toggleClassName('arrow_b');}}}
if(elements.length&&(!this.queryParams[this.getSearchQueryVarName()]||this.isInit)){Effect.multiple(elements,Effect.SlideDown);}else{this.updatePage(this.queryParams.mode||mode,this.queryParams.page||page);}}else if(this.queryParams.mode||this.queryParams.page){this.updatePage(this.queryParams.mode,this.queryParams.page);}
this.flagNotClearQueryParams=false;},setQueryParam:function(name,value,isArray){if(isArray){if(!(this.queryParams[name]instanceof Array)){this.queryParams[name]=[];}
if(this.queryParams[name].indexOf(value)!=-1){return;}
this.queryParams[name].push(value);}else{this.queryParams[name]=value;}
this.updateHash();},removeQueryParam:function(name,value,isArray){if(this.queryParams[name]){if(isArray){this.queryParams[name]=this.queryParams[name].without(value);if(this.queryParams[name].length){return;}}
delete this.queryParams[name];this.updateHash();}},toggleQuestionBlock:function(num){answer_ajax=num;if($('itoris_qa_add_answer').visible()&&$$('#itoris_qa .answers')[num].visible()){Effect.multiple(new Array($('itoris_qa_add_answer'),$$('#itoris_qa .answers')[num]),Effect.SlideUp);itoris_toggleQuestion(num);$$('#itoris_qa .arrow_r')[num].toggleClassName('arrow_b');if($$('#itoris_qa .itoris_productqa_question_id')[num]){this.removeQueryParam('q',$$('#itoris_qa .itoris_productqa_question_id')[num].value,false);}}else{if($$('#itoris_qa .itoris_productqa_question_id')[num]){if($$('#itoris_qa .answers')[num].visible()){this.removeQueryParam('q',$$('#itoris_qa .itoris_productqa_question_id')[num].value,false);}else{this.setQueryParam('q',$$('#itoris_qa .itoris_productqa_question_id')[num].value,false);}}
Effect.toggle($$('#itoris_qa .answers')[num],'slide');itoris_toggleQuestion(num);$$('#itoris_qa .arrow_r')[num].toggleClassName('arrow_b');}},updatePage:function(modeId,pageNum){mode=modeId;page=pageNum;this.setQueryParam('mode',modeId,false);this.setQueryParam('page',pageNum,false);var params={product_id:productId,mode:modeId,page:pageNum,per_page:per_page,pages:pages,store_id:storeId};var searchQuery=typeof this.queryParams[this.getSearchQueryVarName()]!='undefined'?this.queryParams[this.getSearchQueryVarName()]:null;if(searchQuery){params[this.getSearchQueryVarName()]=searchQuery;}
if(!this.flagNotClearQueryParams){this.removeQueryParam('q');}
if(this.queryParams.q){params.question_id=this.queryParams.q;}
this.updateModeSelect(modeId);$('itoris_qa_add_answer').hide();Insertion.After($('itoris_qa_ajax'),$('itoris_qa_add_answer'));Ajax.Responders.register(itoris_productqa_responder);new Ajax.Updater({success:$('itoris_qa_ajax')},baseUrl+'question/mode',{method:'get',parameters:params});},updateModeSelect:function(modeId){for(var i=0;i<$$('#itoris_qa_select ul li').length;i++){if($$('#itoris_qa_select ul li')[i].value==modeId){$('itoris_qa_select_text').update($$('#itoris_qa_select ul li')[i].innerHTML);return;}}},getSearchQuery:function(){return this.searchField&&this.searchField.value!=this.config.default_search_message?this.searchField.value:null;},updateQuerySearchParam:function(value){this.queryParams[this.getSearchQueryVarName()]=value;},searchFocus:function(){if(this.searchField.value==this.config.default_search_message){this.searchField.value='';if(this.searchField.hasClassName('default-message')){this.searchField.removeClassName('default-message')}}},searchBlur:function(){if(this.searchField.value==''){this.searchField.value=this.config.default_search_message;if(!this.searchField.hasClassName('default-message')){this.searchField.addClassName('default-message')}}},getSearchQueryVarName:function(){return this.config.search_query_var;},keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode64:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+this.keyStr.charAt(enc1)+this.keyStr.charAt(enc2)+this.keyStr.charAt(enc3)+this.keyStr.charAt(enc4);}
return output;},decode64:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this.keyStr.indexOf(input.charAt(i++));enc2=this.keyStr.indexOf(input.charAt(i++));enc3=this.keyStr.indexOf(input.charAt(i++));enc4=this.keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
return output;},showQuestionForm:function(button){if(customerId||(visitorPost!=postA)){if((!questionFormVisible&&button.hasClassName('button_ask_questions'))||(questionFormVisible&&button.hasClassName('button_hide_form')))
{setTimeout('changeQuesionFormVisibility()',1300);if(captchaType){reloadCaptcha('captcha_question');}
ItorisHelper.removeClassName(button,'button_ask_questions_active');ItorisHelper.removeClassName(button,'button_hide_form_active');button.toggleClassName('button_ask_questions');button.toggleClassName('button_hide_form');$$('#itoris_qa .ask_questions')[0].toggleClassName('ask_questions_hide');Effect.toggle($('itoris_qa_add_question'),'slide',{duration:1.0});$('itoris_qa_form_add_question').reset();itoris_qa_reset_newsletter('itoris_qa_add_question','newsletter');itoris_qa_reset_newsletter('itoris_qa_add_question','notify');}}else{new Ajax.Request(baseUrl+'url/questionForm',{method:'get',onComplete:function(){itorisRedirect();}});}},subscribeToQuestion:function(questionId,button){if(questionId){var params={question_id:questionId};var emailElm=button.up().select('input')[0];if(emailElm){if(!Validation.validate(emailElm)){return;}
params.email=emailElm.value;}
Ajax.Responders.register(itoris_productqa_responder_icons);new Ajax.Request(baseUrl+'question/subscribe',{method:'post',parameters:params,onComplete:function(res){var response=res.responseText.evalJSON();if(response.error){itoris_alert(response.error);}else if(response.ok){itoris_alert(response.message);if(response.is_customer){var statusText=button.up().select('.subscribed-status-text')[0];if(statusText){statusText.show();button.hide();button.up().select('.unsubscribe')[0].show();}}}}});}},unsubscribeQuestion:function(questionId,button){if(questionId){var params={question_id:questionId};var emailElm=button.up().select('input')[0];if(emailElm){if(!Validation.validate(emailElm)){return;}
params.email=emailElm.value;}
Ajax.Responders.register(itoris_productqa_responder_icons);new Ajax.Request(baseUrl+'question/unsubscribe',{method:'post',parameters:params,onComplete:function(res){var response=res.responseText.evalJSON();if(response.error){itoris_alert(response.error);}else if(response.ok){itoris_alert(response.message);if(response.is_customer){var statusText=button.up().select('.subscribed-status-text')[0];if(statusText){statusText.hide();button.hide();button.up().select('.subscribe')[0].show();}}}}});}},highlightKeywordQuery:function(){if(this.queryParams[this.getSearchQueryVarName()]){this.highlightKeyword(this.queryParams[this.getSearchQueryVarName()]);}},highlightKeyword:function(keyword){var keywords=keyword.replace(/\s+/g,' ').split(' ');var elms=$('itoris_qa').select('.qa_text');for(var i=0;i<elms.length;i++){elms[i].innerHTML=this.highlight(keywords,elms[i].innerHTML);}
return this;},highlight:function(keywords,text){for(var j=0;j<keywords.length;j++){if(keywords[j]){var matches=text.match(new RegExp(keywords[j],'ig'));if(matches){matches=matches.uniq();if(matches.length){for(var i=0;i<matches.length;i++){switch(matches[i]){case'!':case'#':case'{':case'}':continue;}
text=text.gsub(matches[i],'{#!}'+matches[i]+'{!#}');}}}}}
return text.gsub('{#!}','<span class="highlight">').gsub('{!#}','</span>');}};var closeMenu=false;var questionFormVisible=false;function changeQuesionFormVisibility(){if(questionFormVisible){questionFormVisible=false;}else{questionFormVisible=true;}}
var addAnswerFormPosition=-1;function itoris_productqa_init(){Event.observe($$('#itoris_qa_alert .button_ok')[0],'click',function(){$('itoris_qa_alert').hide();$('itoris_qa_alert_back').hide();});Event.observe($('itoris_qa_select_menu'),'mouseout',function(){closeMenu=true;setTimeout(slideUpSelect,10);});Event.observe($('itoris_qa_select_menu'),'mouseover',function(){closeMenu=false;});Event.observe($('itoris_qa_select'),'mouseout',function(){closeMenu=true;if($('itoris_qa_select_menu').visible()){setTimeout(slideUpSelect,10);}});Event.observe($('itoris_qa_select'),'mouseover',function(){closeMenu=false;liAction=false;});Event.observe($('itoris_qa_select'),'click',function(){if(!liAction){Effect.toggle($('itoris_qa_select_menu'),'slide',{duration:0.3});$('itoris_qa_select_img').toggleClassName('select_up');}});itoris_toggleClass('#itoris_qa_select ul li','li_hover');$$('#itoris_qa_select ul li').each(itoris_menu,this);var buttonAskQuestion=$$('.button_ask_questions')[0]||$$('.button_hide_form')[0];if(buttonAskQuestion.hasClassName('button_hide_form')){questionFormVisible=true;}
Event.observe(buttonAskQuestion,'mouseover',function(){if(this.hasClassName('button_hide_form')){ItorisHelper.removeClassName(this,'button_ask_questions_active');ItorisHelper.addClassName(this,'button_hide_form_active');}else{ItorisHelper.addClassName(this,'button_ask_questions_active');}});Event.observe(buttonAskQuestion,'mouseout',function(){if(this.hasClassName('button_hide_form')){ItorisHelper.removeClassName(this,'button_ask_questions_active');ItorisHelper.removeClassName(this,'button_hide_form_active');}else{ItorisHelper.removeClassName(this,'button_ask_questions_active');}});Event.observe($$('#itoris_qa .button_add_question')[0],'mouseover',function(){this.toggleClassName('button_add_question_active');});Event.observe($$('#itoris_qa .button_add_question')[0],'mouseout',function(){this.toggleClassName('button_add_question_active');});Event.observe($$('#itoris_qa .button_hide_form')[0],'mouseover',function(){this.toggleClassName('button_hide_form_active');});Event.observe($$('#itoris_qa .button_hide_form')[0],'mouseout',function(){this.toggleClassName('button_hide_form_active');});Event.observe($$('#itoris_qa .button_hide_form')[0],'click',function(){Effect.SlideUp($('itoris_qa_add_answer'));});Event.observe($$('#itoris_qa .expand_img')[0],'click',function(){var elements=[];if(this.hasClassName('collapse_img')){for(var i=0;i<$$('#itoris_qa .answers').length;i++){if($$('#itoris_qa .answers')[i].visible()){elements.push($$('#itoris_qa .answers')[i]);itoris_toggleQuestion(i);$$('#itoris_qa .arrow_r')[i].toggleClassName('arrow_b');}}
if($('itoris_qa_add_answer').visible()){elements.push($('itoris_qa_add_answer'));}
Effect.multiple(elements,Effect.SlideUp);$('itoris_qa_collapse').hide();$('itoris_qa_expand').show();}else{for(var i=0;i<$$('#itoris_qa .answers').length;i++){if(!$$('#itoris_qa .answers')[i].visible()){elements.push($$('#itoris_qa .answers')[i]);itoris_toggleQuestion(i);$$('#itoris_qa .arrow_r')[i].toggleClassName('arrow_b');}}
Effect.multiple(elements,Effect.SlideDown);$('itoris_qa_expand').hide();$('itoris_qa_collapse').show();}
this.toggleClassName('collapse_img');});Event.observe($('itoris_qa_form_add_question'),'submit',function(event){event.stop();itoris_addQuestion();});Event.observe($$('#itoris_qa .button_add_question')[0],'click',itoris_addQuestion);Event.observe($('itoris_qa_form_add_answer'),'submit',function(event){event.stop();itoris_addAnswer();});Event.observe($('itoris_qa_button_add_answer'),'click',itoris_addAnswer);var showQuestionFormButton=$$('#itoris_qa .show_form')[0];Event.observe(showQuestionFormButton,'click',function(){ItorisProductQa.showQuestionForm(showQuestionFormButton);});$$('.itoris_qa_add_first_q_link').each(function(elm){Event.observe(elm,'click',function(){ItorisProductQa.showQuestionForm(showQuestionFormButton);});});Event.observe($('question_text'),'keyup',function(){limitText(this,question_length,'question_text_length');});Event.observe($('answer_text'),'keyup',function(){limitText(this,answer_length,'answer_text_length');});itoris_qa_define_newsletter('itoris_qa_add_question','newsletter');itoris_qa_define_newsletter('itoris_qa_add_question','notify');itoris_qa_define_newsletter('itoris_qa_form_add_answer','newsletter');}
var typeQuestion='question';var typeAnswer='answer';var actionRatingPlus='ratingPlus';var actionRatingMinus='ratingMinus';var actionInappr='inappr';function itoris_productqa_init_ajax_fields(){itoris_toggleClass('#itoris_qa .button_answer_question','button_answer_question_active');itoris_toggleClass('#itoris_qa .icon_good','icon_good_active');itoris_toggleClass('#itoris_qa .icon_bad','icon_bad_active');itoris_toggleClass('#itoris_qa .icon_inappr','icon_inappr_active');for(var i=0;i<$$('#itoris_qa .button_answer_question').length-1;i++){Event.observe($$('#itoris_qa .button_answer_question')[i],'click',(function itoris(num){return function(){if(customerId||(visitorPost!=postQ)){if(!$('itoris_qa_add_answer').visible()||($('itoris_qa_add_answer').visible()&&num!=addAnswerFormPosition)){addAnswerFormPosition=num;Insertion.After($$('#itoris_qa .answers')[num],$('itoris_qa_add_answer'));if(captchaType){reloadCaptcha('captcha_answer');}
Effect.SlideDown($('itoris_qa_add_answer'));setTimeout(function(){new Effect.ScrollTo($('itoris_qa_add_answer'),{duration:1})},100);$('itoris_qa_form_add_answer').reset();itoris_qa_reset_newsletter('itoris_qa_form_add_answer','newsletter');}}else{new Ajax.Request(baseUrl+'url/answerForm',{method:'get',parameters:'answer='+num+'&page='+page+'&form=1',onComplete:function(){itorisRedirect();}});}}})(i));}
for(var i=0;i<$$('#itoris_qa .question').length;i++){Event.observe($$('#itoris_qa .question')[i],'click',(function itoris(num){return function(){ItorisProductQa.toggleQuestionBlock(num);}})(i));}
var showQuestionFormButton=$$('#itoris_qa .show_form')[0];$$('#itoris_qa_ajax .itoris_qa_add_first_q_link').each(function(elm){Event.observe(elm,'click',function(){ItorisProductQa.showQuestionForm(showQuestionFormButton);});});$$('#itoris_qa_pages span').each(itoris_pages,this);$$('#itoris_qa .q_info .icon_good').each(itoris_questionHelpful,this);$$('#itoris_qa .q_info .icon_bad').each(itoris_questionNotHelpful,this);$$('#itoris_qa .q_info .icon_inappr').each(itoris_questionInappr,this);$$('#itoris_qa .a_info .icon_good').each(itoris_answerHelpful,this);$$('#itoris_qa .a_info .icon_bad').each(itoris_answerNotHelpful,this);$$('#itoris_qa .a_info .icon_inappr').each(itoris_answerInappr,this);ItorisProductQa.highlightKeywordQuery();}
function itoris_productqa_init_ajax_answers(){$$('#itoris_qa .a_info .icon_good').each(itoris_unregister,this);$$('#itoris_qa .a_info .icon_bad').each(itoris_unregister,this);$$('#itoris_qa .a_info .icon_inappr').each(itoris_unregister,this);$$('#itoris_qa .a_info .icon_good').each(itoris_answerHelpful,this);$$('#itoris_qa .a_info .icon_bad').each(itoris_answerNotHelpful,this);$$('#itoris_qa .a_info .icon_inappr').each(itoris_answerInappr,this);}
var question_id;var answer_id;var answer_ajax=0;function itoris_unregister(el){el.stopObserving();}
function itoris_pages(el){Event.observe(el,'click',function(){itoris_get_page(mode,page);})}
var liAction=false;function itoris_menu(el){Event.observe(el,'click',function(){closeMenu=false;liAction=true;Effect.toggle($('itoris_qa_select_menu'),'slide');$('itoris_qa_select_img').removeClassName('select_up');mode=el.value;itoris_get_page(mode,1);$('itoris_qa_select_text').update(el.innerHTML);});}
function itoris_toggleQuestion(num){if($$('#itoris_qa .q_corner_lb')[num]){$$('#itoris_qa .q_corner_lb')[num].toggleClassName('q_corner_lb_open');$$('#itoris_qa .q_corner_rb')[num].toggleClassName('q_corner_rb_open');$$('#itoris_qa .q_b')[num].toggleClassName('q_b_open');}}
function itoris_get_page(modeId,page){ItorisProductQa.updatePage(modeId,page);}
function itoris_iconAction(el,type,action){Event.observe(el,'click',function(){if(customerId||ItorisProductQa.config.allowRateGuestAll||(action==actionInappr&&ItorisProductQa.config.allowRateGuestInappr)){var responseBlock=(action==actionInappr)?{update:function(){}}:el.previous();var id=(type==typeQuestion)?question_id:answer_id;Ajax.Responders.register(itoris_productqa_responder_icons);new Ajax.Updater({success:responseBlock},baseUrl+type+'/'+action,{method:'get',parameters:'id='+id,onComplete:function(response){var resObj=response.responseText.evalJSON();if(resObj&&resObj.message){itoris_alert(resObj.message);}}});}else{itorisRedirect();}});}
function itoris_questionHelpful(el){itoris_iconAction(el,typeQuestion,actionRatingPlus);}
function itorisRedirect(){window.location=baseSiteUrl+'customer/account/login';}
function itoris_questionNotHelpful(el){itoris_iconAction(el,typeQuestion,actionRatingMinus);}
function itoris_questionInappr(el){itoris_iconAction(el,typeQuestion,actionInappr);}
function itoris_answerHelpful(el){itoris_iconAction(el,typeAnswer,actionRatingPlus);}
function itoris_answerNotHelpful(el){itoris_iconAction(el,typeAnswer,actionRatingMinus);}
function itoris_answerInappr(el){itoris_iconAction(el,typeAnswer,actionInappr);}
var itoris_productqa_responder={onCreate:function(){$('itoris_qa_loading').show();},onComplete:function(){$('itoris_qa_loading').hide();Ajax.Responders.unregister(itoris_productqa_responder);itoris_productqa_init_ajax_fields();}};var itoris_productqa_responder_icons={onCreate:function(){$('itoris_qa_loading').show();},onComplete:function(){$('itoris_qa_loading').hide();Ajax.Responders.unregister(itoris_productqa_responder_icons);}}
var itoris_productqa_responder_answers={onCreate:function(){$('itoris_qa_loading').show();},onComplete:function(){$('itoris_qa_loading').hide();Ajax.Responders.unregister(itoris_productqa_responder_answers);itoris_productqa_init_ajax_answers();}};function itoris_addQuestion(){var validator=new Validation($('itoris_qa_form_add_question'));if(!validator.validate())return false;question=$($('itoris_qa_form_add_question')['question']).getValue();if(question_length&&(question.length>question_length)){itoris_alert(itoris_message_question_length);}else{var params=$('itoris_qa_form_add_question').serialize();params+='&captcha='+captcha+'&mode='+mode+'&per_page='+per_page;Ajax.Responders.register(itoris_productqa_responder);var status_approved=5;new Ajax.Request(baseUrl+'question/add',{method:'post',parameters:params,onComplete:function(Res){var response=Res.responseText.evalJSON();var alertText='';if(response.subscribe){var alertText='<br/>'+response.subscribe;}
if(response.html){if($F('itoris_question_status')==status_approved){itoris_hasQuestions();$('itoris_qa_add_answer').hide();Insertion.After($('itoris_qa_ajax'),$('itoris_qa_add_answer'));$('itoris_qa_ajax').update(response.html);itoris_alert(itoris_message_question_added+alertText);}else{itoris_alert(itoris_message_question_moderation+alertText);}
$('itoris_qa_form_add_question').reset();itoris_qa_reset_newsletter('itoris_qa_add_question','newsletter');itoris_qa_reset_newsletter('itoris_qa_add_question','notify');}else if(response.captcha){itoris_alert('Wrong captcha code!'+alertText);}else{itoris_alert('Question has not been added');}
if(captchaType){reloadCaptcha('captcha_question');}}});}}
function itoris_addAnswer(){var validator=new Validation($('itoris_qa_form_add_answer'));if(!validator.validate())return false;var answer=$($('itoris_qa_form_add_answer')['answer']).getValue();if(answer_length&&(answer.length>answer_length)){itoris_alert(itoris_message_answer_length);}else{var params=$('itoris_qa_form_add_answer').serialize();params+="&question_id="+question_id+'&captcha='+captcha;var status_approved=5;Ajax.Responders.register(itoris_productqa_responder_answers);new Ajax.Request(baseUrl+'answer/add',{method:'post',parameters:params,onComplete:function(Res){var response=Res.responseText.evalJSON();var alertText='';if(response.subscribe){var alertText='<br/>'+response.subscribe;}
if(response.html){if($F('itoris_answer_status')==status_approved){$$('#itoris_qa .answers_ajax')[answer_ajax].update(response.html);var answersCount=parseInt($$('#itoris_qa .question')[answer_ajax].down('.answers_count',0).innerHTML);answersCount++;$$('#itoris_qa .question')[answer_ajax].down('.answers_count',0).update(answersCount);itoris_alert(itoris_message_answer_added+alertText);}else{itoris_alert(itoris_message_answer_moderation+alertText);}
$('itoris_qa_form_add_answer').reset();itoris_qa_reset_newsletter('itoris_qa_form_add_answer','newsletter');}else if(response.captcha){itoris_alert('Wrong captcha code!'+alertText);}else{itoris_alert('Answer has not been added');}
if(captchaType){reloadCaptcha('captcha_answer');}}});}}
function reloadCaptcha($id){document.getElementById($id).src=baseUrl+'captcha/'+captchaType+'?'+Math.random();}
function itoris_toggleClass(selector,activeClass){$$(selector).each(function(el){Event.observe(el,'mouseover',function(){el.toggleClassName(activeClass);});Event.observe(el,'mouseout',function(){el.toggleClassName(activeClass);},this);});}
function itoris_hasQuestions(){$('itoris_qa_body').removeClassName('body_empty');$$('.ask_questions')[0].removeClassName('ask_questions_empty');}
function itoris_showAnswerForm(num){Insertion.After($$('#itoris_qa .answers')[num],$('itoris_qa_add_answer'));}
function itoris_alert(message){$$('#itoris_qa_alert .message')[0].update(message);$('itoris_qa_alert').show();var countHeight=message.length+70;countHeight=(countHeight<110)?110:countHeight;$('itoris_qa_alert').setStyle({height:countHeight+'px'})
$('itoris_qa_alert_back').show();}
document.observe('dom:loaded',function(){productqa_init_timeout();});function productqa_init_timeout(){if($$('#itoris_qa_alert .button_ok').length){itoris_productqa_init();ItorisProductQa.init();}else{setTimeout(productqa_init_timeout,200);}}
function limitText(limitField,limitNum,notify){if(limitNum){if(limitField.value.length>limitNum){limitField.value=limitField.value.substring(0,limitNum);$(notify).show();}else{$(notify).hide();}}}
function slideUpSelect(){if(closeMenu&&!liAction){closeMenu=false;$('itoris_qa_select_img').toggleClassName('select_up');Effect.toggle($('itoris_qa_select_menu'),'slide',{duration:0.3});}}
function itoris_qa_define_newsletter(formId,type){if(!customerId){var email=$$('#'+formId+' .'+type+'-email .value')[0];var emailBox=$$('#'+formId+' .'+type+'-email')[0];var checkbox=$$('#'+formId+' .'+type+'')[0];Event.observe(checkbox,'click',function(elm){if(emailBox){if(emailBox.visible()){emailBox.hide();email.removeClassName('required-entry');email.removeClassName('validate-email');}else{emailBox.show();email.addClassName('required-entry');email.addClassName('validate-email');}}});Event.observe(email,'click',function(){if(!email.hasClassName('active')){email.value='';email.addClassName('active');}});Event.observe(email,'change',function(){if(!email.value){email.value=itoris_message_enter_email;email.removeClassName('active');}});}}
function itoris_qa_reset_newsletter(formId,type){if(!customerId){var email=$$('#'+formId+' .'+type+'-email .value')[0];var emailBox=$$('#'+formId+' .'+type+'-email')[0];if(emailBox){if(emailBox.visible()){emailBox.hide();email.removeClassName('required-entry');email.removeClassName('validate-email');email.removeClassName('active');}}}}