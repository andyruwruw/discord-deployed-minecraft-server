import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const {
  EC2_INSTANCE_ID,
} = process.env;
const ec2 = new aws.EC2();

/**
 * Spins up our EC2 instance.
 * 
 * @returns {object} Response from instance starting
 */
exports.handler = async (event: any) => {
  try {
    const response = await ec2.startInstances({
      InstanceIds: [ EC2_INSTANCE_ID ],
    }).promise();

    console.log(`EC2 instance ${EC2_INSTANCE_ID} started successfully.`);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};