import { request } from "https";

import { NowRequest, NowResponse } from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
  return response.json({ message: 'Hello World'})
}