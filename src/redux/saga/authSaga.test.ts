import assert from 'assert';
import { registerUserRequest } from '../action-creators/authActions';
import { registrationSaga } from './authSaga';

const action = registerUserRequest({});
const gen = registrationSaga({ type: '', action });
assert.deepEqual(gen.next().value);
