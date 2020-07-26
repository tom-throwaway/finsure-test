angular.module('infynityApp', []).controller('InfynityController', ['$scope', '$timeout', 'lenderDataService', function($scope, $timeout, lenderDataService) {

    $scope.loadLenderData = () => {
        $scope.loading = true;

        // Use $timeout to simulate delay in loading
        $timeout(2000).then(() => {
            lenderDataService.getLenderData()
                .then((response) => {
                    // Success
                    $scope.loading = false;
                    $scope.status = response.status;
                    $scope.data = response.data;
                    $scope.lenders = response.data.data;
                }, (response) => {
                    // Error
                    $scope.loading = false;
                    $scope.status = response.status;
                    $scope.data = response.data || 'Request failed';
                    $scope.lenders = undefined;
                })
            });
    }

    $scope.loadLenderData();
  }]);


angular.module('infynityApp').filter('titleCase', () => {
    return (input) => {
        return input.toLowerCase().split(' ').map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    };
});

angular.module("infynityApp").factory("lenderDataService", ['$http', function($http) {
        let method = 'GET';
        let url = 'data/lenders.json';
        
        return {
            getLenderData: () => {
                return $http({ method: method, url: url });
            }
        };
    }
]);