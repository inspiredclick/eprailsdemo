class MainController < ApplicationController
  protect_from_forgery
  
  def index
    unless cookies.key?("sess_id")
      sess_id = (0...8).map { (65 + rand(26)).chr }.join
      cookies["sess_id"] = {value: sess_id, expires: 1.day.from_now}
    end
  end
end
