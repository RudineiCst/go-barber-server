import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

import Authconfig from '../config/auth'

interface Payload {
  iat:number,
  exp:number,
  sub:string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next:NextFunction){

  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new Error('JWT token is missing')
  }

  const [,token]= authHeader.split(' ');

  try{
    const decoded = verify(token, Authconfig.jwt.secret)

    const { sub }= decoded as Payload;

    request.user={
      id : sub
    }

    return next()
  }catch{
    throw new Error('JWT token invalid')
  }

}
