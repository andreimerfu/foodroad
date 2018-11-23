# frozen_string_literal: true

RSpec.shared_context 'shared profiles', shared_context: :metadata do
  let(:update_params) {
    {
      addresses: [
        {
          address: 'Strada Academiei nr. 14',
          tag: 'Home'
        },
        {
          address: 'Strada Vulturilor nr. 98A',
          tag: 'Work'
        }
      ]
    }
  }
end

RSpec.configure do |rspec|
  rspec.include_context 'shared profiles', include_shared: true
end
