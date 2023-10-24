import { FC } from 'react'
import ClassicButton from '../../components/Buttons/ClassicButton'
import useContextHook from '../../hooks/useContextHook'
import Map from '../../components/Maps/Map'
import HandlepageExtended from '../../components/HomepageExtended/HomepageExtended'

const Homepage: FC = () => {
    const {
        calculatedResponses,
        setDirectionResponse,
    } = useContextHook()

    const calculateRoute = () => {
        const directionsService = new window.google.maps.DirectionsService();
        const { origin, destination, stops } = calculatedResponses;
        const waypoints = stops.map((stop) => ({
          location: new window.google.maps.LatLng(stop.lat, stop.lng),
          stopover: true,
        }));

        const request = {
            origin: origin!,
            destination: destination!,
            waypoints: waypoints!,
            travelMode: window.google.maps.TravelMode.DRIVING, 
          };
          
          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                setDirectionResponse(result!)
            }
          })
        }
    let buttonContent = null;
    if (calculatedResponses.stops.length > 0) {
        buttonContent = (
            <ClassicButton
                type='button'
                name='Show routes'
                flexEnd={true}
                functionToCall={calculateRoute}
                />
        )
    }
    return (
        <div className='h-full flex flex-col  '>
            <div className='h-[65%]'>
                <Map />
            </div>
            <div className='flex-grow max-h-[40%]'>
                <div className='h-full p-2'>
                    <div className='bg-white border h-full shadow-md scrollbar-none overflow-hidden overflow-y-scroll p-10 rounded-md w-full md:w-auto space-y-2'>
                        <HandlepageExtended />
                       {buttonContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage