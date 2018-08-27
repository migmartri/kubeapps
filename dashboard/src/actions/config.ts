import { Dispatch } from "redux";
import { createAction, getReturnOfExpression } from "typesafe-actions";

import Config, { IConfig } from "../shared/Config";

export const requestConfig = createAction("REQUEST_CONFIG");
export const receiveConfig = createAction("RECEIVE_CONFIG", (config: IConfig) => ({
  config,
  type: "RECEIVE_CONFIG",
}));

const allActions = [requestConfig, receiveConfig].map(getReturnOfExpression);
export type ConfigAction = typeof allActions[number];

export function getConfig() {
  return async (dispatch: Dispatch) => {
    dispatch(requestConfig());
    const config = await Config.getConfig();
    return dispatch(receiveConfig(config));
  };
}
