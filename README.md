# Testify

VS Code extension to make life easier when running Ruby tests directly from your test files.

## Features

* Run your tests in the integrated VS Code terminal or an external application of your choice (OSX only)
* Add keyboard shortcuts to:
  - Run the test at the current line
  - Run the entire test file
  - Run the last test you ran

## Requirements

Able to run your test commands without the use of this extension (so `bundle exec rspec` should already work).

## Extension Settings

* `testify.command`: By default is `bundle exec rspec`
* `testify.terminalTarget`: Set to `integrated`, `terminal`, or `iterm`

## Extension Commands

* `testify.forgetLast` Forget the last test you ran
* `testify.testFile` Run current test file
* `testify.testLast` Run the last test you ran
* `testify.testLine` Run test at current line

## Upcoming Features

* Only supports RSpec testing, want to add support for `bin/rails test` soon
* Test and debug within VS Code
