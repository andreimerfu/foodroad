# frozen_string_literal: true

class AdminSessionsController < ActionController::Base
  before_action :check_auth, only: :create

  def create
    redirect_to admin_restaurants_path
  end

  def destroy
    session.destroy
    redirect_to new_admin_session_path
  end

  private

  def check_auth
    email, password = permitted_params.values_at(:email, :password)
    resource = User.find_by(email: email)
    if resource&.valid_password?(password)
      sign_in :user, resource
    end
  end

  def permitted_params
    params.require(:admin_sessions).permit(:email, :password)
  end
end
