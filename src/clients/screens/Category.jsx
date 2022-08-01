import React from 'react';
import CategoryCSS from '../css/Category.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

//COMPONENT IMPORTS
import Header from '../components/Header';
import Bcard from '../components/BigCard';

function Category(){
    const [drinksArr, setDrinksArr] = React.useState([]);
    const [appetizerArr, setAppetizerArr] = React.useState([]);
    const [pizzaArr, setPizzaArr] = React.useState([]);
    const [pastaArr, setPastaArr] = React.useState([]);
    const [chickenArr, setChickenArr] = React.useState([]);

    const getMenu = () =>{
        axios.get("https://ordering-system-database.herokuapp.com/api/drinks/get")
            .then((response) => {
               setDrinksArr(response.data)
        });
        axios.get("https://ordering-system-database.herokuapp.com/api/pasta/get")
            .then((response) => {
               setPastaArr(response.data)
        });
        axios.get("https://ordering-system-database.herokuapp.com/api/appetizer/get")
            .then((response) => {
               setAppetizerArr(response.data)
        });
        axios.get("https://ordering-system-database.herokuapp.com/api/equipments/get")
            .then((response) => {
               setPizzaArr(response.data)
        });
        axios.get("https://ordering-system-database.herokuapp.com/api/chicken/get")
            .then((response) => {
               setChickenArr(response.data)
        });
    }
    
    React.useEffect(() => {
        getMenu();
    }, []);

    return(
    <div className = {CategoryCSS.container}>
        <Header/>
        <div className={CategoryCSS.top}>
            <h1>EQUIPMENT LIST</h1>
        </div>
        <div className={CategoryCSS.pizzaContainer}>
            <div className={CategoryCSS.pizzaTop}>
                
            </div>
            <div className={CategoryCSS.bigcardContainer}>
            {
                        pizzaArr.map((item, index) =>{
                        return(
                            <Bcard
                                key={item.id}
                                food={item.menuName}
                                price={item.quantity}
                                folder={item.folder}
                            />
                        )})
                    }
            </div>
        </div>
    </div>
    );
}

export default Category;