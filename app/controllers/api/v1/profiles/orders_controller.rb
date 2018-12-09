# frozen_string_literal: true

class Api::V1::Profiles::OrdersController < ApplicationController
  before_action -> { is_authenticated_as(:user) }, only: [:index]

  def index
    orders = current_user.profile.orders

    render jsonapi: orders, status: :ok
  end
end
