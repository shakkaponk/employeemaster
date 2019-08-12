sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("web.web.controller.View1", {
		onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel("/xsodata/employee.xsodata", true);
			var oTable = new sap.ui.table.Table({
				title: "Employee table"
			});
			oTable.addColumn(new sap.ui.table.Column({
				label: "Employee ID",
				template: "EMPLOYEEID"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: "First name",
				template: "FIRSTNAME"
			}));
			oTable.setModel(oModel);
			oTable.bindRows("/employee");
			oTable.placeAt("uiArea");
		}
	});
});