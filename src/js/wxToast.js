/*
showLoading 和 show 同时只能显示一个
showLoading 应与 hideLoading 配对使用
方法
show(Object object)
参数
{
    title
    icon
    image
    duration
    mask
    effect
    success
    fail
    complete
}
*/

(function(global, factory){
    global.wxToast = factory();
})(this, (function(){ 
    'use strict';
    return (function(){
        var icons = ["success", "warning", "loading", "none"];
        var effects = ["default", "fade-out", "zoom-out"];
        var options = {
            title: "",
            icon: "success",
            image: "",
            duration: 2000,
            mask: false,
            effect: "default",
            success: null,
            fail: null,
            complete: null
        };

        function extend(options, params){
            var collection = {};
            for(var item in options){
                collection[item] = typeof params[item] != "undefined" ? params[item] : options[item];
            }
            return collection;
        }

        function inArray(item, array){
            for(var index in array){
                if(array[index] === item){
                    return index;
                }
            }
            return -1;
        }

        function transform(transform) {
            var this$1 = this;

            if(this instanceof NodeList){
                for (var i = 0; i < this.length; i += 1) {
                    var elStyle = this$1[i].style;
                    elStyle.webkitTransform = transform;
                    elStyle.transform = transform;
                }
            }else if(this instanceof Node){
                this.style.webkitTransform = transform;
                this.style.transform = transform;
            }
            return this;
        }

        function transition(duration) {
            var this$1 = this;

            if (typeof duration !== 'string') {
                duration = duration + "ms"; // eslint-disable-line
            }

            if(this instanceof NodeList){
                for (var i = 0; i < this.length; i += 1) {
                    var elStyle = this$1[i].style;
                    elStyle.webkitTransitionDuration = duration;
                    elStyle.transitionDuration = duration;
                }
            }else if(this instanceof Node){
                this.style.webkitTransitionDuration = duration;
                this.style.transitionDuration = duration;
            }
            return this;
        }

        function createDiv(mask){
            var toastDiv = document.createElement("div");
            var titleDiv = document.createElement("div");
            toastDiv.className = "wxToast-default";
            titleDiv.className = "wxToast-title";
            toastDiv.appendChild(titleDiv);

            toastDiv.transform = transform;
            toastDiv.transition = transition;

            if(mask){
                var maskDiv = document.createElement("div");
                maskDiv.className = "wxToast-mask";
                maskDiv.appendChild(toastDiv);
            }

            return {
                top: mask?maskDiv:toastDiv,
                toast: toastDiv,
                title: titleDiv
            }
        }

        function createLoadingDiv( mask ){
            var loadingDiv = document.createElement("div");
            loadingDiv.className = "wxToast-default wxToast-loading";

            var loaderDiv = document.createElement("div");
            loaderDiv.className = "wxToast-loader";

            var titleDiv = document.createElement("div");
            titleDiv.className = "wxToast-title";

            loadingDiv.appendChild(loaderDiv);
            loadingDiv.appendChild(titleDiv);

            var loaderChild = document.createElement("div");
            for(var i = 0; i < 12; i++){
                loaderDiv.appendChild(loaderChild.cloneNode(true));
            }

            if(mask){
                var maskDiv = document.createElement("div");
                maskDiv.className = "wxToast-mask";
                maskDiv.appendChild(loadingDiv);
            }

            return {
                top: mask?maskDiv:loadingDiv,
                loading: loadingDiv,
                loader: loaderDiv,
                title: titleDiv
            }
        }

        function display(config, divs){
            var body = document.body || document.getElementsByTagName('body')[0];
            body.appendChild(divs.top);
            config.success && config.success();

            divs.layer = divs.toast || divs.loading;

            setTimeout((function(_body, _divs, _config){
                return function(){
                    switch(_config.effect){
                        case "fade-out":
                            _divs.layer.style.opacity = 0;
                            _divs.layer.transition(300);
                            break;
                        case "zoom-out":
                            _divs.layer.transform("scale(0.75)");
                            _divs.layer.style.opacity = 0;
                            _divs.layer.transition(300);
                            break;
                        default:
                            _body.removeChild(_divs.top);
                            _config.complete && _config.complete();
                            return;
                    }
                    setTimeout((function(__body, __divs, __config){
                        return function(){
                            __body.removeChild(__divs.top);
                            __config.complete && __config.complete();
                        }
                    })(_body, _divs, _config), 300)
                }
            })(body, divs, config), config.duration);
        }

        return {
            show: function(params){
                var el = document.querySelector(".wxToast-default");
                if(el){
                    var errmsg = "已存在wxToast元素";
                    console.warn(errmsg);
                    params.fail && params.fail(errmsg);
                    return;
                }

                (params.icon === "") && (params.icon = "none");
                params.icon && (params.icon = params.icon.toLowerCase());

                if(params.icon && inArray(params.icon, icons) == -1){
                    var errmsg = "参数icon:"+params.icon+"无效";
                    params.icon && console.warn(errmsg);
                    delete params.icon;

                    params.fail && params.fail(errmsg);
                    params.complete && params.complete();
                    return;
                }

                var config = extend(options, params);

                if(config.icon == "loading"){
                    this.showLoading({
                        title: config.title,
                        mask: config.mask,
                        success: config.success,
                        fail: config.fail
                    });

                    setTimeout((function(_this, _config){
                        return function(){
                            _this.hideLoading({
                                effect: config.effect,
                                complete: config.complete,
                                fail: config.fail
                            })
                        }
                    })(this, config), config.duration)
                    return;
                }

                var divs = createDiv(config.mask);

                if(config.image){
                    var bgimg = new Image();
                    bgimg.onload = (function(_divs){
                        return function(){
                            _divs.toast.style.backgroundImage = "url("+this.src+")";
                            var w = this.width;
                            var h = this.height;
                            var m = Math.max(w,h);
                            _divs.toast.style.backgroundSize = (w*42/m)+"px "+(h*42/m)+"px";
                        }
                    })(divs)
                    bgimg.onerror = function(){
                        console.warn("自定义图片加载出错:"+config.image);
                    }
                    bgimg.src = config.image;
                }else{
                    divs.toast.className += " wxToast-"+config.icon;
                }

                if(config.title){
                    divs.title.innerText = config.title;
                }else{
                    divs.toast.className += " wxToast-title-none";
                }

                display(config, divs);
            },
            showLoading: function(params){
                var el = document.querySelector(".wxToast-default");
                if(el){
                    var errmsg = "已存在wxToast元素";
                    console.warn(errmsg);
                    params.fail && params.fail(errmsg);
                    return;
                }

                var config = extend(options, params);
                delete config.icon;
                delete config.image;

                var divs = createLoadingDiv(config.mask);
                divs.title.innerText = config.title;

                var body = document.body || document.getElementsByTagName('body')[0];
                body.appendChild(divs.top);
                config.success && config.success();
            },
            hideLoading: function(params){
                params || (params = {});
                var divs = {};
                divs.top = document.querySelector(".wxToast-mask") || document.querySelector(".wxToast-loading");
                divs.layer = document.querySelector(".wxToast-loading");

                if(divs.top && divs.layer){
                    var body = document.body || document.getElementsByTagName('body')[0];
                    switch(params.effect){
                        case "fade-out":
                            divs.layer.transform = transform;
                            divs.layer.transition = transition;
                            
                            divs.layer.style.opacity = 0;
                            divs.layer.transition(300);
                            break;
                        case "zoom-out":
                            divs.layer.transform = transform;
                            divs.layer.transition = transition;
                            divs.layer.transform("scale(0.75)");
                            divs.layer.style.opacity = 0;
                            divs.layer.transition(300);
                            break;
                        default:
                            body.removeChild(divs.top);
                            params.complete && params.complete();
                            return;
                    }
                    setTimeout((function(_body, _divs, _params){
                        return function(){
                            _body.removeChild(_divs.top);
                            _params.complete && _params.complete();
                        }
                    })(body, divs, params), 300)
                }else{
                    params.fail && params.fail();
                }
            }
        }
    })()

}))
