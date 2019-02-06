class AddImageToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :image, :string, default: ""
  end
end
