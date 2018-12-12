class AddDefaultAddressToRestaurants < ActiveRecord::Migration[5.2]
  def change
    change_column :restaurants, :address, :string, default: ""
  end
end
