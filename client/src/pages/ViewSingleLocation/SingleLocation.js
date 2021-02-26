import React from 'react';
import Item from "../../components/Item/Item";

const SingleLocation = () => {
    const items =
        [
            {
                name: "Peanut Butter",
                category: "Pantry",
                addedBy: "1/1/2021",
                date: "11/13/2020",
                expiration: "02/01/2022"
            },
            {
                name: "Whole Milk",
                category: "Fridge",
                addedBy: "11/15/2020",
                date: "11/13/2020",
                expiration: "11/20/2020"
            }
        ]
    let locations =
    {
        name: "Bed-stuy Fridge",
        street: "160 Quincy",
        city: "Brooklyn",
        state: "New York",
        zipcode: "11216",
        items: []

    }



    return (
        <div className="container">

            <div className="row">
                <div className="col s12">
                    <h4 className="center-align">{locations.name}</h4>
                </div>
                <div className="col s12">

                    <p className="center-align">Located in: {`${locations.street}, ${locations.city}, ${locations.state}, ${locations.zipcode}`}</p>
                </div>

            </div>
            <div className="row">
                <div className="col s12">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>category</th>
                                <th>addedBy</th>
                                <th>date</th>
                                <th>expiration</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map(item => (
                                <Item item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
export default SingleLocation;