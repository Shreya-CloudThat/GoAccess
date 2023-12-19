import React from 'react'
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_oz1cpv5Lu',
  ClientId: '76n43eh7qsu9ptkm2u2ov7v4bt',
};

export default new CognitoUserPool(poolData)
