import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const {
  EC2_INSTANCE_ID,
} = process.env;
const ec2 = new aws.EC2();

/**
 * Turns off our EC2 instance.
 * 
 * @returns {object} Response from instance stopping
 */
 exports.handler = async (event: any) => {
  try {
    const instances = await ec2.describeInstances({
      InstanceIds: [ EC2_INSTANCE_ID ],
    }).promise();

    const instance = instances.Reservations[0].Instances[0];

    if (instance.State.Name !== 'stopped') {
      let launchTime = new Date(instance.LaunchTime);
      let today = new Date();

      const response = await ec2.stopInstances({
        InstanceIds: [ EC2_INSTANCE_ID ],
      }).promise();

      console.log(`EC2 instance ${EC2_INSTANCE_ID} stopped successfully.`);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ...response,
          runTime: today.getTime() - launchTime.getTime(),
        }),
      };
    }

    console.log(`EC2 instance ${EC2_INSTANCE_ID} is already stopped.`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Instance is already stopped.',
      }),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};