
import styled from 'styled-components'
import { Navbar } from '../Navbar/Navbar'
import FooterBlue from '../Footer/FooterBlue'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { HotelData, getHotel } from '../../Utils/HotelData'
import { useState, useEffect } from 'react'
import { EditHotelDetails } from './EditHotelDetails'
import styles from "./EditHotelDetails.module.css"
import { ProgressBar } from 'react-loader-spinner'
const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 20px;
`
const Div = styled.div`
margin:0 ;

`
export const EditHotel = () => {
    const [loader, setLoader] = useState(false);
    const [hotel, setHotel] = useState();
    const history = useHistory();
    const dummyHotel = {
        name: null,
        city: null,
        availableRooms: null,
        price: null,
        bedSize: null,
        discount: null,
        SWIMMING_POOL: true,
        WIFI: true,
        BREAKFAST: true,
        availability: true,
        cancelationPolicy: null,
        CANCELLATION: true,
        distance: null,
        id: 'new',
        rating: null,
        reviews: null,
        url: null,
        view: null,
        images:[],
        imageList: []
    }
    const param = useParams()
    async function getHotelData() {
        if (param.id == 'new') {
            setHotel(dummyHotel);
        } else {
            setLoader(true);
            let res = await getHotel(param.id);
            if (res.rooms) {
                res.price = res.rooms[0].price;
                res.discount = res.rooms[0].discount;
                res.rooms = res.rooms.length;
            }
            if (res.facilities) {
                res.SWIMMING_POOL = res.facilities[0].status;
                res.WIFI = res.facilities[1].status;
                res.CANCELLATION = res.facilities[2].status;
                res.BREAKFAST = res.facilities[3].status;
            }
            setHotel(res);
            setLoader(false);
        }
    }
    useEffect(() => {
        getHotelData()
    }, [])
    return (
        <>
            <Navbar />
            {loader && <div className={styles.loader}>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor='#003580'
                    barColor='#006FBF'
                />
            </div>}
            <Wrapper>
                <Div>
                    {hotel && <EditHotelDetails hotelData={param.id == 'new' ? dummyHotel : hotel} />}
                </Div>
            </Wrapper>
            <FooterBlue />

        </>
    )
}