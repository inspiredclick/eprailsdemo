require 'easypost'

class EasyPostChannel < ApplicationCable::Channel
  GET_SHIPMENTS = 0
  CREATE_SHIPMENT = 1
  GET_SHIPMENT = 2

  @@client = EasyPost::Client.new(api_key: ENV['EASYPOST_API_KEY'])

  def subscribed
    stream_from "easy_post_channel_#{params["sess_id"]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # {command: 0, ...}
    case data['command']
    when GET_SHIPMENTS
      get_shipments(data)
    when CREATE_SHIPMENT
      create_shipment(data)
    when GET_SHIPMENT
      get_shipment(data)
    else
      # noop
    end
  end

  private

  def get_shipments(data)
    parsed_shipments = []
    shipments = @@client.shipment.all()
    shipments.shipments.each do |shipment|
      parsed_shipments << {
        id: shipment["id"],
        status: shipment["status"],
        tracking_code: shipment["tracker"]["tracking_code"],
        price: shipment["selected_rate"]["rate"],
      }
    end
    ActionCable.server.broadcast("easy_post_channel_#{data["sess_id"]}", {command: GET_SHIPMENTS, payload: parsed_shipments})
  end

  def create_shipment(data)
    sender = Address.find_by(id: data["payload"]["sender_id"])
    shipment_config = {
      to_address: {
        name: data["payload"]["recipient"]["name"],
        street1: data["payload"]["recipient"]["address1"],
        street2: data["payload"]["recipient"]["address2"],
        city: data["payload"]["recipient"]["city"],
        state: data["payload"]["recipient"]["state"],
        zip: data["payload"]["recipient"]["zip"],
        country: data["payload"]["recipient"]["country"],
        phone: data["payload"]["recipient"]["phone"] || nil,
        email: data["payload"]["recipient"]["email"] || nil,
      },
      from_address: {
        name: sender.name,
        street1: sender.address1,
        street2: sender.address2,
        city: sender.city,
        state: sender.state,
        zip: sender.zip,
        country: sender.country,
        phone: sender.phone || nil,
      },
      options: {
        label_format: "PDF",
        label_size: "4x6",
      },
      parcel: {
        length: data["payload"]["parcel"]["length"].to_i,
        height: data["payload"]["parcel"]["height"].to_i,
        width: data["payload"]["parcel"]["width"].to_i,
        weight: data["payload"]["parcel"]["oz"].to_i + data["payload"]["parcel"]["pounds"].to_i * 16,
      }
    }
    shipment = @@client.shipment.create(shipment_config)
    ActionCable.server.broadcast("easy_post_channel_#{data["sess_id"]}", {command: CREATE_SHIPMENT, payload: shipment})
  end

  def get_shipment(data)
    shipment = @@client.shipment.retrieve(data["payload"]["id"])
    ActionCable.server.broadcast("easy_post_channel_#{data["sess_id"]}", {command: GET_SHIPMENT, payload: shipment})
  end
end
