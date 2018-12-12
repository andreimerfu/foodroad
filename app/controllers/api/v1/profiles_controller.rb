# frozen_string_literal: true

class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    render jsonapi: current_user.profile
  end

  def update
    current_user.profile.update(addresses: updated_addresses)
    if current_user.profile.valid?
      render jsonapi: current_user.profile
    else
      render jsonapi_errors: current_user.profile.errors
    end
  end

  private

  def permitted_params
    params.permit(addresses: [:address, :tag, :_destroy])[:addresses].map(&:to_h)
  end

  def deleted_addresses
    permitted_params.select { |x| x.has_key?(:_destroy) }
                    .map { |x| x.delete(:_destroy); x }
  end

  def new_addresses
    permitted_params.reject { |x| x.has_key?(:_destroy) }
  end

  def updated_addresses
    current_addresses = current_user.profile.addresses

    current_addresses = current_addresses.reject { |x| x.in?(deleted_addresses) }

    current_addresses.concat(new_addresses)
    current_addresses.uniq.sort_by { |x| x['tag'] }
  end
end
