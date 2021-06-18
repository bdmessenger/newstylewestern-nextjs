const stripeAPI = require('stripe')(process.env.SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'POST METHOD ONLY'})
  } else if(req.method === 'POST') {
    const domainUrl = process.env.CLIENT_APP_URL
    const { line_items, customer_email } = req.body

    if( !line_items || !customer_email) {
      return res.status(400).json({ error: 'missing required session parameters'})
    }

    try {
      const session = await stripeAPI.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        customer_email,
        success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainUrl}/canceled`,
        shipping_address_collection: { allowed_countries: ['GB', 'US'] }
      })

      res.status(200).json({ sessionId: session.id})
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'An error occured, unable to create session.'})
    }
  }
}
