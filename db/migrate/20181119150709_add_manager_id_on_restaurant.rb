class AddManagerIdOnRestaurant < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :manager_id, :integer, null: false
  end
end
