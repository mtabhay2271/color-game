import { CronJob } from "cron"
import Users from "../models/users"
import CornConst from './constants/cornjob.constant';

import Color from "../models/color";

class dailyFunction {
   daily = new CronJob(CornConst.daily, async () => {
      try {
          let minDate = new Date()
          minDate.setDate(minDate.getDate() - 10)
          let data:any = await Color.deleteMany({
            createdAt:{
                      $lt: minDate,
                      // $gt: new Date("2023-04-28")
          }})
          
          console.log(data,"list")
        } catch (error) {
          console.log(error);
        }
  });

} 

export default new dailyFunction();

