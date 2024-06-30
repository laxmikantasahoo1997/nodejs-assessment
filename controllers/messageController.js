// import Message from '../models/Message.js';

// export const scheduleMessage = async (req, res) => {
//   const { message, day, time } = req.body;

//   // Validate input
//   if (!message || !day || !time) {
//     return res.status(400).json({ success: false, message: 'Message, day, and time are required.' });
//   }

//   try {
//     // Calculate the scheduled time in milliseconds since Epoch
//     const scheduledTime = new Date(`${day}T${time}:00`).getTime();
//     const currentTime = Date.now();
//     const delay = scheduledTime - currentTime;

//     // Check if the scheduled time is in the future
//     if (delay <= 0) {
//       return res.status(400).json({ success: false, message: 'Scheduled time should be in the future.' });
//     }

//     // Schedule message insertion using setTimeout
//     setTimeout(async () => {
//       try {
//         // Create a MongoDB document for the scheduled message
//         const scheduledMessage = new Message({
//           message,
//           date: new Date(`${day}T${time}:00`),
//         });

//         // Save the message to MongoDB
//         await scheduledMessage.save();

//         console.log(`Message inserted into database at ${new Date().toLocaleString()}`);
//       } catch (error) {
//         console.error('Error saving message to MongoDB:', error);
//       }
//     }, delay);

//     // Respond with a success message immediately
//     res.status(200).json({ success: true, message: `Message scheduled on ${new Date(scheduledTime).toLocaleString()}.` });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
import Message from '../models/Message.js';
import schedule from 'node-schedule';

export const scheduleMessage = async (req, res) => {
  const { message, day, time } = req.body;

  // Validate input
  if (!message || !day || !time) {
    return res.status(400).json({ success: false, message: 'Message, day, and time are required.' });
  }

  try {
    // Calculate the scheduled time
    const scheduledTime = new Date(`${day}T${time}:00`);

    // Schedule message insertion using node-schedule
    schedule.scheduleJob(scheduledTime, async () => {
      try {
        // Create a MongoDB document for the scheduled message
        const scheduledMessage = new Message({
          message,
          date: scheduledTime,
        });

        // Save the message to MongoDB
        const response = await scheduledMessage.save();
      } catch (error) {
        console.error('Error saving message to MongoDB:', error);
      }
    });
    console.log(`Message scheduled on ${scheduledTime}.`)

    res.status(200).json({ success: true, message: `Message scheduled on ${scheduledTime}.` });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

