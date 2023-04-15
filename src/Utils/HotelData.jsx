import { User } from "../Components/UserData/UserData";
import { HOTELS_URL, REPORTS, TRANSACTION } from "../Config/Config";
import axios  from "axios";
export const AllHotelData = async function(){
  try {
    const res = await axios.get(HOTELS_URL);
    const result = res.data;
    return result;
  } catch (error) {
    const erroMsg = error;
    return erroMsg;
  }
}
export const createNewHotel = async function(payload){
  const user = User();
  const headers = {
    'accessToken': user.id,
  }
  if(payload.id == 'new'){
    payload.id = null;
  }
  
  try {
    const res = await axios.post(HOTELS_URL, payload, {headers});
    const result = res.data;
    return result;
  } catch (error) {
    console.log(error);
    const erroMsg = error;
    return erroMsg;
  }
}

export const getHotel = async function(id){
  const user = User();
  const headers = {
    'accessToken': user.id,
  }
  try {
    const res = await axios.get(HOTELS_URL + id, {headers});
    const result = res.data;
    return result;
  } catch (error) {
    console.log(error);
    const erroMsg = error;
    return erroMsg;
  }
}

export const deleteHotel = async function(id){
  const user = User();
  const headers = {
    'accessToken': user.id,
  }
  try {
    const res = await axios.delete(HOTELS_URL + id, {headers});
    const result = res.data;
    return result;
  } catch (error) {
    console.log(error);
    const erroMsg = error;
    return erroMsg;
  }
}

export const reserveRoom = async function(payload){
  const user = User();
  payload.userId = user.id;
  const headers = {
    'accessToken': user.id,
  }
  try {
    const res = await axios.post(TRANSACTION + "/book", payload,{headers});
    const result = res.data;
    return result;
  } catch (error) {
    const erroMsg = error;
    return erroMsg;
  }
}
export const getAllTransactions = async function(){
  const user = User();
  try {
    const res = await axios.get(TRANSACTION + "/" + user.id);
    const result = res.data;
    return result;
  } catch (error) {
    const erroMsg = error;
    return erroMsg;
  }
}
export const getReportsForTheDay = async function(payload){
  const user = User();
  payload.userId = user.id;
  console.log(payload);
  try {
    const res = await axios.post(REPORTS, payload);
    let result = res.data;
    result = result.result.filter((el)=>{
      let startDate = el.createdAt.substring(0,10);
      return startDate >= payload.startDate && startDate <= payload.endDate;
    })
    console.log(result,res.data, payload.startDate);
    return result;
  } catch (error) {
    const erroMsg = error;
    return erroMsg;
  }
}

export const DUMMY_HOTEL = {
  name: null,
  city: null,
  availableRooms: null,
  price: null,
  bedSize: null,
  discount: null,
  breakFast: null,
  availability: true,
  cancelationPolicy: null,
  cancellation: null,
  distance: null,
  id: 'new',
  rating: null,
  reviews: null,
  url: null,
  view: null,
  imageList: [],
}


export const HotelData = [
    {
        name: "The Marriott, Oxford",
        city: "Oxford",
        url: "https://imageList.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        reviews: 1991,
        rating: "4",
        breakFast: "Included",
        facilities:[],
        rooms:{
          availability: true,
          status:"NOT_AVAILABLE",
          availableRooms: 3,
          price: 1030,
          discount: 12,
          beds:2
        },
        distance: 2,
        id: 1,
        view: "Very Good",
        imageList: [
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341166.jpg?k=ed7adc6e0e083ce249876e1f472eb91a8c63068fb0932b0a6965e7b26396f1e9&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341182.jpg?k=0575291c1a36734bfe2a0ebf319ecda16f539cf62443deec3d36c85f7f2cbb8e&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341183.jpg?k=7f56daaf237d5368e86ff068ce6bb1384442c4990f3c3595233875ac44adf68b&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341186.jpg?k=bb32a99ff29e9cad711bf18b6416854b74e92c5bd5afb5b590249ef4c84ea8d8&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341187.jpg?k=e8ee8cb07d043b613c5cbdf6d5765e44fa0c8c8d0ef72312cba66972b2542f7c&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341193.jpg?k=256ba6c25c0394aad8960ed0a38f249ef228eb2dd331f585f979fdf2aadd6d0f&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341195.jpg?k=3eead8dfbefc19f05a034e784c54f86dc86387603bc07e0b826723dbfb1c1af6&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341201.jpg?k=cd541ad884c9902f0e21be07c976c4722aac582a9d63db021991c91cfbd98f62&o=&hp=1",
          "https://cf.bstatic.com/xdata/imageList/hotel/max1024x768/315341206.jpg?k=4a719e04af41ac9fb545aabcd043482ccf7a10498d5fab59b8d04de0315bf545&o=&hp=1",
        ]

    }
]



