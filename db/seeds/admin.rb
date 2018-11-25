# frozen_string_literal: true

admin = User.find_by(role: :admin)
User.create(email: ENV['ADMIN_MAIL'], password: ENV['ADMIN_PASSWORD'], role: :admin) unless admin
admin = User.find_by(role: :admin)

puts 'error' unless admin
admin.confirm unless admin&.confirmed?
