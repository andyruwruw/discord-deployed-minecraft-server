interface MessageComponents {
  mention: string;
  key: string;
  args: string[];
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
  
}

interface Shop {
  guildId: String;
  name: String,
  userIds: Array<String>;
  x: String;
  y: String;
  z: String;
  description: String;
  items: Array<StoreItem>;
}

