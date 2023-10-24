import { ChangeEvent, createContext, ReactElement, useState } from 'react'
import { calculatedResponsesProps, stateInfoProps } from '../interfaces/interfaces'


const HomeContext = () => {
    const [calculatedResponses, setCalculatedResponses] = useState<calculatedResponsesProps>({
        origin: {
            lat: 0,
            lng: 0
        },
        destination: {
            lat: 0,
            lng: 0
        },
        stops: []
    })
    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>()
    const [stateInfo, setStateInfo] = useState<stateInfoProps>({
        origin: '',
        destination: '',
        stops: []
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
        const { value, name } = e.currentTarget;
        setStateInfo((prev) => {
            if (name === 'stops') {
                const updatedStops = [...prev.stops]
                updatedStops[index!] = value
                return { ...prev, stops: updatedStops }
            } else {
                return { ...prev, [name]: value }
            }
        })
    }
    
    return {
        calculatedResponses,
        setCalculatedResponses,
        directionResponse,
        setDirectionResponse,
        handleInputChange,
        setStateInfo,
        stateInfo
    }
}

export type contextType = ReturnType<typeof HomeContext>

export const initState: contextType = {
    calculatedResponses: {
        origin: {
            lat: 0,
            lng: 0
        },
        destination: {
            lat: 0,
            lng: 0
        },
        stops: []
    },
    setCalculatedResponses: () => {},
    directionResponse: undefined,
    setDirectionResponse: () => {},
    handleInputChange: () => {},
    setStateInfo: () => {},
    stateInfo: {
        origin: '',
        destination: '',
        stops: []
    }
}
const ContextStateAPI = createContext<contextType>(initState);
type childrenType = { children?: ReactElement };

export const ContextStateProvider = ({ children }: childrenType ): ReactElement => {
    const contextV = HomeContext();
    return (
        <ContextStateAPI.Provider value={contextV}>
            {children}
        </ContextStateAPI.Provider>
    )
}

export default ContextStateAPI