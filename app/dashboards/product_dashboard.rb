# frozen_string_literal: true

require 'administrate/base_dashboard'

class ProductDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    # restaurant: Field::BelongsTo,
    category: Field::BelongsTo,
    id: Field::Number,
    name: Field::String,
    price: Field::Number.with_options(decimals: 2),
    description: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    image: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    # :restaurant,
    :category,
    :id,
    :name,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :restaurant,
    :category,
    :id,
    :name,
    :price,
    :description,
    :created_at,
    :updated_at,
    :image,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    # :restaurant,
    :category,
    :name,
    :price,
    :description,
    :image,
  ].freeze

  # Overwrite this method to customize how products are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(product)
    "Product #{product.name}"
  end
end
