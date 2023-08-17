import { CronJob } from 'cron';
import Users from "../models/users"
import responseMessages from "../common/response.messages";
import CornConst from './constants/cornjob.constant';

class dailyFunction {
   daily = new CronJob(CornConst.daily, async () => {
      try {
          let data: any = await Users.updateMany({},{$set : {todayEarning : 0, todayLeads: 0,todayRefLead: 0}}).lean();
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
  });

   weekly = new CronJob(CornConst.weekly, async () => {
      try {
          let data: any = await Users.updateMany({},{$set : {thisWeekEarning : 0,thisMonthRefLead:0}}).lean();
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
  });

   monthly = new CronJob(CornConst.monthly, async () => {
      try {
          let data: any = await Users.updateMany({},{$set : {thisMonthEarning : 0}}).lean();
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
  });
} 

export default new dailyFunction();

