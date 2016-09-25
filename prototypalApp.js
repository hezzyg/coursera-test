(
	function () {

		// angular.module('prototypalApp', []);		
		/*var parent = {
			value: "parentValue",
			obj: {
				objValue: "parentObjValue"
			},
			walk: function () {
				console.log("walking!!!");
			}
		};

		var child = Object.create(parent);
		console.log ("CHILD - child.value: ", child.value);
		console.log ("CHILD - child.obj.objValue: ", child.obj.objValue);
		console.log ("PARENT - parent.value: ", parent.value);
		console.log ("PARENT - parent.obj.objValue: ", parent.obj.objValue);
		console.log ("PARENT: ", parent);
		console.log ("CHILD: ", child);

		child.value = "childValue";
		child.obj.objValue = "childObjValue";
		console.log ("*** CHANGED: child.value = 'childValue'");
		console.log ("*** CHANGED: child.obj.objValue = 'childObjValue");
		console.log ("CHILD - child.value: ", child.value);
		console.log ("CHILD - child.obj.objValue: ", child.obj.objValue);
		console.log ("PARENT - parent.value: ", parent.value);
		console.log ("PARENT - parent.obj.objValue: ", parent.obj.objValue);
		console.log ("PARENT: ", parent);
		console.log ("CHILD: ", child);

		console.log ("child.Obj === parent.Obj ? ", child.obj === parent.obj);

		var grandChild = Object.create (child);
		console.log ("GrandChild: ", grandChild);
		grandChild.walk();
*/
		function Dog(name) {
			this.name = name;
			console.log("this is : ", this);
		}

		var myDog = new Dog("Max");
		console.log("myDog: ", myDog);

		//Not Being used as a function constructor
		Dog("Max2");
	}

)();