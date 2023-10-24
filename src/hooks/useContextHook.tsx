import { useContext } from "react";
import { contextType } from "../context/Context";
import ContextStateProvider from '../context/Context'

const useContextHook = (): contextType => {
    return useContext(ContextStateProvider)
}

export default useContextHook;