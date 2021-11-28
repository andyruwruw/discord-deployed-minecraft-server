declare module 'mcquery';

interface MessageComponents {
  mention: string;
  key: string;
  args: string[];
}

interface Base {
  serverId: String;
  ec2InstanceId: String;
  owners: Array<String>;
  x: String;
  y: String;
  z: String;
  created: Date,
}

interface Ec2Instance {
  serverId: String;
  ec2InstanceId: String;
}

interface PlayerActivity {
  serverId: String;
  ec2InstanceId: String;
  username: String;
  start: Date;
  end: Date;
}

interface Player {
  serverId: String;
  ec2InstanceId: String;
  username: String;
  totalHours: Number;
  role: String;
}

interface ServerUptime {
  serverId: String;
  ec2InstanceId: String;
  start: Date;
  end: Date;
}

interface StoreItem {
  id: String;
  quantity: String;
  priceId: String;
  priceQuanity: String;
}

interface Shop {
  serverId: String;
  ec2InstanceId: String;
  name: String,
  owners: Array<String>;
  x: String;
  y: String;
  z: String;
  description: String;
  items: Array<StoreItem>;
}

