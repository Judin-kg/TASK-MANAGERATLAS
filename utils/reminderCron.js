// const cron = require("node-cron");
// const Task = require("../models/Task");
// // const Staff = require("../models/User");
// const axios = require("axios");

//  // ⏰ Schedule Daily at 7 AM
// cron.schedule("0 11 * * *", async () => {
//   console.log("🔔 Running Daily Task Reminder...");

//   try {
//     // Get Pending Tasks
//     const pendingTasks = await Task.find({ status: "pending" })
//       .populate("assignedTo", "name contactNumber");
//       console.log(pendingTasks,"pendingtasksssssssssssssssssssssssssssssssssssssssss");

//     if (!pendingTasks.length) {
//       console.log("✅ No pending tasks found.");
//       return;
//     }


//     // Send reminders
//     for (const task of pendingTasks) {
//       const user = task.assignedTo;
//       if (!user || !user.contactNumber) continue;
//  console.log(user,"userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
 
//       let contactNumber = user.contactNumber.startsWith("91")
//         ? user.contactNumber
//         : `91${user.contactNumber}`;

//       const message = `⏰ *Daily Reminder*  
// 📝 Task: ${task.taskName}  
// 📅 Due: ${new Date(task.scheduledTime).toLocaleDateString()}  
// ⚠️ Status: Pending  
// \nPlease update your task in portal.`;

//       try {
//         await axios.post("https://waichat.com/api/send", {
//           number: contactNumber,
//           type: "text",
//           message: message,
//           instance_id: "68E0E2878A990",
//           access_token: "68de6bd371bd8",
//         });
//         console.log(`✅ Reminder sent to ${user.name}`);
//       } catch (err) {
//         console.error("❌ WhatsApp reminder failed:", err.message);
//       }
//     }
//   } catch (err) {
//     console.error("❌ Cron Error:", err.message);
//   }
  
// },
// {
//     timezone: "Asia/Kolkata", // ✅ Proper timezone
// }
// );




const cron = require("node-cron");
const Task = require("../models/Task");
const axios = require("axios");






//   // Runs at 01:30 AM UTC → 07:00 AM IST
// cron.schedule("30 1 * * *", async () => {
//   console.log("🔔 Running Daily Task Reminder at 7:00 AM IST (01:30 UTC)...");
    
cron.schedule("0 5 * * *", async () => {
  console.log("🔔 Running Daily Task Reminder at 10:30 AM IST (05:00 UTC)...");
  
  try {
    const pendingTasks = await Task.find({ status: "pending" })
      .populate("assignedTo", "name contactNumber");

    if (!pendingTasks.length) {
      console.log("✅ No pending tasks found.");
      return;
    }

    for (const task of pendingTasks) {
      const user = task.assignedTo;
      if (!user || !user.contactNumber) continue;

      let contactNumber = user.contactNumber.startsWith("91")
        ? user.contactNumber
        : `91${user.contactNumber}`;

      const message = `⏰ *Daily Reminder*  
📝 Task: ${task.taskName}  
📅 Due: ${new Date(task.scheduledTime).toLocaleDateString()}  
⚠️ Status: Pending  
\nPlease update your task in the portal.`;

      await axios.post("https://waichat.com/api/send", {
        number: contactNumber,
        type: "text",
        message: message,
        instance_id: "68E0E2878A990",
        access_token: "68de6bd371bd8",
      });

      console.log(`✅ Reminder sent to ${user.name}`);
    }
  } catch (err) {
    console.error("❌ Cron Error:", err.message);
  }
});








// const cron = require("node-cron");
// const Task = require("../models/Task");
// const axios = require("axios");

// // ⏰ Run Every Day at 7 AM
// cron.schedule(
//   "0 7 * * *",
//   async () => {
//     console.log("🔔 Running Daily Task Reminder...");

//     try {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // remove time

//       // Get Pending Tasks
//       const pendingTasks = await Task.find({ status: "pending" })
//         .populate("assignedTo", "name contactNumber");

//       if (!pendingTasks.length) {
//         console.log("✅ No pending tasks found.");
//         return;
//       }

//       // Send reminders
//       for (const task of pendingTasks) {
//         const taskDate = new Date(task.scheduledTime);
//         taskDate.setHours(0, 0, 0, 0);

//         // ✅ Send only if today is equal or after scheduled date
//         if (today < taskDate) {
//           console.log(`⏳ Reminder not started yet for ${task.taskName}`);
//           continue;
//         }

//         const user = task.assignedTo;
//         if (!user || !user.contactNumber) continue;

//         let contactNumber = user.contactNumber.startsWith("91")
//           ? user.contactNumber
//           : `91${user.contactNumber}`;

//         const message = `⏰ *Daily Task Reminder*  
// 📝 Task: ${task.taskName}  
// 📅 Due: ${new Date(task.scheduledTime).toLocaleDateString()}  
// ⚠️ Status: Pending  
  
// Please update your task in the portal.`;

//         try {
//           await axios.post("https://waichat.com/api/send", {
//             number: contactNumber,
//             type: "text",
//             message: message,
//             instance_id: "68E0E2878A990",
//             access_token: "68de6bd371bd8",
//           });
//           console.log(`✅ Reminder sent to ${user.name}`);
//         } catch (err) {
//           console.error("❌ WhatsApp reminder failed:", err.message);
//         }
//       }
//     } catch (err) {
//       console.error("❌ Cron Error:", err.message);
//     }
//   },
//   {
//     timezone: "Asia/Kolkata", // ✅ Proper timezone
//   }
// );
