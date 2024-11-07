const {z} = require("zod");

const cycleInfoSchema = z.object({
    cycleLength: z.string({required_error:'Cycle Length must be specified'}).min(1),
    periodDuration: z.string({required_error:'perid dureation must be specified'}).min(1),
    lastPeriodDate: z.string({required_error:'last period date must be specified'}).min(10),
    cycleRegularity: z.string({required_error:'cycle regularity must be specified'})

});

module.exports = cycleInfoSchema;