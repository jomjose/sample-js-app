CORE.create_module("searchingTool", function(sandbox) {
	
	/* private */

	var iSearch, bSearch, bReset, template;

	var clearInput = function(){
		iSearch.value = "";
		sandbox.disable(bSearch);
        sandbox.disable(bReset);

		sandbox.notify({
			type: "reset-search",
			data: null
		});
	};

	var search = function(){
		var query = iSearch.value;
		if(query){
			sandbox.notify({
				type: "do-search",
				data: query
			});
		}
	};

	var checkState = function(ev){
		if(sandbox.trim(iSearch.value) === ""){
			sandbox.disable(bSearch);
		}else{
			sandbox.enable(bSearch);
            sandbox.enable(bReset);
		}
	}


	return{

		/*public*/
		
		init: function(){
			template = sandbox.compileTemplate("#searchingTool-template");
			sandbox.appendChild(template());

			iSearch = sandbox.find("#isearch")[0],
            bSearch = sandbox.find("#bsearch")[0],
            bReset  = sandbox.find("#breset")[0];

            sandbox.disable(bSearch);
            sandbox.disable(bReset);

            sandbox.addEvent(bReset, "click", clearInput);
            sandbox.addEvent(bSearch, "click", search);
            sandbox.addEvent(iSearch, "change, focusin, focusout, keyup", checkState);
		},
		destroy: function(){
			sandbox.removeEvent(bReset, "click", clearInput);
            sandbox.removeEvent(bSearch, "click", search);
		}
	}
});