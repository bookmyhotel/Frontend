import { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import { ProgressBar } from 'react-loader-spinner';
import { Navbar } from "../Navbar/Navbar";
import FooterBlue from "../Footer/FooterBlue";
import { BookingDetails } from "../SearchData/BookingDetails";
import { getAllTransactions, getReportsForTheDay } from "../../Utils/HotelData";


export const Reports = () => {
    const [loader, setLoader] = useState(false);
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toJSON().substring(0, 10));
    const [endDate, setEndDate] = useState(new Date().toJSON().substring(0, 10));
    const [totalAmount, setTotalAmount] = useState(0);

    async function getReports(date) {
        setLoader(true);
        let res = await getReportsForTheDay({ startDate, endDate });
        setReports(res);
        let total = 0;
        res.forEach((el) => {
            total += Number(el.roomDetails.price);
        })
        setTotalAmount(total);
        setLoader(false);
        console.log(res);
    }

    function hadleStartDateChange(e) {
        setStartDate(e.target.value);
        if(endDate < startDate){
            setEndDate(e.target.value);
        }
    }
    function hadleEndDateChange(e) {
        setEndDate(e.target.value);
    }
    useEffect(() => {
        getReports(new Date().toJSON().substring(0, 10));
    }, [])


    return <>
        <div>
            <Navbar />
        </div>
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
        <div className={styles.search}>
            <div>
                <div>
                    From date:- <input type="date" id="startDate" value={startDate} onChange={hadleStartDateChange} />
                </div>
                <div>
                    To date:- <input type="date" min={startDate} id="endDate" value={endDate} onChange={hadleEndDateChange} />
                </div>
            </div>
            <div className={styles.button}>
                <div style={{marginLeft:'50px'}}>
                   <button onClick={() => getReports(startDate)}>Search</button>
                </div>
            </div>
            <div>
                <div className={styles.total}>
                    Total transaction for the day is - <b> £ {totalAmount}</b>
                </div>
            </div>
        </div>
        {
            (!reports || reports.length <= 0) && <div style={{ textAlign: "center", margin: "10px" }}>No Data for {startDate} to {endDate}</div>
        }
        <div style={{ maxWidth: "80%", margin: "auto", marginTop: "10px" }}>
            {
                reports && reports.map((el) => {
                    let checkinDate = el.startDate.substring(0, 16);
                    let checkOutDate = el.endDate.substring(0, 16);
                    return <BookingDetails
                        checkinDate={checkinDate} checkoutDate={checkOutDate}
                        hotelName={el.hotelDetails.name} hotelImage={el.hotelDetails.url}
                        hotelCity={el.hotelDetails.city}
                        price={el.roomDetails.price} />
                })
            }
        </div>
        <FooterBlue />

    </>
}