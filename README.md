# some-more-angular-components

This library contains some custom components. These components are simple, reusable and maintainable web components are written in Angular 1.4. 
These components are written in a way that should allow them to be easily upgraded for Angular 2.0.
Using great Angular libraries is what you (should) do in your day to day job. This codebase is merely to bring my Angular knowledge to another level. 
The components are for learning and testing sake and provide limited functionality. They are not full-blown and should not be used in production code. 

Most of the components are used in https://github.com/timv2/petstore

Technologies used:
* angular 1.4
* npm
* karma
* jasmine
* protractor TODO
* semver

Not used:
* any angular libraries as this is not the scope of the project

# install and include this library

	bower install some-more-angular-components

# directives

## smac-grid

A custom grid component. Sure I could use ui-grid or ng-table, but here's one of my own.

### API

#### Usage as element

Make your angular module depend on this angular module 'smac-grid'.
It is just using DIVs, you have to provide your own styling. A default style is provided (/src/smac/directives/css/smac-grid.css)

	<smac-grid list="yourAngularControllerAs.yourListOfObjects" fields="['yourField1ToShow','yourField2ToShow']"></smac-grid>

#### Arguments

| Param  | Type  | Details                                    |
| ------ | ----- | ------------------------------------------ |
| list   | array | Array of Objects having header:value pairs |
| fields | array | Array of Strings containing field headers  |

# services

## smac-error-handler

A custom error handler that enables setting/getting/resetting error messages

### How to use

Make your angular module depend on this angular module 'smac-error-handler'. Inject the SMACErrorHandler service and use the setError, getError and resetError functions.
You could bind on the getError.

	SMACErrorHandler.setError('Unexpected error');

	SMACErrorHandler.getError() //bind to it, watch on it, ...

## smac-fetch

A custom rest service, implemented using fetch API: https://developer.mozilla.org/en/docs/Web/API/Fetch_API.
In order to this smac-fetch angular module, you have to include its javascript library: https://github.com/github/fetch. 

	bower install fetch

See the github readme for more info. Be aware of browser compatibility: http://caniuse.com/#feat=fetch

Sure I could use $resource or restangular, or even straight $http. But for the sake of writing an angular service, here is some kind of "angular fetch"

### How to use

Make your angular module depend on this angular module 'smac-fetch'. Inject the 'SMACJsonFetcher'. 
Similar to Restangular, you can create a fetcher for 'all' on which you can getList() or addOne()
You can also create a fetcher for 'one' on which you can 'putOne', 'getOne' and 'deleteOne'

	var petsFetcher = SMACJsonFetcher.all('/api/pets');
	petsFetcher.getList(function(list){
		self.availablePets = list;
	});

	self.deletePet = function (pet) {
		var petFetcher = SMACJsonFetcher.one('/api/pets', pet._id);
		petFetcher.deleteOne();
	};

