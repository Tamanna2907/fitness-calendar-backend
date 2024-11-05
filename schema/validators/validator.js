const {z}=require("zod");

const registerationSchema= z.object({
    username: z
    .string({required_error: "Name is required"}).trim()
    .min(3,{message:"Name must be at least of 3 characters"})
    .max(255,{message:"Name must not be more than 255 characters"}),

    email: z
    .string({required_error:"Email is required"}).trim()
    .email({message:"Invalid email address"})
    .min(10, {message:"Email must be at least of 10 characters"})
    .max(255,{message:"Email must not be more than 255 characters"}),

    phone: z
    .string({required_error:"Phone is required"})
    .min(10,{message:"Phone must be at least of 10 digits"})
    .max(10,{message:"phone must not be more than 10 digits"}),

    password: z
    .string({required_error:"Password is required"}).trim()
    .min(7,{message:"Password must be at least of 7 charcters"})
    .max(100,{message:"Password must not be more than 100 characters"})
})

module.exports=registerationSchema;