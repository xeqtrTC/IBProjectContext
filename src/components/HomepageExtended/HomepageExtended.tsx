import { FC, Fragment } from 'react'
import HandleForm from './HandleForm'
import HandleStops from './HandleStops'

export interface errorsProps {
    originError: string,
    destinationError: string
}
export interface stateInfoProps {
    origin: string,
    destination: string,
    stops: string[]
    
}
const HandlepageExtended: FC = () => {
    return (        
        <Fragment>
            <HandleForm />
            <HandleStops />
        </Fragment>
    )
}

export default HandlepageExtended