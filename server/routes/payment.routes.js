// import { Router} from 'express';
// import { allPayment, buySubcription, cancelSubscription, getRazorPayApiKey, verifySubcription } from '../controllers/payment.controller.js';
// import {authorizedRoles, isLoggedIn} from '../middlewares/auth.middleware.js'


// const router = Router()

// router
//     .route('/razorpay-key')
//     .get(
//         isLoggedIn,

//         getRazorPayApiKey
//     );

// router
//     .route('/subscribe')
//     .post(
//         isLoggedIn,
//         buySubcription
//     );
    
// router
//     .route('/verify')
//     .post(
//         isLoggedIn,
//         verifySubcription
//     );

// router
//     .route('/unsubscribe')
//     .post(
//         isLoggedIn,
//         cancelSubscription
//     );

// router
//     .route('/')
//     .get(
//         isLoggedIn,
//         authorizedRoles('ADMIN'),
//         allPayment
//     );    
    
// export default router;    