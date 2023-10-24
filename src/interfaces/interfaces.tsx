
export interface calculatedResponsesProps {
    origin: {
        lat: number,
        lng: number
    },
    destination: {
        lat: number,
        lng: number
    }
    stops: {
        lat: number,
        lng: number
    }[]
}

export interface stateInfoProps {
    origin: string,
    destination: string,
    stops: string[]
    
}

export interface errorsProps {
    originError: string,
    destinationError: string
}

export interface uniqueCoordinatesProps {
    lat: number,
    lng: number
}

export interface validStopsProps {
    destinationLat: number,
    destinationLng: number
}