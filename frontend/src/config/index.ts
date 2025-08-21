
const REACT_ENV = process.env.REACT_APP_ENV;

const ConfigEnv = require(`../config/${REACT_ENV}.json`); 

export default ConfigEnv;