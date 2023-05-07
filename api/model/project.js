const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    projId: Number,
    projName: String,
    priority: String,
    description: String,
    strtDate: Date,
    endDate: Date,
    sprntNo: Number,
    projManager: String,
    projLead: String,
    // 'action'

})

module.exports = mongoose.model('Project', projectSchema);
