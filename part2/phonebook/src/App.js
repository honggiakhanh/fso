import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import service from "./services/service";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [successfulNoti, setSuccessfulNoti] = useState(true);
  //get all
  useEffect(() => {
    service.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);
  //add
  const addPerson = (event) => {
    event.preventDefault();
    //check existing name
    if (persons.some((person) => newName === person.name)) {
      const replace = window.confirm(
        `${newName} is already added, replace the number instead?`
      );
      if (replace) {
        //find the person that needs replace, then change number
        const replacePerson = persons.find((person) => person.name === newName);
        const updatedNumber = { ...replacePerson, number: newNumber };
        service
          .update(replacePerson.id, updatedNumber)
          .then((person) => {
            setPersons(
              persons.map((p) =>
                p.id === replacePerson.id ? updatedNumber : p
              )
            );
            setSuccessfulNoti(true);
            setMessage(`${updatedNumber.name}'s number updated`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setSuccessfulNoti(false);
            setMessage(error.response.data.error);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
      return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      service
        .create(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          setSuccessfulNoti(true);

          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setSuccessfulNoti(false);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };
  //delete
  const deletePerson = (person) => {
    const confirm = window.confirm("Are you sure to delete this person?");
    if (confirm) {
      service.del(person.id);
      setPersons(persons.filter((n) => n.id !== person.id));
      setSuccessfulNoti(true);
      setMessage(`${person.name} deleted`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  //input handling
  const onNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  const onNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };
  const onSearchChange = (event) => {
    event.preventDefault();
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} state={successfulNoti} />
      <Filter onChange={onSearchChange} value={newSearch} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        onNameChange={onNameChange}
        newName={newName}
        onNumberChange={onNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      {persons.map((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase()) ? (
          <Person
            key={person.name}
            person={person}
            deletePerson={deletePerson}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default App;
