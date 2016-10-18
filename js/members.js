(function(angular, $, _) {

  var resourceUrl = CRM.resourceUrls['org.civicrm.members'];
  var members = angular.module('members', ['ngRoute', 'crmResource']);

  members.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/members', {
        templateUrl: '~/members/members.html',
        controller: 'MembersCtrl',
        resolvexx: {
          members: function(crmApi) {
            return CRM.api3('membership', 'get',{
            return: ["membership_name", "start_date"]
            });
          }  
        }  
      });
    }
  ]);

  members.controller('MembersCtrl', function($scope) {  
    initialize();
    
    function initialize() {
      $scope.ts = CRM.ts('org.civicrm.members');
      $scope.startDate = new Date();
      $scope.endDate = new Date();
      $scope.members = [];
      $scope.fetchAllMembers = fetchAllMembers;
      $scope.filterMembers = filterMembers;    
      $scope.recordsFound = true;
      $scope.recordsNotFound = false      
      fetchAllMembers();    
    }       
    
    // UI/Public methods : start
    function fetchAllMembers() { 
      CRM.api3('Membership', 'get', {
        "sequential": 1
      }).done(function(members) {
        $scope.members = members.values;
        $scope.$digest();
      });
    };  
    
    function filterMembers(){ 
      $scope.members = [];
      
      CRM.api3('Membership', 'get', {
        "sequential": 1,
        "start_date": {"BETWEEN":[startDate_(), endDate_()]}
      }).done(function(members) {
        $scope.members = members.values;
        $scope.$digest();
      });
    };  
    // UI/Public methods : End
    
    // private/internal methods : Start
    $scope.$watch("members.length", function(length){
      $scope.recordsFound = length;
      $scope.recordsNotFound = !$scope.recordsFound;
      
      $scope.members.forEach(function(member){
        member.start_date = buildDateInMMDDYYYY(member.start_date);  
      });
    });
    
    function buildDateInMMDDYYYY(date) {
      var arr = date.split('-');   
 
      return arr[1] + '/' + arr[2] + '/' + arr[0];
    }
    
    function buildDateInYYYYMMDD(date) {
      var year = parseInt(date.getYear()) + 1900;
      var month = parseInt(date.getMonth()) + 1;
      var day = parseInt(date.getDate());
      
      return year + '-' + month + '-' + day;
    }
    
    function startDate_() {
      return buildDateInYYYYMMDD($scope.startDate)
    }
    
    function endDate_() {
      return buildDateInYYYYMMDD($scope.endDate)
    }
    // private/internal methods : End    
    
  }); 
      
})(angular, CRM.$, CRM._);