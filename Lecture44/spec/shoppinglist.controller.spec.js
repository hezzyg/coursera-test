describe("ShoppingListController", function() {

	beforeEach(module('ShoppingListApp'));

	var $controller;
	var ShoppingListController;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;

		var ShoppingListServiceErrorMock = {};
		ShoppingListServiceErrorMock.addItem = function (name, quantity) {
			throw new Error("Test Message");
		};
		ShoppingListServiceErrorMock.getItems = function () {
			return null;
		};

		shoppingListController = 
		$controller('ShoppingListController', 
			{ShoppingListService: ShoppingListServiceErrorMock});
	}));

	it("Should change error message in controller", function () {
		shoppingListController.addItem();
		expect(shoppingListController.errorMessage).toBe("Test Message");
	});

});