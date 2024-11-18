import React, { Component } from 'react';
import axios from 'axios';
import './PersonList.css'; // Import the CSS file for styling

class PersonList extends Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(err => console.error("Error fetching data:", err));
    }

    render() {
        return (
            <div className="user-list-container">
                <h1 className="header">User List</h1>
                {this.state.persons.map((person, index) => (
                    <section className="user-section" key={index}>
                        {/* Parent container for the header and profile */}
                        <div className="section-header-container">
                            <div className="section-header">
                                {/* Section Header */}
                                {person.gender === 'female' ? (person.name.title === 'Mrs' ? 'Mrs.' : 'Miss') : 'Mr.'} {person.name.first} {person.name.last} - {person.login.uuid}
                            </div>
                            <hr className="separator-line" />
                            {/* Profile container (flex column for this section) */}
                            <div className="profile-container">
                                <img
                                    className="profile-pic"
                                    src={person.picture.large}
                                    alt={`${person.name.first} ${person.name.last}`}
                                />
                                <button className="detail-button">Detail</button>
                            </div>
                        </div>
                        {/* User details container (flex row for this section) */}
                        <div className="user-details">
                            <p><strong>Username:</strong> {person.login.username}</p>
                            <p><strong>Gender:</strong> {person.gender}</p>
                            <p><strong>Time Zone:</strong> {person.location.timezone.description}</p>
                            <p><strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country}`}</p>
                            <p><strong>Email:</strong> {person.email}</p>
                            <p><strong>Birth Date:</strong> {new Date(person.dob.date).toLocaleDateString()} (Age: {person.dob.age})</p>
                            <p><strong>Register Date:</strong> {new Date(person.registered.date).toLocaleDateString()}</p>
                            <p><strong>Phone:</strong> {person.phone}</p>
                            <p><strong>Cell:</strong> {person.cell}</p>
                        </div>
                    </section>
                ))}
            </div>
        );
    }
}

export default PersonList;
