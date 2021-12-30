import React from 'react'
import { connect } from 'react-redux'
import { getStripePubKey, createPaymentIntent } from '../../actions/stripe'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import ClientCheckoutForm from './ClientCheckoutForm'

const ClientCheckout = ({ cartLines, getStripePubKey, stripePubKey, createPaymentIntent, clientSecret }) => {

  const [totalPrice, setTotalPrice] = React.useState(0)

  React.useEffect(() => {
    let total = 0
    cartLines.forEach(line => {
      total += line.product.price * line.quantity
      total += line.product.shippingFee * line.quantity
    })
    setTotalPrice(total)
  }, [cartLines])

  React.useEffect(() => {
    if (totalPrice > 0) {
      createPaymentIntent({ price: totalPrice })
      getStripePubKey()
    }
  }, [totalPrice, createPaymentIntent, getStripePubKey])

  const [stripePromise, setStripePromise] = React.useState(null)

  React.useEffect(() => {
    if (stripePubKey) {
      let tempPromise = loadStripe(stripePubKey)
      setStripePromise(tempPromise)
    }
  }, [stripePubKey])

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='client-checkout'>
      <div>
        <div className='font-36 pt-3'>Checkout</div>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <ClientCheckoutForm />
        </Elements>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  cartLines: state.cart.lines,
  stripePubKey: state.stripe.stripePubKey,
  clientSecret: state.stripe.clientSecret
})

export default connect(mapStateToProps, { getStripePubKey, createPaymentIntent })(ClientCheckout)