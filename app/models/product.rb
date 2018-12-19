# frozen_string_literal: true

class Product < ApplicationRecord
  has_and_belongs_to_many :orders
  belongs_to :restaurant
  belongs_to :category

  validates_presence_of :name, :price, :description
  validates_numericality_of :price, greater_than: 0

  def computer_vision_category
    request = {
        "requests":  [
            {
                "features":  [
                  {
                      "type": "LABEL_DETECTION"
                  }
                ],
                "image":
                  {
                      "source": {
                          "imageUri": self.image
                      }
                  }
            }
        ]
    }

    response = HTTParty.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA11qF8h933s-PcglpBvVhh8ISnxYPOecE", body: request.to_json, headers: { 'Content-Type' => 'application/json' })
    category = nil

    if response.length > 0
      annotations = response.dig("responses")[0]["labelAnnotations"]

      annotations.each do |annotation|
        category = Category.find_by(name: annotation.dig("description"))
        return category if category
      end

      annotations.each do |annotation|
        category = Category.create(name: annotation.dig("description")) unless Category::BANNED_WORDS.include? annotation.dig("description").to_sym
        return category if category
      end
    end

    return Category.first
  end
end
