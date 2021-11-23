import mcquery from 'mcquery';

const callback = async (error: Error, response: any) => {
  if (error) {
    throw error;
  }

  return response;
}

export const pingServer = async (ip: string, port: number) => {
  try {
    const connection = await mcquery.createConnected(ip, port);

    const callbackPromise = await connection.full_stat(callback);

    return await callbackPromise;
  } catch (error) {
    console.error(error);
  }
}