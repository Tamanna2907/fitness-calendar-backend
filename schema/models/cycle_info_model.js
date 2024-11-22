const {Schema, model, default: mongoose} = require('mongoose');


const cycleInfoSchema = new Schema({
    cycleLength:{type:'number', require:true},
    periodDuration:{type:'number', require:true},
    lastPeriodDate:{type:'date', require:true},
    cycleRegularity:{type:'string', require:true},
    userId:{type:'string', require:true}
})

const cycleInfo = new mongoose.model("CycleInformation",cycleInfoSchema);

module.exports = cycleInfo;