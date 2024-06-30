import { parentPort, workerData } from 'worker_threads';
import xlsx from 'xlsx';
import mongoose from 'mongoose';
import { formatDate } from '../utils/index.js';
import Agent from '../models/Agent.js';
import User from '../models/User.js';
import PolicyCategory from '../models/PolicyCategory.js';
import PolicyCarrier from '../models/PolicyCarrier.js';
import PolicyInfo from '../models/PolicyInfo.js';
import UserAccount from '../models/UserAccount.js';

async function uploadData() {
  try {
    // mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    const workbook = xlsx.readFile(workerData);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);


     // Filter and map data for Agent collection
     const agentData = data.map(row => ({
        agent: row.agent,
      }));
  
      // Filter and map data for User collection
      const userData = data.map(row => ({
        firstName: row.firstname,
        dob: formatDate(row.dob),
        address: row.address,
        phone: row.phone,
        state: row.state,
        zip: row.zip,
        email: row.email,
        gender: row.gender,
        userType: row.userType,
      }));
      const userAccountData = data.map(row=>({
        accountName:row.account_name
      }))
      const policyCategoryData = data.map(row=>({
        categoryName:row.category_name
      }))
      const policyCarrierData = data.map(row=>({
        companyName:row.company_name
      }))

    await Agent.insertMany(agentData);
    const insertedUsers = await User.insertMany(userData);
    await UserAccount.insertMany(userAccountData);
    const insertedCategories = await PolicyCategory.insertMany(policyCategoryData);
    const insertedCarriers = await PolicyCarrier.insertMany(policyCarrierData);

    // Create a map for quick lookup of inserted documents
    const userMap = new Map(insertedUsers.map(user => [user.firstName, user._id]));
    const categoryMap = new Map(insertedCategories.map(category => [category.categoryName, category._id]));
    const carrierMap = new Map(insertedCarriers.map(carrier => [carrier.companyName, carrier._id]));

    // Filter and map data for PolicyInfo collection
    const policyInfoData = data.map(row => ({
      policyNumber: row.policy_number,
      policyStartDate: formatDate(row.policy_start_date),
      policyEndDate: formatDate(row.policy_end_date),
      policyCategoryId: categoryMap.get(row.category_name),
      companyId: carrierMap.get(row.company_name),
      userId: userMap.get(row.firstname),
    }));

    await PolicyInfo.insertMany(policyInfoData);

    parentPort.postMessage('Data uploaded successfully');
  } catch (err) {
    parentPort.postMessage(`Error: ${err.message}`);
  } finally {
    mongoose.disconnect(); // Close connection after operations
  }
}

uploadData();
