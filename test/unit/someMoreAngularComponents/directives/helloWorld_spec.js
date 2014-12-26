'use strict';

describe('helloWorld', function() {
    var element, scope;

    beforeEach(module('helloWorld'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = '<hello-world></hello-world>';
        element = $compile(element)(scope);
    }));

    describe('template', function(){
        it('is expected to be contain a paragraph containing hello world text', function(){
            assert.equal(element.html(), 'Hello World');//chai syntax
        });
    });
});