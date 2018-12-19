# frozen_string_literal: true

require 'administrate/base_dashboard'

class RestaurantDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    products: Field::HasMany,
    categories: Field::HasMany,
    documents: Field::ActiveStorage.with_options(url_only: true),
    id: Field::Number,
    name: Field::String,
    address: Field::String,
    delivery_zone: Field::Number,
    min_order: Field::Number,
    delivery_time: Field::Number,
    lat: Field::Number.with_options(decimals: 2),
    lng: Field::Number.with_options(decimals: 2),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    image: Field::String,
    manager_name: Field::String,
    manager_email: Field::String,
    manager_phone: Field::String,
    approval_status: Field::String.with_options(searchable: false),
    manager_id: Field::Number,
    cui: Field::Number,
    progress_value: Field::Number,
    #validation_steps: Field::Text,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :products,
    :categories,
    :documents,
    :id,
    :name,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :products,
    :categories,
    :documents,
    :id,
    :name,
    :address,
    :delivery_zone,
    :min_order,
    :delivery_time,
    :lat,
    :lng,
    :created_at,
    :updated_at,
    :image,
    :manager_name,
    :manager_email,
    :manager_phone,
    :approval_status,
    :manager_id,
    :cui,
    :progress_value,
   # :validation_steps,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :products,
    :categories,
    :documents,
    :name,
    :address,
    :delivery_zone,
    :min_order,
    :delivery_time,
    :lat,
    :lng,
    :image,
    :manager_name,
    :manager_email,
    :manager_phone,
    :approval_status,
    :manager_id,
    :cui,
    :progress_value,
    #:validation_steps,
  ].freeze

  # permitted for has_many_attached
  def permitted_attributes
    super + [documents: []]
  end

  # Overwrite this method to customize how restaurants are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(restaurant)
    "Restaurant #{restaurant.name}"
  end
end
