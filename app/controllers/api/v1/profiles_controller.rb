# frozen_string_literal: true

class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    render jsonapi: current_user.profile
  end

  def update
    current_user.profile.update_attributes(permitted_params)
    if current_user.profile.valid?
      render jsonapi: current_user.profile
    else
      render jsonapi_errors: current_user.profile.errors
    end
  end

  private

  def permitted_params
    params.permit(addresses: [:address, :tag])
  end
end
