# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def authenticate_admin!
    head 401 unless current_user.admin?
  end

  def authenticate_restaurant!
    head 401 unless current_user.restaurant?
  end

  def authenticate_courier!
    head 401 unless current_user.courier?
  end
end
