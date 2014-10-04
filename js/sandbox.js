var Sandbox =  {
    create : function (core, module_selector) {
        var CONTAINER = core.dom.query('#' + module_selector);
        return {
            find : function (selector) {
                return CONTAINER.query(selector);
            },
            addEvent : function (element, type, fn) {
                core.dom.bind(element, type, fn);           
            },
            removeEvent : function (element, type, fn) {
                core.dom.unbind(element, type, fn);              
            },
            notify : function (evt) {
                if (core.is_obj(evt) && evt.type) {
                    core.triggerEvent(evt);
                }         
            },
            listen : function (evts) {
                if (core.is_obj(evts)) {
                    core.registerEvents(evts, module_selector);
                }
            },
            ignore : function (evts) {
                if (core.is_arr) {
                    core.removeEvents(evts, module_selector);
                }   
            },
            addClass : function (el, args){
                return core.dom.addClass(el, args);
            },
            removeClass : function (el, args){
                return core.dom.removeClass(el, args);
            },
            hasClass : function(el, args){
                return core.dom.hasClass(el, args);
            },
            compileTemplate : function(el){
                return core.compileTemplate(el);
            },
            appendChild : function(el, obj){
                if(arguments.length === 1){
                    return core.dom.appendChild(CONTAINER, arguments[0]);
                }else{
                    return core.dom.appendChild(el, obj);
                }
            },
            trim: function(arg){
                return core.trim(arg);
            },
            disable : function(obj){
                core.dom.disable(obj);
            },
            enable : function(obj){
                core.dom.enable(obj);
            },
            createDomNode : function(obj){
                return core.dom.create(obj);
            },
            create_element : function (el, config) {
                var i, child, text;
                el = core.dom.create(el);
                
                if (config) {
                    if (config.children && core.is_arr(config.children)) {
                        i = 0;
                        while(child = config.children[i]) {
                            el.appendChild(child);
                            i++;
                        }
                        delete config.children;
                    }
                    if (config.text) {
                        el.appendChild(document.createTextNode(config.text));
                        delete config.text;
                    }
                    core.dom.apply_attrs(el, config);
                }
                return el;
            }
        };
    }
}