(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {

    // Simply returns the argument it is passed.
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

    // Defines n as the length of the array of n is greater than the length of array
    if (n > array.length) n = array.length;

    // Returns value in last index if n is undefined, otherwise returns last n 
    // elements of array.
    return n === undefined ? array[array.length-1] : array.slice(array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    // Checks to see if collection is an array
    if (Array.isArray(collection)){
      // Uses traditional for loop to ensure that properties are not iterated over
      // when collection is an array
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      };
    } else {
      // Uses for...in loop to iterate collections that are objects
      for (var item in collection) {
        iterator(collection[item], item, collection);
      };
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {

    // Creates an empty results array. If no items match condition,
    // this array will be returned as is (empty)
    var results = [];

    // Uses _.each function to check each item in collection against
    // test condition. If item meets condition, item is pushed to
    // results array.
    _.each(collection, function(item){
      if (test(item)) {results.push(item)};
    });

    // Returns results array.
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    // Uses _.filter function but returns results when testing against
    // value is not (!) true
    return _.filter(collection, function(value) {
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    // Defines empty results array.
    var results = [];

    // Loops over each item in array.
    for (var i = 0; i < array.length; i++) {

      // Checks index of potentially unique item in results array.
      // If index is -1 (item not already in results), the item is pushed
      // to the results array.
      if (_.indexOf(results, array[i]) == -1) results.push(array[i]);
    }

    // Returns results array.
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // Creates empty array for results
    var results = [];

    // Checks to see if collection is an array
    if (Array.isArray(collection)){
      // Uses traditional for loop to ensure that properties are not iterated over
      // when collection is an array and pushes result of iteration to 
      // results array
      for (var i = 0; i < collection.length; i++) {
        results.push(iterator(collection[i], i, collection));
      };
    } else {
      // Uses for...in loop to iterate collections that are objects
      // and pushes result to results array
      for (var item in collection) {
        results.push(iterator(collection[item], item, collection));
      };
    }

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // Sets the accumulator to the first item if accumulator is not provided
    // as it is shifted off of the collection array
    if (accumulator === undefined) accumulator = collection.shift();

    // Creates a results variable with starting value of the accumulator
    var result = accumulator;

    // Loops through all remaining indexes in the collection 
    // (this does not include the first item if there was no accumulator
    //  as it has been shifted off of the collection already)
    if (Array.isArray(collection)){
      for (var i = 0; i < collection.length; i++){
        result = iterator(result, collection[i]);
      }
      return result;
    } else {
      for (var i in collection){
        result = iterator(result, collection[i]);
      }
      return result;
    }
  };

// So close yet so far to an elegant recusrsive approach to this problem.
// May come back to try to solve not iterating the first item when there
// is no accumulator but for now this code should not be run.
/*  
    if (accumulator !== undefined) {
      collection.unshift(accumulator);
      accumulator = undefined;
    }
    if (collection.length == 1) return iterator(null, collection[0]);  
    if (accumulator === undefined) {
      var item = collection.shift();
      return iterator(_.reduce(collection, iterator), item);
    };
  };
*/

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    // Declares result variable with inital value of true.
    var result = true;

    // If no iterator is included, defines iterator to push through values.
    if (iterator === undefined) iterator = _.identity;

    // Checks each value against iterator. If any fail, changes result to false.
    _.each(collection, function(item){
      if (!iterator(item)) result = false;
    });

    return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // Declares result variable with inital value of false.
    var result = false;

    // If no iterator is included, defines iterator to push through values.
    if (iterator === undefined) iterator = _.identity;
    
    // Checks each value against iterator. If any pass, changes result to true.
    _.each(collection, function(item){
      if (iterator(item)) result = true;
    });

    return result;

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  _.extend = function(obj) {

    // loops through all arguments passed in beyond the initial object
    for (var a = 1; a < arguments.length; a++){

      // loops through each property in those arguments
      for (var item in arguments[a]){

        // assigns each property to a property by the same name in the initial object
        obj[item] = arguments[a][item];
      };
    };

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    // loops through all arguments passed in beyond the initial object
    for (var a = 1; a < arguments.length; a++){

      // loops through each property in those arguments
      for (var item in arguments[a]){

        // assigns each property to a property by the same name in the 
        // initial object if that property is not already assigned
        if (obj[item] === undefined) obj[item] = arguments[a][item];
      };
    };

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // creates an empty object to store past results
    var pastResults = {};

    // returns the modified function
    return function() {
      // Creates empty string as starting point for the key for pastResults
      // then adds each argument to key. Tried using toString function but
      // gave unexpected results.
      var key = "";

      _.each(arguments, function(arg) {
        key += arg + ", ";
      });

      // checks to see if the key for the given arguments is in pastResults
      if (pastResults.hasOwnProperty(key)) {
        // returns results as previously calculated
        return pastResults[key];
      } else {
        // Calculates the results then adds the results to pastResults.
        // Struggled with this section for days not thinking about the
        // fact that the functions were not expecting an array for the
        // arguments. Had to look up how to apply an array of arguments.
        return pastResults[key] = func.apply(this, arguments);
      };
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Saves arguments as an array and then removes first two arguments.
    var args = Array.from(arguments)
    args.shift();
    args.shift();

    // Uses setTimeout to delay return of the function.
    setTimeout(function (){
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // Defines length variable, copies the provided array to original, 
    // creates an empty shuffled array, and an unasigned variable to be used
    // for the random indexes
    var length = array.length, original = array.slice(0), shuffled = [], rIndex;

    // loop for 1 to length of original array.
    for (var i = 1; i <= length; i++) {
      // choose a random number between 0 and array.length - 1;
      rIndex = Math.floor(Math.random() * (original.length - 1));
      
      // Pushes the item at the random index to the shuffled array. 
      shuffled.push(original[rIndex]);

      // Removes the random indexed item from the starting array.
      original.splice(rIndex, 1);
    };
    return shuffled;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
