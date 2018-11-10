class Api::V1::RestaurantsController < ActionController::API
	def index
		restaurants = Restaurant.find_nearest_restaurants(params[:lat], params[:lng])
		render json: restaurants, status: :ok
	end
end