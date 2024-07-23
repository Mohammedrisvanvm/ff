import mongoose, { InferSchemaType, Schema } from "mongoose";

const cronLogSchema = new Schema(
  {
    cronName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    resp_data: { type: String },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

type CronLogType = InferSchemaType<typeof cronLogSchema>;
const CronLogModel = mongoose.model<CronLogType>("CronLog", cronLogSchema);
export { CronLogModel, CronLogType };
