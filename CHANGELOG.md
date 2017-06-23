1.0.0-alpha.16 / 2017-06-23
==================

* Moved validations extension check here from angular implementation

1.0.0-alpha.15 / 2017-06-23
==================

* ValidationJSON's arguments property is optional

1.0.0-alpha.14 / 2017-06-23
==================

* Added set and setAll methods to Template base class

1.0.0-alpha.13 / 2017-06-23
==================

* Added data methods to Template and Item classes

1.0.0-alpha.12 / 2017-06-22
==================

* Validating href to be a valid URI
* Implemented json method on all classes to help serialisation
* Created DataBase class


1.0.0-alpha.11 / 2017-06-22
==================

* Added Validations Array [extension](https://github.com/collection-json/extensions/blob/master/validation_array.md)

1.0.0-alpha.10 / 2017-06-21
==================

* Query method is implemented on the CollectionBase class

1.0.0-alpha.9 / 2017-06-21
==================

* Query send method now takes an array of parameter objects

1.0.0-alpha.8 / 2017-06-21
==================

* Iterators and generators are now correctly transpiled

1.0.0-alpha.7 / 2017-06-21
==================

* Store classes are now iterable


1.0.0-alpha.6 / 2017-06-21
==================

* Added CollectionConfiguration and CollectionConfigurationManager classes

1.0.0-alpha.5 / 2017-06-20
==================

* Added [rxjs](https://www.npmjs.com/package/rxjs) to peerDependencies

1.0.0-alpha.4 / 2017-06-20
==================

* Fixed publish script

1.0.0-alpha.3 / 2017-06-20
==================

* Modified tsconfig.json so it will work with angular
* Added scripts for building and publishing
* Changed coding style, using curly braces all the time
* Using [Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) instead of Promise
* First published version

1.0.0-alpha.2 / 2017-06-16
==================

* Template interface now correctly using TemplateData instead of TemplateJSON interface
* Renamed Error to CollectionError to prevent name clash
* Modified package.json, tsconfig.json to prepare for publishing

1.0.0-alpha.1 / 2017-06-13
==================

* Created initial version of the library
