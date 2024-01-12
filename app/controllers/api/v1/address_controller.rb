class Api::V1::AddressController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    addresses = Address.all
    render json: addresses
  end

  def create
    address = Address.create(address_params)
    render json: address
  end

  private
  def address_params
    params.require(:address).permit(
      :name,
      :address1,
      :address2, 
      :city, 
      :state, 
      :zip, 
      :country,
      :company,
      :phone,
      :email)
  end
end
