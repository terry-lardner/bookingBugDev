'use strict';

angular.module('dashboard',['apiService'])
.component('dashboard', {
  templateUrl: "components/dashboard/dashboard.html",
	bindings: {
		companyId: '<'
	},
	controller: ['$http', 'apiService', '$log', DashboardController]
}); 

function DashboardController($http, apiService, $log) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.companyId = 41285; //41285
    ctrl.services = [];
  
    //self.programs = [];
    apiService.getServicesByCompanyId(ctrl.companyId).then(function(data) {
      ctrl.services = data;

      for (var i=0; i<ctrl.services.length; i++) {
        if (ctrl.services[i].prices.length <= 0) {
          ctrl.services[i].prices.push(0);
        }
      
        if (typeof ctrl.services[i].description === 'undefined') {
          ctrl.services[i].description = '';
        }
      
        for(var j=0; j<ctrl.services[i].prices.length;j++) {
          ctrl.services[i].prices[j] = formatPrice(ctrl.services[i].prices[j]);
        }
      }
    });
  }
		
}

function formatPrice(price) {
    return Number(price/100).toFixed(2);
}
