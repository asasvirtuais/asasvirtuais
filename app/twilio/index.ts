import Twilio from 'twilio'

const twilio = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

export default twilio