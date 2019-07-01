(function () {
  'use strict';

  angular
    .module('products')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        abstract: true,
        url: '',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '/products',
        templateUrl: 'modules/products/client/views/list-products.client.view.html',
        controller: 'ProductsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Products List'
        }
      })
      .state('products.create', {
        url: '/products/create',
        templateUrl: 'modules/products/views/form-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: newProduct
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Products Create'
        }
      })
      .state('products.edit', {
        url: '/:productId/edit',
        templateUrl: 'modules/products/client/views/form-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: getProduct
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Product {{ productResolve.name }}'
        }
      })
      .state('products.view', {
        url: '/:productId',
        templateUrl: 'modules/products/client/views/view-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: getProduct
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Product {{ productResolve.name }}'
        }
      });
  }

  getProduct.$inject = ['$stateParams', 'ProductsService'];

  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      productId: $stateParams.productId
    }).$promise;
  }

  newProduct.$inject = ['ProductsService'];

  function newProduct(ProductsService) {
    return new ProductsService();
  }
}());
