
import styled from 'styled-components'
import { useParams } from 'react-router'
import { HotelData, createNewHotel } from '../../Utils/HotelData'
import { useState, useEffect } from 'react'
import styles from "./EditHotelDetails.module.css"
import { HotelRoomsImages } from './HotelRoomsImages'
import { DUMMY_HOTEL } from '../../Utils/HotelData'
import { ProgressBar } from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'

export const EditHotelDetails = ({ hotelData }) => {
    const param = useParams();
    const [hotelImage, setHotelImage] = useState([]);
    const [hotelVisitURL, setHotelVisitURL] = useState([]);
    const [hotel, setHotel] = useState(hotelData);
    const [facilities, setFacilities] = useState([]);
    const [images, setImages] = useState(hotelData?.imageList);
    const [url, setURL] = useState(hotelData?.url);
    const [loader, setLoader] = useState(false);
    const history = useHistory();

    function hadleFacilities(event, status){
     let f = [...facilities];
     let name= event.target.name;
     let newHotel = {...hotel};
     newHotel[name] = status;
     setHotel(newHotel);
     if(status && !f.includes(name)){
         f.push(name);
     }else{
        let newF = [];
        for(let i=0; i< f.length; i++){
            let fl = f[i];
            if(fl != name){
                newF.push(fl[i]);
            }
        }
        f = [...newF];
     }
     setFacilities(f);
     
    }
    const handleHotelDetailsSubmission = async (event) => {
        event.preventDefault();
        let newHotel = { ...hotel };
        newHotel.url = url;
        newHotel.images = images;
        newHotel.imageList = images;
        newHotel.facilities = facilities;
        setLoader(true);
        await createNewHotel(newHotel);
        setLoader(false);
        history.push("/allhotels");

    }
    const handleEdit = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let newHotel = {
            ...hotel
        }
        newHotel[name] = value;
        setHotel(newHotel);
    }
    const updateImages = (imgURL, index, multipleImages, loader) => {
        if(loader){
           return setLoader(true);
        }
        if (multipleImages) {
            let img = [...images];
            img[index] = imgURL;
            setImages(img);
        } else {
            setURL(imgURL);
        }
        setLoader(false);
    }
    useEffect(() => {
        setHotel(hotelData);
        let hotelImage = {
            "data_url": hotelData.url
        }
        let images = [];
        hotel.imageList.forEach((el) => {
            images.push({ "data_url": el })
        })
        setHotelImage([hotelImage]);
        setHotelVisitURL(images);
    }, [])
    return (
        <>
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
            <form className={styles.EditHotelDetails} id="hotelDetailsForm">
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h5>Add hotel image here ..</h5>
                    </div>
                    <HotelRoomsImages multipleImages={false} imageLists={hotelImage} updateImages={updateImages}/>
                </div>
                <div>
                    <div className={styles.Form}>
                        <div className={styles.name}>
                            <div>
                                <label htmlFor="name">Hotel Name</label>
                                <input type="text" id="name" name="name" placeholder="Hotel name.." value={hotel.name} onChange={handleEdit} />
                            </div>
                            <label htmlFor="name">City</label>
                            <input type="text" id="city" name="city" placeholder="Hotel city.." value={hotel.city} onChange={handleEdit} />
                            <label htmlFor="rooms">Total Rooms</label>
                            <input type="number" id="rooms" name="rooms" placeholder="Total rooms.." value={hotel.rooms} onChange={handleEdit} />
                            <label htmlFor="bedSize">Bed Type</label>
                            <select id="bedSize" name="bedSize" value={hotel.bedSize} onChange={handleEdit}>
                                <option value="3 bed">3 bed</option>
                                <option value="2 bed">2 bed</option>
                                <option value="1 bed">1 bed</option>
                            </select>
                            <label htmlFor="price">Charge Per Night in £</label>
                            <input type="text" id="price" name="price" placeholder="Charge per night.." value={hotel.price} onChange={handleEdit} />
                            <label htmlFor="discount">Discount % </label>
                            <input type="text" id="discount" name="discount" placeholder="Discounted charge per night.." value={hotel.discount} 
                            onInput={(e)=> e.target.value > 100 ? e.target.value = 100 : e.target.value}
                            onChange={handleEdit} max={100}/>
                        </div>
                        <h5>Swimming Pool?</h5>
                        <div className={styles.inputGroup}>
                            <input id="SWIMMING_POOL1" name="SWIMMING_POOL" type="radio" checked={hotel.SWIMMING_POOL}  onChange={(e)=>hadleFacilities(e, true)} />
                            <label htmlFor="SWIMMING_POOL1">Yes</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input id="SWIMMING_POOL2" name="SWIMMING_POOL" type="radio" checked={!hotel.SWIMMING_POOL} onChange={(e)=>hadleFacilities(e, false)} />
                            <label htmlFor="SWIMMING_POOL2">No</label>
                        </div>
                        <h5>WIFI?</h5>
                        <div className={styles.inputGroup}>
                            <input id="WIFI1" name="WIFI" type="radio" checked={hotel.WIFI} onChange={(e)=>hadleFacilities(e, true)} />
                            <label htmlFor="WIFI1">Yes</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input id="WIFI2" name="WIFI" type="radio" checked={!hotel.WIFI} onChange={(e)=>hadleFacilities(e, false)} />
                            <label htmlFor="WIFI2">No</label>
                        </div>
                        <h5>CANCELLATION FREE?</h5>
                        <div className={styles.inputGroup}>
                            <input id="CANCELLATION1" name="CANCELLATION" type="radio" checked={hotel.CANCELLATION} onChange={(e)=>hadleFacilities(e, true)} />
                            <label htmlFor="CANCELLATION1">Yes</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input id="CANCELLATION2" name="CANCELLATION" type="radio" checked={!hotel.CANCELLATION} onChange={(e)=>hadleFacilities(e, false)} />
                            <label htmlFor="CANCELLATION2">No</label>
                        </div>
                        <h5>Break fast included?</h5>
                        <div className={styles.inputGroup}>
                            <input id="BREAKFAST1" name="BREAKFAST" type="radio" checked={hotel.BREAKFAST} onChange={(e)=>hadleFacilities(e, true)} />
                            <label htmlFor="BREAKFAST1">Yes</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input id="BREAKFAST2" name="BREAKFAST" type="radio" checked={!hotel.BREAKFAST} onChange={(e)=>hadleFacilities(e, false)} />
                            <label htmlFor="BREAKFAST2">No</label>
                        </div>
                    </div>

                </div>
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h5> Add rooms sample here...</h5>
                    </div>
                    <HotelRoomsImages multipleImages={true} imageLists={hotelVisitURL} updateImages={updateImages} />
                </div>
                <div className={styles.submitButton}>
                    <button onClick={(event) => handleHotelDetailsSubmission(event)} type="button">Submit</button>
                </div>
            </form>
        </>
    )
}