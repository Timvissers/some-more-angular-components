// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

// Config
angular.module('someMoreAngularComponents.config', [])
    .value('someMoreAngularComponents.config', {
        debug: true
    });

// Modules
angular.module('someMoreAngularComponents.directives', ['helloWorld']);
angular.module('someMoreAngularComponents.filters', []);
angular.module('someMoreAngularComponents.services', []);
angular.module('someMoreAngularComponents',
    [
        'someMoreAngularComponents.config',
        'someMoreAngularComponents.directives',
        'someMoreAngularComponents.filters',
        'someMoreAngularComponents.services'
    ]);
