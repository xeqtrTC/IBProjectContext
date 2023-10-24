import { FC,useState } from "react"
import useGeoGode from "../../hooks/useGeoCode"
import ClassicButton from "../Buttons/ClassicButton"
import useContextHook from "../../hooks/useContextHook"
import Input from "../Input/Input"
import { errorsProps } from "./HomepageExtended"


const HandleForm: FC = () => {
    const { handleGeoCodeSingle } = useGeoGode();
    const { 
        stateInfo,
        setCalculatedResponses,
        handleInputChange
    } = useContextHook()
    const [errorsToShow, setErrorsToShow] = useState<errorsProps>({
        originError: '',
        destinationError: ''
    })

    const areInputsFilled = [stateInfo.destination, stateInfo.origin].every(Boolean);

    const handleGeoLocation = async () => {
      try {
          const responseOrigin = await handleGeoCodeSingle(stateInfo.origin)
          if (responseOrigin.data.status === 'ZERO_RESULTS') {
              setErrorsToShow((prev) => ({...prev, originError: 'Unable to find origin'}))
              return;
          }
          const responseDestination = await handleGeoCodeSingle(stateInfo.destination)
          if (responseDestination.data.status === 'ZERO_RESULTS') {
              setErrorsToShow((prev) => ({...prev, originError: ''}))
              setErrorsToShow((prev) => ({...prev, destinationError: 'Unable to find destination'}))
              return;
          }
          setErrorsToShow({
            originError: '',
            destinationError: ''
          })
        // Extract latitude and longitude from the geocoded responses
        const { lng: destinationLng, lat: destinationLat } = responseDestination.data.results[0].geometry.location;
        const { lat: originLat, lng: originLng } = responseOrigin.data.results[0].geometry.location;
    
        setCalculatedResponses((prev) => ({
          ...prev,
          origin: {
            lat: originLat,
            lng: originLng
          },
          destination: {
            lat: destinationLat,
            lng: destinationLng
          }
        }));
    
        console.log("Geocoding successful", responseOrigin, responseDestination);
      } catch (error) {
        console.error("Error during geocoding", error);
      }
    };
      
    return (
        <div className='flex flex-col md:flex-row gap-5 justify-center  w-full md:w-auto'>
            <Input
                type='text'
                name='origin'
                placeholder='Origin...'
                value={stateInfo.origin}
                onChange={handleInputChange}
                inputClass='border outline-none py-1.5 px-3 rounded-md'
                error={errorsToShow.originError}
            />
            <Input 
                type='text'
                name='destination'
                placeholder='Destination...'
                value={stateInfo.destination}
                onChange={handleInputChange}
                inputClass='border outline-none py-1.5 px-3 rounded-md'
                error={errorsToShow.destinationError}
            />
            <ClassicButton 
            name="Submit"
            functionToCall={handleGeoLocation}
            type="button"
            flexEnd={false}
            disabled={!areInputsFilled}
            />
        </div>
    )
}

export default HandleForm