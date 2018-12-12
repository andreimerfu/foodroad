class AddValidationStepsToRestaurant < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :validation_steps, :jsonb, default: {
      cui: false,
      documents: false,
      informations: false,
      menu: false
    }
  end
end
