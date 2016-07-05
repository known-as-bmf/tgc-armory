angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('CharsCtrl', function ($scope, Chars) {
    $scope.searchTerm = '';
    $scope.chars = [];

    var doSearch = ionic.debounce(function (searchTerm) {
      Chars.search(searchTerm).success(function (data/*, status*/) {
        $scope.chars = data.data.results;
      });
    }, 500);

    $scope.search = function () {
      doSearch($scope.searchTerm);
    };
    $scope.clearSearch = function () {
      $scope.searchTerm = '';
      $scope.chars = [];
    };
  })

  .controller('CharDetailCtrl', function ($scope, $stateParams, $timeout, $ionicModal, config, Chars, Items) {
    $scope.staticRoot = config.staticRoot;
    $scope.sliderOptions = {
      autoHeight: true
    };

    var subtitles = ['Equipment', 'Slide 2', 'Slide 3'];

    Chars.get($stateParams.charId).success(function (data/*, status*/) {
      $scope.char = data.data;
    });

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
      $scope.$apply(function () {
        $scope.subtitle = subtitles[data.slider.activeIndex];
      });
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
      $scope.$apply(function () {
        $scope.subtitle = subtitles[data.slider.activeIndex];
      });
    });

    // modal
    $ionicModal.fromTemplateUrl('templates/item/item-modal.html', {
      scope: $scope,
      animation: 'zoom-in'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function (item) {
      //item.itemId = "30034";
      if (item) {
        Items.get(item).success(function (data) {
          $scope.item = data.data;
          $scope.modal.show();
        });
      }
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on show modal
    $scope.$on('modal.shown', function () {
      /*$timeout(function () {
       $scope.modal.hide();
       }, 2000);*/
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
  })

  .controller('AccountCtrl', function ($scope, $timeout, $ionicLoading) {
    $scope.$on('$ionicView.enter', function (e) {
      $ionicLoading.show();

      $timeout(function () {
        $ionicLoading.hide();
      }, 1000);
    });
  });
