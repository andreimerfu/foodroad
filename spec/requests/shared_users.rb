# frozen_string_literal: true

RSpec.shared_context 'shared users', shared_context: :metadata do
  let(:user) {
    user = FactoryBot.create(:user)
    user.confirm
    user
  }

  let(:headers) {
    post user_session_path, params: { email: user.email, password: user.password }
    response.headers.slice('Content-Type', 'access-token', 'token-type', 'client', 'expiry', 'uid')
  }
end

RSpec.configure do |rspec|
  rspec.include_context 'shared users', include_shared: true
end