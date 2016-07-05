angular.module('starter.services', [])
/* Characters */
  .factory('Chars', function (config, $http) {
    return {
      search: function (name) {
        return $http.get(config.apiRoot + '/search/char', {
          params: {
            q: name,
            limit: 50
          }
        });
      },
      get: function (id) {
        return $http.get(config.apiRoot + '/', {
          params: {
            char: id
          }
        });
      }
    };
  })

  /* Items */
  .factory('Items', function (config, $http) {
    return {
      search: function (name) {
        return $http.get(config.apiRoot + '/search/item', {
          params: {
            q: name,
            limit: 50
          }
        });
      },
      /*

       data = {
       id: <id>,
       gems: [<id>, <id>, ...],
       enchant: <id>,
       enchantSpell: <id>
       }

       or

       data = <id>

       */
      get: function (data) {
        var params = {};
        if (typeof data === 'object') {
          params.item = data.itemId;
          if (data.gems) {
            params.gems = data.gems.join(':');
          }
          if (data.enchantId) {
            params.ench = data.enchantId;
          }
          if (data.enchantSpellId) {
            params.enchspell = data.enchantSpellId;
          }
        } else {
          params.item = data;
        }
        return $http.get(config.apiRoot + '/', {
          params: params
        });
      }
    };
  });
