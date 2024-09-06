import mongoose from 'mongoose';
const homeDataSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    logoUrl: { type: String },
    facebookUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    instagramUrl: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    url:{type:String,required:true},

}, {
    timestamps: true,
    versionKey: false
})
const HomeDataModel = mongoose.model("homeData", homeDataSchema);

export default HomeDataModel;