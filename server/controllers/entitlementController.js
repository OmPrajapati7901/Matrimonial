const entitlement = require('../model/entitlementSchema');

exports.getEntitlements = async (req, res) => {
  try {
    const entitlements = await entitlement.findOne({ userId: req.params.userId });
    if (!entitlements) {
      return res.status(404).json({ message: 'Entitlements not found' });
    }
    res.json(entitlements);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEntitlements = async (req, res) => {
  try {
    const entitlements = await entitlement.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ userId: entitlements.userId, role: entitlements.role, permissions: entitlements.permissions, updatedAt: entitlements.updatedAt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
