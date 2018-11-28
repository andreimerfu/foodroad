class AddProgressValueToRestaurant < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :progress_value, :float, default: 0.0
  end
end
