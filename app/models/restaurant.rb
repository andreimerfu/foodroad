class Restaurant < ApplicationRecord		
	
	def self.find_nearest_restaurants(lat, lng)
		restaurants = Restaurant.all
		current_location = [lat.to_f, lng.to_f]
		nearest_restaurants = []
		
		restaurants.each do |restaurant|
			destination = [restaurant.lat, restaurant.lng]
			if self.distance_between_2_points([current_location], destination) <= restaurant.delivery_zone
				nearest_restaurants << restaurant
			end
		end
		nearest_restaurants
	end

	def self.distance_between_2_points(source, destination)
		source_location = Geokit::LatLng.new(source.first, source.last)
		destination_location = Geokit::LatLng.new(destination.first, destination.last)
		source_location.distance_to(destination_location.ll)
	end
end