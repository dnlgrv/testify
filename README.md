# Testify

VS Code extension to make life easier when running Ruby tests directly from your test files.

## Features

* Run your tests in the integrated VS Code terminal or an external application of your choice
* Add shortcuts to:
  - Run the test at the current line
  - Run the entire test file
  - Run the entire test suite

## Requirements

Able to run your test commands without the use of this extension (so `bundle exec rspec` should already work).

## Extension Settings

* `testify.command`: By default is `bundle exec rspec`
* `testify.terminal`: Set to `integrated`, `terminal.app`, or `iTerm2.app`

## Upcoming Features

* Only supports RSpec testing, want to add support for `bin/rails test` soon
* Test and debug within VS Code
