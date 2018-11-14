class AddRestaurantSearchIndex < ActiveRecord::Migration[5.2]
   def up
    execute <<~SQL
      CREATE EXTENSION pg_trgm;
      CREATE INDEX trgm_idx_restaurants_name ON restaurants USING gin (name gin_trgm_ops);
      CREATE INDEX trgm_idx_products_name ON products USING gin (name gin_trgm_ops);
      CREATE INDEX trgm_idx_categories_name ON categories USING gin (name gin_trgm_ops);
    SQL
  end

  def down
    execute <<~SQL
      DROP INDEX trgm_idx_restaurants_name;
      DROP INDEX trgm_idx_products_name;
      DROP INDEX trgm_idx_categories_name;
      DROP EXTENSION pg_trgm;
    SQL
  end
end
