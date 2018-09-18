import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import actions from "../actions";
import { ServiceCatalogAction } from "../actions/catalog";
import { ServiceCatalogView } from "../components/Config/ServiceCatalog";
import { IServiceBroker } from "../shared/ServiceCatalog";
import { IStoreState } from "../shared/types";

function mapStateToProps({ catalog }: IStoreState) {
  return {
    brokers: catalog.brokers,
    errors: catalog.errors,
    isInstalled: catalog.isInstalled,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, ServiceCatalogAction>) {
  return {
    checkCatalogInstalled: async () => {
      dispatch(actions.catalog.checkCatalogInstalled());
    },
    getBrokers: () => dispatch(actions.catalog.getBrokers()),
    sync: (broker: IServiceBroker) => dispatch(actions.catalog.sync(broker)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCatalogView);
