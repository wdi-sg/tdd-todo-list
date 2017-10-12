# Test Driven Development Todo List

This is Part 1 of a series of labs working towards building your first full stack web app.

- Part 1 - (this repo)
- Part 2 - Mongo todo list
- Part 3 - Express todo list pt1
- Part 3.1 - Mocha, Chai and Supertest todo list
- Part 4 - Express todo list pt2
- Part 5 - Multi Model todo list
- Part 6 - Users todo list

This Lab will be your first chance to apply the concepts of Test Driven Development and also introduce you to CRUD by building out the logic for a simple Todo List Application.

#### What is CRUD?
CRUD is an acronym that stands for Create, Read, Update, Destroy. These are the basic operations that you can perform on data. Most websites and applications you interact with contain some CRUD actions: Creating a user (create), Listing comments (read), editing your profile (update), or deleting a video you uploaded (destroy).

## Getting Started

* Fork and clone this repository
* Run `yarn install` to install dependencies
* `yarn test` - run test suite

## Requirements

You will write your tests one at a time using the [Node Assert Package](https://jeremiahalex.gitbooks.io/wdi-sg/content/02-js-jquery/js-tdd-intro/readme.html). After writing a test, and verifying that it fails, you should proceed to write the code required to pass the test.

Your tests should be written inside the `test/todo_tests.js` file and your implementation inside `controllers/todo.js`.

Todos should be stored as an array of Todo Objects. Each instance of a Todo should store a unique id that can be used to find it later. Use the included UUID generator to add one upon creation.

You should as a minimum implement the following features. Each will likely require more than one test to ensure that the requirement is met and robust.

### CREATE

#### Create(params)
* Should be able to create a new Todo with the following KVPs (Key-Value Pairs) in the `params` object:
  * `name` - get a milk
  * `description` = from colds storage
  * `completed` (true/false) = false
* Should automatically create an `_id` property for each new TODO and assign it a UUID
* Should be able to create a new Todo with just `name`, sensible defaults will be used for other fields.
* Should NOT be able to create a new Todo without a `name` being provided
* Should NOT allow a `name` less than 5 characters long

### READ

#### List
* Should return an array of all todos

#### Show(id)
* Should return the Todo Object with the specified `id`
* Should return null if no TODO with that `id` exists

### UPDATE

#### Update(id, updatedParams)
* Should be able to update the Todo with the given id, using the following KVPs (Key-Value Pairs) in the `updatedParams` object:
  * `name`
  * `description`
  * `completed` (true/false)
* Should allow individual fields to be updated
* Should NOT allow a `name` to be changed to blank or less than 5 characters in length
* Should return `true` if an update is successful, `false` if otherwise

### DESTROY

#### Destroy(id)
* Should be able to delete the Todo with the given `id`
* Should return `true` if the delete is successful, `false` if otherwise

#### DestroyAll()
* Should be able to delete all the Todos and return true

## Bonus

Currently the TODOs will disappear whenever the application is restarted. We can however, save the the TODOs array to a JSON file and load it again whenever the application starts. Find out how to do this and do it.

_**hint:** check the Node.js documentation for 'fs'_

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
