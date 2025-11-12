import React from 'react';
import NavBar from '../components/NavBar';
import {getTMDBMovieByID} from "../api-logic/moviesAPI.jsx";
import AddMovieForm from '../components/AddMovie/AddMovieForm.jsx';
import SearchMovieForm from "../components/AddMovie/SearchMovieForm.jsx";


function AddMovie() {

    const [movieData, setMovieData] = React.useState([]);


    async function handleGetMovieByID (movieId) {

        if(movieId === ''){
            setMovieData('');
            return;
        }
        try{
            const response = await getTMDBMovieByID(movieId);

            setMovieData(response);
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <NavBar showLinks={true}/>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}>
                <SearchMovieForm getMovieByID={handleGetMovieByID}/>
                <div style={{
                    flex: '1',
                }}>
                    <AddMovieForm movieData={movieData}/>
                </div>
            </div>


        </div>
    );
}

export default AddMovie;