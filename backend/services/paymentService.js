const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (amount, currency, paymentMethod) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod,
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error("Payment processing failed: " + error.message);
  }
};
