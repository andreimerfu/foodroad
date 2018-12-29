class Recommendation < ApplicationRecord
  class Core
    attr_reader :user

    def initialize(user, restaurants)
      @user = user.profile
      @restaurants = restaurants
      @user_products = products
      @user_categories = categories(@user_products)
    end

    # Retrain model
    def training
      products = select_products(@user_categories).sample(20)
      recommandations = []

      products.each do |product|
        recommandations << Recommendation.new(profile: @user, product: product)
      end

      Recommendation.import recommandations
    end

    private
    def products
      orders = @user.orders
      products = []

      orders.each do |order|
        order_products = order.products

        order_products.each do |product|
          products << product
        end
      end

      products
    end

    def categories(products)
      categories = []

      products.each do |product|
        categories << product.category
      end

      categories
    end

    def select_products(categories)
      # The world's most advanced ML algorithm

      Product.where(restaurant: @restaurants)
             .where(category: categories)
             .to_a
    end
  end
end
