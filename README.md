# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
  * 2.5.1
  * Use [ruby-install](https://github.com/postmodern/ruby-install) and [chruby](https://github.com/postmodern/chruby)
  * For convenience, add `chruby` to your `.bashrc` / `.zshrc` file
  * Check that you are currently using Ruby version 2.5.1 using `ruby --version`

* System dependencies
    * Ruby 2.5.1
    * Rails 5.2.1 (basically `gem install rails -v 5.2.1 --no-rdoc --no-ri`, see also [this](https://ryanbigg.com/2014/10/ubuntu-ruby-ruby-install-chruby-and-you))
    * Postgresql 10
    * Yarn ([this](https://github.com/yarnpkg/yarn/issues/1122#issuecomment-272757326) might help)

* Database installation
    * Check [official docs](https://www.postgresql.org/download/)
    * See [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04) for creating roles.

* Configuration
    * `bundle install`
    * `rails db:create`
    * `rails db:migrate`
    * `rails server` (or `rails s`) to start the backend server
    * `cd client/`, then `yarn install` and `yarn start` to start the frontend server

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
