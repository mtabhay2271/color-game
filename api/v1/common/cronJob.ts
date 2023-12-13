import { CronJob } from 'cron';
import Color from '../models/color';
import Join from '../models/color.joined';
import Lottery from '../models/lottery';
import LotteryJoin from '../models/lottery.joined';
import Txn from '../models/txn';
import CornConst from './constants/cornjob.constant';

class dailyFunction {
  daily = new CronJob(CornConst.daily, async () => {
    try {
      let promiseArray = [];
      promiseArray.push(Color.deleteMany({}));
      promiseArray.push(Join.deleteMany({}));
      promiseArray.push(Lottery.deleteMany({}));
      promiseArray.push(LotteryJoin.deleteMany({}));
      let data = await Promise.all(promiseArray)
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  });

  monthly = new CronJob(CornConst.monthly, async () => {
    try {
      let data: any = await Txn.deleteMany({ widhrawal: true })
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

export default new dailyFunction();

