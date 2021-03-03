import React from "react";
import axios from "axios";
import M from "materialize-css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Sidenav from "../../components/Sidenav";
// import ItemCreate from "../../components/ItemCreate";

const About = () => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setStates] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [image, setImage] = useState("");
  const [locations, setLocations] = useState([]);

  const history = useHistory();

  useEffect(() => {
    M.AutoInit();

    axios
      .get(`/api/locations`)
      .then((response) => {
        console.log(response);
        setLocations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFormSubmit = (event) => {
    let isnum = /^\d+$/.test(zipcode);
    console.log(isnum);
    event.preventDefault();
    !isnum
      ? M.toast({ html: "Please enter a VALID zip code!" })
      : !name
      ? M.toast({ html: "Please enter a location name" })
      : !city
      ? M.toast({ html: "Please enter a city" })
      : !state
      ? M.toast({ html: "Please enter a state" })
      : !street
      ? M.toast({ html: "Please enter a street " })
      : !image
      ? M.toast({
          html: "Please enter a link to the url of the image of your location",
        })
      : zipcode.length > 5 || zipcode.length < 5
      ? M.toast({ html: "Please enter a zip code that consists of 5 numbers " })
      : axios
          .post("/api/locations", {
            name,
            street,
            city,
            state,
            zipcode,
            image,
          })
          .then((response) => {
            console.log(response.data);

            setName("");
            setStreet("");
            setCity("");
            setStates("");
            setZipcode("");
            setImage("");
            // alert("Your location has been added");
            M.toast({ html: "Your location has been added successfully!" });
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleDeleteClick = (_id, name) => {
    console.log(name)
    axios
      .delete(`/api/locations/${_id}`)
      .then((response) => {
        console.log(response.data);
        M.toast({ html: `${name} has been removed! `})
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Sidenav />
      {/* <div>
        <div className="container">
          <div className="row">
            <div className="col s6">
              <img
                className="responsive-img"
                src="https://miro.medium.com/max/6522/1*cJPewfkUdrj4K2ywEbnJAQ.jpeg"
                alt="Man standing by uptown colorfully designed community fridge"
              />
            </div>
            <div className="col s6">
              <form className="col s12" onSubmit={handleFormSubmit}>
                <div className="input-field col s12  l12">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="validate"
                    placeholder="Fox Farm location"
                  />
                  <label className="active" htmlFor="name">
                    Location Name
                  </label>
                </div>
                <div className="input-field col s12 l12">
                  <input
                    id="street"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    type="text"
                    className="validate"
                    placeholder="1201 Surf Ave"
                  />
                  <label htmlFor="addedBy" className="active">
                    Street Address
                  </label>
                </div>

                <div className="input-field col s8">
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="validate"
                    placeholder="Brooklyn"
                  />

                  <label className="active" htmlFor="expiration">
                    City
                  </label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(event) => setStates(event.target.value)}
                    className="validate"
                    placeholder="New York"
                  />

                  <label className="active" htmlFor="expiration">
                    State
                  </label>
                </div>
                <div className="input-field col s10">
                  <input
                    id="zipcode"
                    type="text"
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                    className="validate"
                    placeholder="11224"
                  />

                  <label className="active" htmlFor="expiration">
                    Zipcode
                  </label>
                </div>
                <div className="input-field col s12 l12">
                  <input
                    id="image"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    type="text"
                    className="validate"
                    placeholder="https://picsum.photos/536/354"
                  />
                  <label htmlFor="addedBy" className="active">
                    Image Link
                  </label>
                </div>

                <button className="waves-effect waves-light btn">
                  Add Item
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        {locations.map(({ name, city, state, street, _id }) => (
          <div className="row">
            <ul className="collection">
              <li className="collection-item avatar">
                <i className=" material-icons circle red">location_on</i>
                <span className="title">
                  <strong>{name}</strong>
                </span>
                <p>
                  <strong>{street}</strong>
                  <br />
                  <strong>{city} </strong>
                  <br />
                  <strong>{state} </strong>
                  <br />
                  <strong>Edit Location</strong>
                  {/* 


                  Todo: add below route to edit route. For now the  route just goes to the page.

                     <Link to={`/api/locations/${_id}/edit`}>
                  
                  
                  */}

                  <Link to={`/api/locations/${_id}`}>
                    <a href="javascript:void(0);">
                      <i className="material-icons">edit</i>
                    </a>
                  </Link>
                </p>
                <a href="javascript:void(0);" className="secondary-content">
                  <i
                    className="material-icons"
                    onClick={() => {
                      handleDeleteClick(_id , name);
                    }}
                  >
                    delete
                  </i>
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
