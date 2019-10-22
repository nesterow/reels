import {createContext} from 'preact'
import Store from '.'

export default createContext(Store.getState())