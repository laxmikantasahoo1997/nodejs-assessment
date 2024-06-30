import Policy from "../models/PolicyInfo.js";
import User from "../models/User.js";


// Controller function to get policy info by username
export const getPolicyInfoByUsername = async (req, res) => {
    try {
      let { username } = req.query; // Get the username from query parameters
      // Trim whitespace from username
      username = username.trim();
    
      if (!username) {
        return res.status(400).json({ success:false,message: 'Username required.' });
      }
      // Find the user by username (case-insensitive search)
      const user = await User.findOne({ firstName: { $regex: new RegExp(`^${username}$`, 'i') } });
  
      if (!user) {
        return res.status(404).json({ success:false,message: 'User not found' });
      }
  
      // Find policies associated with the user ID
      const policies = await Policy.find({ userId: user._id });
  
      res.status(200).json({success:false,policies});
    } catch (error) {
      res.status(500).json({ success:false,message: error.message });
    }
  };

// Controller function to get aggregated policy info by each user
export const getPolicyAggregation = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$userId',
          totalPolicies: { $sum: 1 },
          // You can add more fields to aggregate as needed
        },
      },
      {
        $lookup: {
          from: 'users', // Replace 'users' with your actual User collection name
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          totalPolicies: 1,
          user: {
            firstName: 1,
            dob:1,
            email: 1,
            phone:1,
            state:1,
            zip:1,
            address:1,
            userType:1,
          },
        },
      },
    ];

    const aggregatedData = await Policy.aggregate(pipeline);

    res.json(aggregatedData);
  } catch (err) {
    console.error('Error fetching aggregated policy data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

