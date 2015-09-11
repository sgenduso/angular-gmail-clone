(function() {
  'use strict';

  angular
    .module('angularGmailClone')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
