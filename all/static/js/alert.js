/**
 * 弹出式提示框，默认1.2秒自动消失
 * @param message 提示信息
 * @param style 提示样式，有alert-success、alert-danger、alert-warning、alert-info
 * @param time 消失时间
 */
var prompt = function (message, style, time)
{
    style = (style === undefined) ? 'alert-success' : style;
    time = (time === undefined) ? 2000 : time;
    $('<div id="promptModal">')
        .appendTo('body')
        .addClass('alert '+ style)
        .css({"display":"block",
            "z-index":99999,
            "left":($(document.body).outerWidth(true) - 120) / 2,
            "top":$(window).height()*0.04,
            "position": "absolute",
			"font-size":"2rem",
			"height":"3rem",
			"line-height":"0.5rem",
            "padding": "20px",
            "border-radius": "10px"})
        .html(message)
        .show()
        .delay(time)
        .fadeOut(10,function(){
            $('#promptModal').remove();
        });
};
 
// 成功提示
var success_prompt = function(message, time)
{
    prompt(message, 'alert-success', time);
};
