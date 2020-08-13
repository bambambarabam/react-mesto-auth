import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [user, initialCards] = values;
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар." />
                    <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <div className="profile__name">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit" onClick={onEditProfile} aria-label="Редактировать" type="button"></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__button" onClick={onAddPlace} aria-label="Добавить" type="button">+</button>
            </section>

            <section className="elements">
                {cards.map((item) => (
                    <Card
                        key={item._id}
                        card={item}
                        onCardClick={onCardClick}
                     />
                ))}
            </section>
        </main>
    )
}

export default Main;
