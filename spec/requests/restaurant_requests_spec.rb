# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_restaurants'

describe 'Restaurants' do
  include_context 'shared restaurants'

  context 'authorized' do
    before do
      post api_v1_restaurants_path, params: create_params, as: :json
    end

    it '#create' do
      expect(response).to have_http_status(:success)
    end

    it '#show' do
      id = Restaurant.last.id
      get api_v1_restaurant_path(id)
      expect(response).to have_http_status(:ok)
    end

    it '#index' do
      get api_v1_restaurants_path
      expect(response).to have_http_status(:ok)
      data = JSON.parse(response.body)['data']
      expect(data).to be_empty

      restaurant = Restaurant.last
      restaurant.approval_status = :approved
      restaurant.save
      get api_v1_restaurants_path
      expect(response).to have_http_status(:ok)
      data = JSON.parse(response.body)['data']
      expect(data).not_to be_empty
    end
  end

  context 'invalid params' do
    it '#create' do
      post api_v1_restaurants_path, params: invalid_create_params, as: :json
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
