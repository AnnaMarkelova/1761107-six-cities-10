import { NameSpace } from '../../../../consts/api-route';
import { City } from '../../../../types/city';
import { State } from '../../../../types/state';

export const getCity = (state: State): City => state[NameSpace.DataCity].city;
