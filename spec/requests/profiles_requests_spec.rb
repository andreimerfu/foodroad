# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_users'
require 'requests/shared_profiles'

describe 'Profiles' do
  include_context 'shared users'
  include_context 'shared profiles'

  context 'authorized' do
    it '#show' do
      get api_v1_profiles_path, headers: headers
      expect(response).to have_http_status(:ok)
    end

    it '#update' do
      expect(user.profile.addresses).to be_empty
      put api_v1_profiles_path, headers: headers, params: update_params, as: :json
      user.reload
      expect(response).to have_http_status(:ok)
      expect(user.profile.addresses.length).to eq(2)
    end
  end

  context 'not authorized' do
    it '#show' do
      get api_v1_profiles_path
      expect(response).to have_http_status(:unauthorized)
    end

    it '#update' do
      put api_v1_profiles_path, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
