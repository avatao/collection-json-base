1.0.0-beta.15 / 2017-07-20
==================

* Private variables made protected to allow access to child classes 

1.0.0-beta.14 / 2017-07-20
==================

* Made *store objects private and created getter methods 

1.0.0-beta.13 / 2017-07-20
==================

* Added convenience methods (getDataArray, setDataArray etc.)
* Ability to create a javascript object from data (dataToObject)

1.0.0-beta.12 / 2017-07-06
==================

* Not throwing errors when a data, item, query, link is missing, it will return
undefined instead -> this way frameworks like Angular will require less boilerplate
* items() method on the collection still throws error when no items are present
* Renamed dataValue method to getDataValue

1.0.0-beta.11 / 2017-07-04
==================

* Added optional params argument to the link's follow method, this way
links can preserve custom query parameters

1.0.0-beta.10 / 2017-07-03
==================

* Using base classes for return values, to make it compatible with
the framework specific implementations.

1.0.0-beta.9 / 2017-07-03
==================

* Fixed Item interface (added dataValue method)

1.0.0-beta.8 / 2017-07-03
==================

* Added dataValue method to the ItemBase class to eliminate boilerplate
in the client

1.0.0-beta.7 / 2017-06-29
==================

* Fixed more checks without typeof

1.0.0-beta.6 / 2017-06-29
==================

* Checking for undefined, because false boolean can be a valid value as well

1.0.0-beta.5 / 2017-06-28
==================

* Fixed ItemStore iterator

1.0.0-beta.4 / 2017-06-28
==================

* CollectionBase items method returns ItemStore object

1.0.0-beta.3 / 2017-06-28
==================

* Fixed ItemStore constructor

1.0.0-beta.2 / 2017-06-28
==================

* Refactored variable names (store variables)
* Created ItemStore with API (first, one method)

1.0.0-beta.1 / 2017-06-27
==================

* Finished tests for template validation and validations array extension
* Fixed issues during testing
* Connected travis
* The API is stabilizing (hence this is the first beta version)

1.0.0-alpha.20 / 2017-06-26
==================

* Added tests for template validations

1.0.0-alpha.19 / 2017-06-26
==================

* Added value types [extension](https://github.com/mamund/collection-json/blob/master/extensions/value-types.md)
* Template validations are now checking the values of the array as well
* Fixed regexp error message


1.0.0-alpha.18 / 2017-06-26
==================

* Hotfix: Data interface, constructor and json methods now properly using
the template validation extension properties

1.0.0-alpha.17 / 2017-06-26
==================

* Refactored template validation logic (better performance)
* Implemented template validation [extension](https://github.com/mamund/collection-json/blob/master/extensions/template-validation.md)


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
