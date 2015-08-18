// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

// Config
angular.module('smac.config', [])
    .value('smac.config', {
        debug: true
    });

// Modules
angular.module('smac.directives', ['helloWorld']);
angular.module('smac.filters', []);
angular.module('smac.services', []);
angular.module('smac',
    [
        'smac.config',
        'smac.directives',
        'smac.filters',
        'smac.services'
    ]);
