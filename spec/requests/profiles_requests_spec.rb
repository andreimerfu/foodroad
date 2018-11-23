# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_users'
require 'requests/shared_profiles'

describe 'Profiles' do
  include_context 'shared users'
  include_context 'shared profiles'

  context 'when things work' do
    it '#show' do
      get api_v1_profiles_path, headers: headers
      expect(response.status).to eq(200)
    end

    it '#update' do
      expect(user.profile.addresses).to be_empty
      put api_v1_profiles_path, headers: headers, params: update_params, as: :json
      user.reload
      expect(response.status).to eq(200)
      expect(user.profile.addresses.length).to eq(2)
    end
  end

  context 'when not authorized' do
    it '#show' do
      get api_v1_profiles_path
      expect(response.status).to eq(401)
    end

    it '#update' do
      put api_v1_profiles_path, params: update_params
      expect(response.status).to eq(401)
    end
  end
end
