CORE.create_module("add-object", function(sandbox){
	/*private*/
	var iObjectName, bSend, bClear, tDescription, template;

	var clearAll = function(){
		iObjectName.value = tDescription.value = "";
		sandbox.disable(bSend);
        sandbox.disable(bClear);
	}

	var createProduct = function(){
		var objectName = iObjectName.value,
			objectDescription = tDescription.value;
		if(objectName && objectDescription){
			sandbox.notify({
				type:"add-object",
				data: {
					name: objectName,
					description: objectDescription
				}
			});
		}
		clearAll();
	}

	var checkState = function(ev){
		if(sandbox.trim(iObjectName.value) === "" || sandbox.trim(tDescription.value) === ""){
			sandbox.disable(bSend);
            sandbox.disable(bClear);
		}else{
			sandbox.enable(bSend);
            sandbox.enable(bClear);
		}
	}

	return{
		/*public*/
		init: function(){
			template = sandbox.compileTemplate("#addObjectTool-template");
			sandbox.appendChild(template());

			iObjectName = sandbox.find("#iobjectname")[0];
			bSend = sandbox.find("#isend")[0];
			bClear = sandbox.find("#iclear")[0];
			tDescription = sandbox.find("#tdescription")[0];

			sandbox.disable(bSend);
            sandbox.disable(bClear);

			sandbox.addEvent(bSend, "click", createProduct);
            sandbox.addEvent(bClear, "click", clearAll);
            sandbox.addEvent(iObjectName, "change, focusin, focusout, keyup", checkState);
            sandbox.addEvent(tDescription, "change, focusin, focusout, keyup", checkState);
		},
		destroy: function(){
			iObjectName = bSend = bClear = tDescription = null;
		}
	}
});