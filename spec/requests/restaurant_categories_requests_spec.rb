# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_restaurants'

describe 'Restaurant categories' do
  include_context 'shared restaurants'

  let(:restaurant_categories_create_params) {
    {
      name: Faker::Food.ingredient
    }
  }

  let(:restaurant_categories_update_params) {
    {
      name: "#{Faker::Food.ingredient}_updated"
    }
  }

  context 'authorized' do
    before do
      create_restaurant
      post api_v1_restaurant_categories_path(@restaurant_id),
           headers: manager_headers,
           params: restaurant_categories_create_params,
           as: :json
      @category = Category.last
    end

    it '#create' do
      expect(response).to have_http_status(:success)
    end

    it '#update' do
      put api_v1_restaurant_category_path(@restaurant_id, @category.id),
          headers: manager_headers,
          params: restaurant_categories_update_params,
          as: :json
      expect(response).to have_http_status(:ok)
      new_name = JSON.parse(response.body)['data'].first['attributes']['name']
      expect(new_name).not_to match(@category.name)
    end
  end
end
