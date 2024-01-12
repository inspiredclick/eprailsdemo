// Import all the channels to be used by Action Cable
import consumer from "./consumer"

consumer.subscriptions.create({ channel: "EasyPostChannel" })
