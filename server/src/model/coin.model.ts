import { Document, Schema, model, InferSchemaType } from "mongoose";



const coinSchema = new Schema(
  {
    code: { type: String, required: true },
    rate: { type: Number, required: true },
    volume: { type: Number, required: true },
    cap: { type: Number, required: true },
    delta: {
      hour: { type: Number, required: true },
      day: { type: Number, required: true },
      week: { type: Number, required: true },
      month: { type: Number, required: true },
      quarter: { type: Number, required: true },
      year: { type: Number, required: true },
    },
  },
  { timestamps: true }
);
type CoinType = InferSchemaType<typeof coinSchema>;
const CoinModel = model<CoinType>("Coin", coinSchema);

export { CoinModel, CoinType };
