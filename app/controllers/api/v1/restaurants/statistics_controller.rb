# frozen_string_literal: true

class Api::V1::Restaurants::StatisticsController < ApplicationController
	def index
		most_wanted_product = Product.most_wanted_product(params[:restaurant_id])

		render json: {
			"most_wanted_product": most_wanted_product
		}, status: :ok
	end
end