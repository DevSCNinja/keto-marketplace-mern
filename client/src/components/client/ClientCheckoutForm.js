import React from "react"
import { connect } from "react-redux"
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import { createOrder } from "../../actions/order"
import Spinner from '../layout/Spinner'
import { useHistory } from 'react-router-dom'

const CheckoutForm = ({ returnUrl, cartLines, createOrder, pageIsLoading, clientID }) => {
  const history = useHistory()
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const [formData, setFormData] = React.useState({
    shippingFirstName: '',
    shippingLastName: '',
    shippingPhoneNumber: '',
    shippingEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZipCode: '',
    billingNameOnCard: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
  })

  const {
    shippingFirstName,
    shippingLastName,
    shippingPhoneNumber,
    shippingEmail,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZipCode,
    billingNameOnCard,
    billingAddress,
    billingCity,
    billingState,
    billingZipCode,
  } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  React.useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          let orderDetail = JSON.parse(localStorage.getItem('orderDetail'))
          orderDetail.paymentIntent = paymentIntent.id
          createOrder({ orderDetail, cartLines }, clientID, history)
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe, clientID, cartLines, createOrder, history])

  const handleSubmit = async (e) => {
    e.preventDefault()

    localStorage.setItem('orderDetail', JSON.stringify(formData))

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occured.")
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {pageIsLoading ? <Spinner />
        :
        <div className='row mx-1 my-3 py-3 bg-white keto-rounded-lg keto-shadow'>
          <div className='col-md-6'>
            <p><b className='mb-4'>Shipping Info</b></p>
            <div className='form-group'>
              <label className='form-label'>First Name</label>
              <input
                className='form-control'
                type='text'
                name='shippingFirstName'
                value={shippingFirstName}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Last Name</label>
              <input
                className='form-control'
                type='text'
                name='shippingLastName'
                value={shippingLastName}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Phone Number</label>
              <input
                className='form-control'
                type='text'
                name='shippingPhoneNumber'
                value={shippingPhoneNumber}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Email</label>
              <input
                className='form-control'
                type='text'
                name='shippingEmail'
                value={shippingEmail}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Address</label>
              <input
                className='form-control'
                type='text'
                name='shippingAddress'
                value={shippingAddress}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>City</label>
              <input
                className='form-control'
                type='text'
                name='shippingCity'
                value={shippingCity}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>State</label>
              <input
                className='form-control'
                type='text'
                name='shippingState'
                value={shippingState}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Zip Code</label>
              <input
                className='form-control'
                type='text'
                name='shippingZipCode'
                value={shippingZipCode}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <p><b className='mb-4'>Billing Info</b></p>
            <PaymentElement id="payment-element" />
            <div className='form-group'>
              <label className='form-label'>Name On Card</label>
              <input
                className='form-control'
                type='text'
                name='billingNameOnCard'
                value={billingNameOnCard}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Address</label>
              <input
                className='form-control'
                type='text'
                name='billingAddress'
                value={billingAddress}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>City</label>
              <input
                className='form-control'
                type='text'
                name='billingCity'
                value={billingCity}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>State</label>
              <input
                className='form-control'
                type='text'
                name='billingState'
                value={billingState}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Zip Code</label>
              <input
                className='form-control'
                type='text'
                name='billingZipCode'
                value={billingZipCode}
                onChange={onChange}
                required
              />
            </div>

          </div>
          <div className='col-md-12'>
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Checkout"}
              </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
          </div>
        </div>
      }
    </form>
  )
}

const mapStateToProps = state => ({
  clientID: state.auth.user._id,
  returnUrl: state.stripe.returnUrl,
  cartLines: state.cart.lines,
  pageIsLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { createOrder })(CheckoutForm)