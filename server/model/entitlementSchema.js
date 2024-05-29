const mongoose = require('mongoose');

const entitlementSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, required: true, default: 'User'},
  permissions: {
    userManagement: {
      viewUsers: { type: Boolean, default: false },
      editUsers: { type: Boolean, default: false },
      deleteUsers: { type: Boolean, default: false },
    },
    contentManagement: {
      viewProfiles: { type: Boolean, default: false },
      createProfiles: { type: Boolean, default: false },
      approveProfiles: { type: Boolean, default: false },
      blockProfiles: { type: Boolean, default: false },
    },
    analytics: {
      viewMetrics: { type: Boolean, default: false },
      exportReports: { type: Boolean, default: false },
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('entitlement', entitlementSchema);
