import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../../CustomAlerts'
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { Link } from 'react-router-dom';
const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
    businessId: 0,
    businessName: '',
    businessTypeId: '',
    business: '',
    contactName: '',
    landline: '',
    mobileNo: '',
    email: '',
    address: '',
    googleMapURL: '',
    latitude: '',
    longitude: '',
    location: '',
    zipCode: '',
    city: '',
    country: '',
    totalRatings: 0,
    rating: 0,
    status: "true",
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    businessurl: '',
    password: '',
    about: '',
    currency: '',
    imageSrc: defaultProductImage,
    imageFile: null,
    imageName: '',
}
export default function AddBusiness(props) {
    const [businessTypeList, setBusinessTypeList] = useState([])
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
             reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultProductImage
            })
        }
    }
    const validate = () => {
        let temp = {}
        temp.businessName = values.businessName === "" ? false : true;
        temp.contactName = values.contactName === "" ? false : true;
        temp.email = values.email === "" ? false : true;
        temp.mobileNo = values.mobileNo === "" ? false : true;
        temp.status = values.status === "0" ? false : true;
        temp.businessTypeId = values.businessTypeId === "0" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            formData.append('businessId', values.businessId)
            formData.append('businessName', values.businessName)
            formData.append('businessTypeId', values.businessTypeId)
            formData.append('business', values.business)
            formData.append('businessurl', values.businessurl)
            formData.append('contactName', values.contactName)
            formData.append('landline', values.landline)
            formData.append('mobileNo', values.mobileNo)
            formData.append('email', values.email)
            formData.append('address', values.address)
            formData.append('googleMapURL', values.googleMapURL)
            formData.append('latitude', values.latitude)
            formData.append('longitude', values.longitude)
            formData.append('location', values.location)
            formData.append('zipCode', values.zipCode)
            formData.append('city', values.city)
            formData.append('country', values.country)
            formData.append('totalRatings', values.totalRatings)
            formData.append('rating', values.rating)
            formData.append('createdDate', values.createdDate)
            formData.append('updatedDate', values.updatedDate)
            formData.append('status', values.status)
            formData.append('password', values.password)
            formData.append('businessurl', values.businessurl)
            formData.append('about', values.about)
            formData.append('currency', values.currency)
            formData.append("imageName", values.imageName)
            formData.append('imageFile', values.imageFile)
            console.log(values)
            addOrEdit(formData, resetForm)
        }
    }
    const applicationAPI = (url = "https://munnyapi.azurewebsites.net/api/business/") => {
        return {
            fetchBusinessType: () => axios.get("https://munnyapi.azurewebsites.net/api/businesstype/Get"),
            create: newRecord => axios.post(url + "insert", newRecord)
        }
    }
    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('businessId') === "0") {
            applicationAPI().create(formData)
                .then(res => {
                    handleSuccess("New Business Added");
                    resetForm();
                })
        }
    }
    function refreshBusinessType() {
        applicationAPI().fetchBusinessType()
            .then(res => setBusinessTypeList(res.data))
            .catch(err => console.log(err))
    }
    const resetForm = () => {
        setValues(initialFieldValues);
        document.getElementById('image-uploader').value = null;
    }
    useEffect(() => {
        refreshBusinessType();
    }, [])
    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' form-control-danger' : '')
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                <span className="text-secondary"> Dashboard <i className="fa fa-angle-right" /> Business List </span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                    
                        {/*Product Listing*/}
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Add New Business</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <Link to={"/businesslist"} className="btn btn-round btn-theme"><i className="fa fa-list" /> Business List</Link>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                              
                                <div className="row mt-3">
                                    <div className="col-sm-12">
                                        <div className="mt-4 mb-3 p-3 button-container ">
                                            <h6 className="mb-3">Business Details</h6>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4 col-12">
                                                    <select name="businessTypeId" type="text" value={values.businessTypeId} onChange={handleInputChange} className="form-control">
                                                        <option value="0">Please Select</option>
                                                        {businessTypeList.map(bus =>
                                                            <option value={bus.businessTypeId}>{bus.business}</option>
                                                        )}
                                                    </select>
                                                    <label htmlFor="business">Business Type</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('businessName')} name="businessName" type="text" value={values.businessName} onChange={handleInputChange} />
                                                    <label htmlFor="businessName">Business Name</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('contactName')} name="contactName" type="text" value={values.contactName} onChange={handleInputChange} />
                                                    <label htmlFor="contactName">Contact Name</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('email')} name="email" type="text" value={values.email} onChange={handleInputChange} />
                                                    <label htmlFor="email">Email</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('landline')} name="landline" type="text" value={values.landline} onChange={handleInputChange} />
                                                    <label htmlFor="landline">Landline</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('mobileNo')} name="mobileNo" type="text" value={values.mobileNo} onChange={handleInputChange} />
                                                    <label htmlFor="mobileNo">Mobile</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('location')} name="location" type="text" value={values.location} onChange={handleInputChange} />
                                                    <label htmlFor="location">Location/Area Name</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('city')} name="city" type="text" value={values.city} onChange={handleInputChange} />
                                                    <label htmlFor="city">City</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('country')} name="country" type="text" value={values.country} onChange={handleInputChange} />
                                                    <label htmlFor="country">Country</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('zipCode')} name="zipCode" type="text" value={values.zipCode} onChange={handleInputChange} />
                                                    <label htmlFor="zipCode">ZipCode</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('latitude')} name="latitude" type="text" value={values.latitude} onChange={handleInputChange} />
                                                    <label htmlFor="latitude">Latitude</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('longitude')} name="longitude" type="text" value={values.longitude} onChange={handleInputChange} />
                                                    <label htmlFor="longitude">Longitude</label>
                                                </div>
                                            </div>

                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('password')} name="password" type="text" value={values.password} onChange={handleInputChange} />
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('currency')} name="currency" type="text" value={values.currency} onChange={handleInputChange} />
                                                    <label htmlFor="currency">Currency</label>
                                                </div>
                                                <div className="col-sm-4 col-12" >
                                                    <select value={values.status} onChange={handleInputChange} className="form-control" name="status">
                                                        <option value="true">active</option>
                                                        <option value="false">inactive</option>
                                                    </select>
                                                    <label htmlFor="status">Status</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('rating')} name="rating" type="text" value={values.rating} onChange={handleInputChange} />
                                                    <label htmlFor="rating">Rating</label>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <input className={"form-control" + applyErrorClass('totalRatings')} name="totalRatings" type="text" value={values.totalRatings} onChange={handleInputChange} />
                                                    <label htmlFor="totalRatings">TotalRatings</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input className={"form-control" + applyErrorClass('about')} name="about" type="text" value={values.about} onChange={handleInputChange} />
                                                    <label htmlFor="about">About</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                {/* <textarea className={"form-control" + applyErrorClass('address')} rows="3" width="100%"  type="text" value={values.address} onChange={handleInputChange} ></textarea> */}
                                                 <input className={"form-control" + applyErrorClass('address')} name="address" type="text" value={values.address} onChange={handleInputChange} /> 
                                                    <label htmlFor="address">Address</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input className={"form-control" + applyErrorClass('googleMapURL')} name="googleMapURL" type="text" value={values.googleMapURL} onChange={handleInputChange} />
                                                    <label htmlFor="googleMapURL">GoogleMap Location URL</label>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <div class="col-md-3">
                                                    <label>Select Business Image</label>
                                                    <img src={values.imageSrc} width="130px" height="130px" />
                                                    <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
                                                </div>
                                            </div>

                                            <div className="form-group row floating-label">
                                                <div className="col-sm-4">
                                                    <button type="submit" className="btn btn-primary mr-3">Submit</button>
                                                    <button type="button" className="btn btn-danger" onClick={resetForm}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div></div></div>
            <Footer></Footer>
        </div>
    )
}