var workOut = angular.module('workOut', ['ngFileUpload'])
  .controller('contr', ['$scope', '$http', 'Upload','$window', function($scope, $http, Upload, $window) {

  var reload = function() {
    $http.get('/todolist').success(function(response) {
      $scope.todolist = response;
      $scope.listItem = "";
    });
  };
  var suc = function(response) {
    reload();
  };

  $scope.findPicName = function (){
    var pic = document.getElementById('file').files[0];
    $scope.picName = pic;
    console.log(pic.name, 'findPicName');
    console.log($scope.picName);
    return pic.name;
  }

  this.submit = function(){
      if (this.upload_form.file.$valid && this.file) {
          this.upload(this.file);
      }
      $scope.findPicName();
  }

  this.upload = function (file) {
      Upload.upload({
          url: 'http://localhost:5000/upload',
          data:{file:file}
      })
  };


  reload();

  $scope.addItem = function() {
    console.log(this);
    var data = {
      item: $scope.listItem.item,
      dueDate: $scope.listItem.dueDate,
      notes: $scope.listItem.notes,
      image: 'http://localhost:5000/uploads/'+$scope.findPicName()
    }

    $http.post('/todolist', data).success(suc());
    reload();
  };

  $scope.change = function() {
    $http.put('/todolist/' + $scope.listItem._id, $scope.listItem).success(suc())
    reload();
  };

  $scope.remove = function(id) {
    $http.delete('/todolist/' + id).success(suc());
  };

  $scope.edit = function(id) {
    $http.get('/todolist/' + id).success(function(response) {
      $scope.listItem = response;
    });
  };

}]);
