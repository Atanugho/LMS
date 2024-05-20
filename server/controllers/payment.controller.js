// import AppError from "../utils/error.util.js";
// import { razorpay } from "../server.js";
// import User from "../models/userModel.js";

// export const getRazorPayApiKey = async (req, res, next) => {
//   req.status(200).json({
//     success: true,
//     message: "Razorpay API key",
//     key: process.env.RAZORPAY_KEY_ID,
//   });
// };

// export const buySubcription = async (req, res, next) => {
//   const { id } = req.user;
//   const user = await User.findById(id);

//   if (!user) {
//     return next(new AppError("Unauthorized User,please login"));
//   }

//   if (user.role === "ADMIN") {
//     return next(new AppError("Admin cannot purchase subcription"));
//   }

//   const subscription = await razorpay.subscription.create({
//     plan_id: process.env.RAZORPAY_PLAN_ID,
//     customer_notify: 1,
//   });

//   user.subscription.id = subscription.id;
//   user.subscription.status = subscription.status;

//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: "Subcribed successfully",
//     subscription_id: subscription.id,
//   });
// };

// export const verifySubcription = async (req, res, next) => {
//   const { id } = req.user;
//   const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } =
//     req.body;

//   const user = await User.findById(id);

//   if (!user) {
//     return next(new AppError("Unauthorized User,please login"));
//   }

//   const subcriptionId = user.subcription.id;

//   const generatedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(`${razorpay_payment_id}|${subcriptionId}`)
//     .digest("hex");

//   if (generatedSignature !== razorpay_signature) {
//     return next(new AppError("Payemnt not verified,please try again", 500));
//   }

//   await payment.create({
//     razorpay_payment_id,
//     razorpay_subscription_id,
//     razorpay_signature,
//   });

//   user.subcription.status = "active";
//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: "Payment verified successfully!",
//   });
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const { id } = req.user;

//     const user = await User.findById(id);

//     if (!user) {
//       return next(new AppError("Unauthorized User,please login"));
//     }

//     if (user.role === "ADMIN") {
//       return next(new AppError("Admin cannot purchase subcription"));
//     }

//     const subcriptionId = user.subscription.id;

//     const subcription = await razorpay.subscriptions.cancel(subcriptionId);

//     user.subscription.status = subcription.status;

//     await user.save();
//   } catch (e) {
//     return next(new AppError(e.message, 500));
//   }
// };

// export const allPayment = async (req, res, next) => {
//     try {
//         const {count} = req.query;

//         const subscriptions = await razorpay.subscriptions.all({
//             count: count || 10,
//         });
    
//         res.status(200).json({
//             success:true,
//             message:'All payments',
//             subscriptions
//         }) 
//     } catch (e) {
//         return next(new AppError(e.message, 500));
//     }
    
// };
