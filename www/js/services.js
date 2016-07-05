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
          if (data.enchant) {
            params.ench = data.enchantId;
          }
          if (data.enchantSpell) {
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
  })

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
