# frozen_string_literal: true

require 'rails_helper'

describe 'Profiles' do
  before(:all) do
    @user = FactoryBot.create(:user)
    @user.confirm
  end

  it 'creates profile when user is created' do
    expect(@user.profile).not_to be_nil
  end

  context 'requests' do
    let(:update_params) {
      {
        'addresses': [
          {
            'address': 'Strada Academiei nr. 14',
            'tag': 'Home'
          },
          {
            'address': 'Strada Vulturilor nr. 98A',
            'tag': 'Work'
          }
        ]
      }
    }

    before(:all) do
      post user_session_path, params: { email: @user.email, password: @user.password }
      @headers = response.headers.slice('Content-Type', 'access-token', 'token-type', 'client', 'expiry', 'uid')
    end

    context 'when things work' do
      it '#show' do
        get api_v1_profiles_path, headers: @headers
        expect(response.status).to eq(200)
      end

      it '#update' do
        expect(@user.profile.addresses).to be_empty
        put api_v1_profiles_path, headers: @headers, params: update_params, as: :json
        @user.reload
        expect(response.status).to eq(200)
        expect(@user.profile.addresses.length).to eq(2)
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
end