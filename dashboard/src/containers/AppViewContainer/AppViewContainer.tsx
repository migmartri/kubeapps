import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import actions from "../../actions";
import { AppsAction } from "../../actions/apps";
import AppView from "../../components/AppView";
import { IStoreState } from "../../shared/types";

interface IRouteProps {
  match: {
    params: {
      namespace: string;
      releaseName: string;
    };
  };
}

function mapStateToProps({ apps }: IStoreState, { match: { params } }: IRouteProps) {
  return {
    app: apps.selected,
    deleteError: apps.deleteError,
    error: apps.error,
    namespace: params.namespace,
    releaseName: params.releaseName,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, AppsAction>) {
  return {
    deleteApp: (releaseName: string, ns: string, purge: boolean) =>
      dispatch(actions.apps.deleteApp(releaseName, ns, purge)),
    getApp: (releaseName: string, ns: string) => dispatch(actions.apps.getApp(releaseName, ns)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
