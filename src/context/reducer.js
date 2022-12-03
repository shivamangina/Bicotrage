/* eslint-disable no-case-declarations */
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "ADD_WEB3_PROVIDER":
      const { provider, signer, accounts, Contract } = action.payload;
      return {
        ...state,
        provider,
        signer,
        accounts,
        Contract,
      };
    default:
      return state;
  }
};
