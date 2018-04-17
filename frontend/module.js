/**
 * Created by de163402 on 22.06.2017.
 */
(function () {
    'use strict';

    angular.module('dashboard')
        .config(routeConfig);
    console.log("module works");
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                title: 'WorldBuilder',
                templateUrl: 'frontend/index.html',
                controller: 'dashboard',
                controllerAs: 'this'

            });
    }
})();