
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import styles from "./Availability.module.css"

export const Facilities = ({ hotelData }) => {
    const [hotel, setHotel] = useState(hotelData);
    const [facilities, setFacilities] = useState([]);

    function hadleFacilities(event, status) {
        let f = [...facilities];
        let name = event.target.name;
        let newHotel = { ...hotel };
        newHotel[name] = status;
        setHotel(newHotel);
        if (status && !f.includes(name)) {
            f.push(name);
        } else {
            let newF = [];
            for (let i = 0; i < f.length; i++) {
                let fl = f[i];
                if (fl != name) {
                    newF.push(fl[i]);
                }
            }
            f = [...newF];
        }
        setFacilities(f);

    }
    useEffect(()=>{
     hotel.SWIMMING_POOL = true;
     hotel.WIFI = true;
     hotel.BREAKFAST = true;
     hotel.SPA = true;
     hotel.BAR = true;
     hotel.CAR = true;
     hotel.MEETINGROOM = true;
     hotel.TAXI = true;
     hotel.BAR = true;
     hotel.BREAKFAST = true;
    },[])
    return (
        <>
            <div className={styles.EditHotelDetails} id="hotelDetailsForm">
                <div> 
                    <h3 className={styles.header}>Facilities</h3>
                    <div className={styles.Form}>
                        <div className={styles.facilities}>
                            <h5>Swimming Pool?</h5>
                            <div className={styles.inputGroup}>
                                <input id="SWIMMING_POOL1" name="SWIMMING_POOL" type="radio" checked={hotel.SWIMMING_POOL} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="SWIMMING_POOL1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="SWIMMING_POOL2" name="SWIMMING_POOL" type="radio" checked={!hotel.SWIMMING_POOL} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="SWIMMING_POOL2">No</label>
                            </div>
                        </div>
                        <div>

                            <h5>WIFI?</h5>
                            <div className={styles.inputGroup}>
                                <input id="WIFI1" name="WIFI" type="radio" checked={hotel.WIFI} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="WIFI1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="WIFI2" name="WIFI" type="radio" checked={!hotel.WIFI} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="WIFI2">No</label>
                            </div>
                        </div>
                        <div>
                            <h5>Break fast?</h5>
                            <div className={styles.inputGroup}>
                                <input id="BREAKFAST1" name="BREAKFAST" type="radio" checked={hotel.BREAKFAST} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="BREAKFAST1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="BREAKFAST2" name="BREAKFAST" type="radio" checked={!hotel.BREAKFAST} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="BREAKFAST2">No</label>
                            </div>
                        </div>
                        <div>
                            <h5>Spa?</h5>
                            <div className={styles.inputGroup}>
                                <input id="SPA1" name="SPA" type="radio" checked={hotel.SPA} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="SPA1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="SPA2" name="SPA" type="radio" checked={!hotel.SPA} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="SPA2">No</label>
                            </div>
                        </div>
                        <div>
                            <h5>Bar?</h5>
                            <div className={styles.inputGroup}>
                                <input id="BAR1" name="BAR" type="radio" checked={hotel.BAR} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="BAR1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="BAR2" name="BAR" type="radio" checked={!hotel.BAR} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="BAR2">No</label>
                            </div>
                        </div>
                        <div>
                            <h5>Car?</h5>
                            <div className={styles.inputGroup}>
                                <input id="CAR1" name="CAR" type="radio" checked={hotel.CAR} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="CAR1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="CAR2" name="CAR" type="radio" checked={!hotel.CAR} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="CAR2">No</label>
                            </div>
                        </div>
                        <div>
                            <h5>Meeting room?</h5>
                            <div className={styles.inputGroup}>
                                <input id="MEETINGROOM1" name="MEETINGROOM" type="radio" checked={hotel.MEETINGROOM} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="MEETINGROOM1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="MEETINGROOM2" name="MEETINGROOM" type="radio" checked={!hotel.MEETINGROOM} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="MEETINGROOM2">No</label>
                            </div>
                        </div>
                        <div>
                            <h5>Taxi?</h5>
                            <div className={styles.inputGroup}>
                                <input id="TAXI1" name="TAXI" type="radio" checked={hotel.TAXI} onChange={(e) => hadleFacilities(e, true)} />
                                <label htmlFor="TAXI1">Yes</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input id="TAXI2" name="TAXI" type="radio" checked={!hotel.TAXI} onChange={(e) => hadleFacilities(e, false)} />
                                <label htmlFor="TAXI2">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}