# frozen_string_literal: true

module Modules
  module Authenticate
    def is_authenticated_as(role)
      if current_user
        case role
        when :admin
          head 401 unless current_user.admin?
        when :restaurant
          head 401 unless current_user.restaurant?
        when :courier
          head 401 unless current_user.courier?
        end
      else
        head 401
      end
    end
  end
end