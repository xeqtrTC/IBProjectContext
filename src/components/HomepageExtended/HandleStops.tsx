import {FC, useMemo, useEffect } from "react"
import ClassicButton from "../Buttons/ClassicButton"
import { GrClear } from 'react-icons/gr'
import { AiOutlineClose } from 'react-icons/ai'
import useGeoGode from "../../hooks/useGeoCode"
import useContextHook from "../../hooks/useContextHook"
import Input from "../Input/Input"

interface uniqueCoordinatesProps {
    lat: number,
    lng: number
}

const HandleStops: FC = () => {
    const { handleGeoCodeStops } = useGeoGode();
    const { 
        stateInfo,
        setCalculatedResponses,
        setStateInfo,
        calculatedResponses,
        handleInputChange
    } = useContextHook()
    const handleRemovingOneStop = (index: number) => {
        const filterStops = stateInfo.stops.filter((item, i) => i !== index)
        const filterCalculatedResponses = calculatedResponses.stops.filter((item, i) => i !== index)
        setCalculatedResponses((prev) => ({...prev, stops: filterCalculatedResponses}))
        setStateInfo((prev) => ({...prev, stops: filterStops}))
    }

    const handleStopInputs = (type: string) => {
        if (type === 'remove') {
            setStateInfo((prev) => ({...prev, stops: []}))
            setCalculatedResponses((prev) => ({...prev, stops: []}))
        } else if (type === 'add') {
            setStateInfo((prev) => ({...prev, stops: [...prev.stops, '']}))
        }
    }

    // Run this only when stateInfo.stops changes
    const memoizedHandleGeoStops = useMemo(() => {
        return async () => {
          try {
            const stopsLatLng = await handleGeoCodeStops(stateInfo.stops);
      
            // Create a set to store unique coordinates
            const uniqueCoordinates: Set<uniqueCoordinatesProps> = new Set();
      
            for (const stops of stopsLatLng) {
              const coordinates = {
                lat: stops.destinationLat,
                lng: stops.destinationLng,
              };
      
              // Transforms uniqueCoordinates into and array and checks if coordinates are already in the set
              const isDuplicate = Array.from(uniqueCoordinates).some(
                (coord: uniqueCoordinatesProps) =>
                  coord.lat === coordinates.lat && coord.lng === coordinates.lng
              );
      
              if (!isDuplicate) {
                uniqueCoordinates.add(coordinates);
              }
            }
      
            // Convert the Set back to an array
            const uniqueCoordinatesArray = Array.from(uniqueCoordinates);
            setCalculatedResponses((prev) => ({
              ...prev,
              stops: uniqueCoordinatesArray,
            }));
          } catch (error: unknown) {
            console.log(error);
          }
        };
      }, [stateInfo.stops]);

    const fetchData = async () => {
        await memoizedHandleGeoStops();
    };
    useEffect(() => {
        fetchData();
    }, [memoizedHandleGeoStops]);

    let stopsContent = null;
    const areInputsFilled = [
        calculatedResponses.destination.lat, 
        calculatedResponses.destination.lng,
        calculatedResponses.origin.lat,
        calculatedResponses.origin.lng
    ].every(Boolean);
    
    if (areInputsFilled) {
        stopsContent = (
            <div className='space-y-3'>
                <div className="flex items-center justify-end space-x-2">
                    <ClassicButton
                    type='button'
                    name='Add stops'
                    functionToCall={() => handleStopInputs('add')}
                    flexEnd={false}
                    />
                    <div className="border p-2 rounded-md">
                        <GrClear 
                        onClick={() => handleStopInputs('remove')}
                        className='w-5 h-5 cursor-pointer hover:scale-105 transitionOverlay' 
                        />
                    </div>
                </div>
                <div className='space-y-3 overflow-hidden'>
                    {
                        stateInfo.stops?.map((item, index) => {
                            return (
                                <div className="flex items-center space-x-5" key={index}>
                                    <div className="flex-grow">
                                        <Input
                                        key={index}
                                        type='text'
                                        value={item}
                                        name='stops'
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder='Address of your stop'
                                        inputClass='border outline-none py-1.5 px-3 rounded-md'
                                        />
                                    </div>
                                    <div className="border p-2 rounded-md">
                                        <AiOutlineClose 
                                        onClick={() => handleRemovingOneStop(index)}
                                        className='w-5 h-5 cursor-pointer hover:scale-105 transitionOverlay' 
                                    />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    return stopsContent
}

export default HandleStops