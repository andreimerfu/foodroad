# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_restaurants'

describe 'Restaurant products' do
  include_context 'shared restaurants'

  let(:product_create_params) {
    {
      name: Faker::Food.dish,
      price: 10,
      description: Faker::Food.description
    }
  }

  context 'authorized' do
    before do
      create_restaurant
      post api_v1_restaurant_products_path(@restaurant_id),
           headers: manager_headers,
           params: product_create_params,
           as: :json
    end

    it '#create' do
      expect(response).to have_http_status(:created)
    end
  end
end
