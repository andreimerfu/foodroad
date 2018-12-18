# frozen_string_literal: true

class Api::V1::AuthController < ApplicationController
  def facebook_login
    @user = User.facebook_login(params)
    if @user.save
      tokens = @user.create_new_auth_token
      set_headers(tokens)

      render jsonapi: @user, status: :created
    else
      render jsonapi_errors: @user.errors, status: :unprocessable_entity
    end
  end

  def check_user
    render json: current_user, status: :ok
  end

  def log_out
    current_user.tokens.clear
    current_user.save
    render json: { message: 'Logout successful' }, status: :ok
  end

  private
  def set_headers(tokens)
    headers['access-token'] = tokens['access-token'].to_s
    headers['client'] =  tokens['client'].to_s
    headers['expiry'] =  tokens['expiry'].to_s
    headers['uid'] = @user.uid
    headers['token-type'] = tokens['token-type'].to_s
    headers['role'] = @user.role
  end
end
