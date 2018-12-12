# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.distance_between_2_points(source, destination)
    source_location = Geokit::LatLng.new(source.first, source.last)
    destination_location = Geokit::LatLng.new(destination.first, destination.last)
    source_location.distance_to(destination_location.ll)
  end
end
