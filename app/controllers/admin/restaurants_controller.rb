# frozen_string_literal: true

module Admin
  class RestaurantsController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # you can overwrite any of the RESTful actions. For example:
    #
    # def index
    #   super
    #   @resources = Restaurant.
    #     page(params[:page]).
    #     per(10)
    # end

    # Define a custom finder by overriding the `find_resource` method:
    def find_resource(param)
      Restaurant.find(params[:id])
    end

    def resource_class
      Restaurant
    end

    def scoped_resource
      Restaurant
    end

    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
    # for more information
  end
end