interface TrafficItem {
  _id: string;
  visitorId?: string;
  Ip: string; //currentIp
  isAds: boolean; //ads check
  isBot: boolean; //bot check
  ref: string; // refferer
  browser?: string;
  device: string;
  times: number; //times traffic
  historyIp?: string[];
  historyTimestamps?: string[]; // array of timestamps user visit
  historyRef?: string[];
  historyLocation?: string[]; // array of location user visit
  updatedAt: string;
  createdAt?: string;
}
export type { TrafficItem };
