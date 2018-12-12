# frozen_string_literal: true

module Authenticate
  def is_authenticated_as(role)
    if current_user
      case role
      when :admin
        redirect_to new_admin_session_path unless current_user.admin?
      when :restaurant
        head 401 unless current_user.restaurant?
      when :courier
        head 401 unless current_user.courier?
      end
    else
      if role == :admin
        redirect_to new_admin_session_path
      else
        head 401
      end
    end
  end
end
