CORE.create_module("object-panel", function(sandbox){
	/*private*/
	var container, objects, template, objectTemplate;

	function eachObject(fn) {
        var object;
        for (var i = 0 ; object = objects[i]; i++) {
            fn(object);
        }
    }

	var reset = function() {
        eachObject(function (object) {
            object.style.opacity = 1;        
        });
    };

    var search = function(query){
    	var query = query.toLowerCase();
    	eachObject(function(object){
    		if (object.getElementsByTagName('h5')[0].innerHTML.toLowerCase().indexOf(query) < 0) {
                object.style.opacity = 0.2;
            }else{
                object.style.opacity = 1;
            }
    	})
    };

    var addObject = function(data){
        var object = sandbox.appendChild(container, objectTemplate(data));
    	objects.push(object);
    };

	return{
		/*public*/
		init: function(){
            template = sandbox.compileTemplate("#objectPanel-template");
            objectTemplate = sandbox.compileTemplate("#objectPanelObject-template");
            sandbox.appendChild(template());

            container = sandbox.find("#container")[0];
            objects = sandbox.find(".object");

            var i=0
            for(; i<5; i++){
                addObject({name:"Item "+i, description:"Lorem ipsum dolor sit amet"});
            }

			

			sandbox.listen({
                'do-search': search,
                'reset-search'   : reset,
                'add-object'	: addObject
            });
		},
		destroy: function(){
			objects = null;
			sandbox.ignore(['do-search', 'reset-search', 'add-object']);
		}
	}
});

//START
CORE.start_all();