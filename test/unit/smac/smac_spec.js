'use strict';

describe('', function () {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function (module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function () {

        // Get module
        module = angular.module('smac');
        dependencies = module.requires;
    });

    it('should load config module', function () {
        expect(hasModule('smac.config')).to.be.ok;
    });


    it('should load filters module', function () {
        expect(hasModule('smac.filters')).to.be.ok;
    });


    it('should load directives module', function () {
        expect(hasModule('smac.directives')).to.be.ok;
    });


    it('should load services module', function () {
        expect(hasModule('smac.services')).to.be.ok;
    });


});