# frozen_string_literal: true

class Product < ApplicationRecord
  has_and_belongs_to_many :orders
  has_many :recommendations
  belongs_to :restaurant
  belongs_to :category

  validates_presence_of :name, :price, :description
  validates_numericality_of :price, greater_than: 0

  def self.most_wanted_product(restaurant_id)
    products = Product.where(restaurant_id: restaurant_id).includes(:orders).to_a
    top = []
    products.each do |product|
      orders = product.orders.count
      top << {
        "product_name": product.name,
        "orders": orders
      }
    end
    top.sort { |hash| hash[:orders] }.reverse
  end

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
    EasyTranslate.api_key = "AIzaSyA11qF8h933s-PcglpBvVhh8ISnxYPOecE"

    if response.length > 0
      annotations = response.dig("responses")[0]["labelAnnotations"]

      annotations.each do |annotation|
        name = EasyTranslate.translate(annotation.dig("description").to_s, from: :en, to: :ro).downcase
        category = Category.find_by(name: name)
        return category if category
      end

      annotations.each do |annotation|
        name = EasyTranslate.translate(annotation.dig("description").to_s, from: :en, to: :ro).downcase
        category = Category.create(name: name) unless Category::BANNED_WORDS.include? name
        return category if category
      end
    end

    return Category.first
  end
end
