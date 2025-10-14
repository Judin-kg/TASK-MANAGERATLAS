const cron = require("node-cron");
const Task = require("../models/Task");
// const Staff = require("../models/User");
const axios = require("axios");

// ⏰ Schedule Daily at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🔔 Running Daily Task Reminder...");

  try {
    // Get Pending Tasks
    const pendingTasks = await Task.find({ status: "pending" })
      .populate("assignedTo", "name contactNumber");
      console.log(pendingTasks,"pendingtasksssssssssssssssssssssssssssssssssssssssss");

    if (!pendingTasks.length) {
      console.log("✅ No pending tasks found.");
      return;
    }


    // Send reminders
    for (const task of pendingTasks) {
      const user = task.assignedTo;
      if (!user || !user.contactNumber) continue;
 console.log(user,"userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
 
      let contactNumber = user.contactNumber.startsWith("91")
        ? user.contactNumber
        : `91${user.contactNumber}`;

      const message = `⏰ *Daily Reminder*  
📝 Task: ${task.taskName}  
📅 Due: ${new Date(task.scheduledTime).toLocaleDateString()}  
⚠️ Status: Pending  
\nPlease update your task in portal.`;

      try {
        await axios.post("https://waichat.com/api/send", {
          number: contactNumber,
          type: "text",
          message: message,
          instance_id: "68E0E2878A990",
          access_token: "68de6bd371bd8",
        });
        console.log(`✅ Reminder sent to ${user.name}`);
      } catch (err) {
        console.error("❌ WhatsApp reminder failed:", err.message);
      }
    }
  } catch (err) {
    console.error("❌ Cron Error:", err.message);
  }
});
