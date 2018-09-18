import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import actions from "../actions";
import { ServiceCatalogAction } from "../actions/catalog";

import { ClassList } from "../components/ClassList";
import { IStoreState } from "../shared/types";

interface IRouteProps {
  match: {
    params: {
      brokerName: string;
      className: string;
    };
  };
}

function mapStateToProps({ catalog }: IStoreState, props: IRouteProps) {
  const { classes, errors } = catalog;

  return {
    classes,
    error: errors.fetch,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, ServiceCatalogAction>) {
  return {
    getClasses: async () => {
      const classes = await dispatch(actions.catalog.getClasses());
      return classes;
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);
