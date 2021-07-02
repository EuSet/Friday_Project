import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";

export const useCleanUp =  (func: any ) => {
    const dispatch = useDispatch()
    const changeIsSent = useCallback(() => {
        dispatch(func)
    }, [dispatch])

    return useEffect(() => {
        return () => changeIsSent()
    }, [changeIsSent])
}
