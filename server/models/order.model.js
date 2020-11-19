import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

    status: {
        type: String,
        enum: ['Pending','Confirmed','Cancelled'],
        required: true
    },
    Price:{
        type: Number,
    },
    orderNumber:{
        type:Number
    },
    requestedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        
    },
})

export default mongoose.model('Order', OrderSchema);