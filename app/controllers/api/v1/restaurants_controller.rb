class Api::V1::RestaurantsController < ActionController::API
	def index
		restaurants = Restaurant.all
		render json: restaurants, status: :ok
	end
end