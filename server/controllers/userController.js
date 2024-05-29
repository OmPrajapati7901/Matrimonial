const userProfile = require('../model/userProfileSchema');

exports.createUser = async (req, res) => {
  try {
    console.log("in createUser")
    const user = new userProfile(req.body);
    await user.save();
    res.status(201).json({ userId: user.userId,  createdAt: user.createdAt });
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    
    
    const user = await userProfile.findOne({userId:req.params.userId});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {

 console.log("in update user")
 console.log(req.body)

    const user = await userProfile.findOneAndUpdate({userId:req.params.userId}, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ userId: user._id, username: user.username, updatedAt: user.updatedAt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.deleteUser = async (req, res) => {
//   try {
//     await userProfile.findByIdAndDelete(req.params.userId);
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
