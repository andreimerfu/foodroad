class AddCuiToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :cui, :integer, null: false
  end
end
