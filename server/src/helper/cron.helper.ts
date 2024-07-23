import axios from "axios";
import cron from "node-cron";
import { CoinModel } from "../model/coin.model";
import { CronLogModel } from "../model/cron.model";

const apiUrl = "https://api.livecoinwatch.com/coins/list";
const apiKey = "4cfe7b4e-8f8b-4aba-a35c-c4cbf78eede1";
let task: cron.ScheduledTask;
const fetchDataAndStore = (cronName: string) => async () => {
  const cronLog = new CronLogModel({
    cronName,
    startTime: new Date().toLocaleTimeString(undefined, { hour12: false }),
    status: 0,
  });
  await cronLog.save();

  try {
    await CronLogModel.findByIdAndUpdate(cronLog.id, {
      $set: { status: 1, resp_data: "started" },
    });

    const response = await axios.post(
      apiUrl,
      {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 20,
        meta: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const data = response.data;

    await CoinModel.insertMany(data);

    await CronLogModel.findByIdAndUpdate(cronLog.id, {
      endTime: new Date().toLocaleTimeString(undefined, { hour12: false }),
      status: 2,
      resp_data: "completed",
    });
  } catch (error) {
    console.error("Error:", error);

    await CronLogModel.findByIdAndUpdate(cronLog.id, {
      endTime: new Date().toLocaleTimeString(undefined, { hour12: false }),
      status: -1,
      resp_data: error,
    });
    task.stop();
  }
};

const cronrun = async () => {
  task = cron.schedule(`*/5 * * * * *`, fetchDataAndStore("FetchDataCron"));
  task.start();
};

export default cronrun;
