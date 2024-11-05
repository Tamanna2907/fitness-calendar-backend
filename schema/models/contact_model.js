const {Schema, model}=require("mongoose");

const contactSchema= new Schema({
    name:{type:String, require:true},
    contact:{type:String, require:true},
    message:{type:String, require:true}
});

const contact= new model("Contact", contactSchema);

module.exports=contact;