import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
function GameBoard(){
    const testArrayString = "ABCDEFGHIJKLMNOP";
    const [gameArray, setGameArray] = useState([]);
    const [word, setWord] = useState({word: ""});


    //getLetters(testArrayString);
    useEffect(
        function(){
            //will need an axios call to get the string but then after it will do this
            const tempArray = testArrayString.split('');
            console.log(tempArray);
            
            setGameArray(tempArray);


        }, []);


    function handleChange(e){
        setWord({ ...word, [e.target.name]: e.target.value });
    }
        
    function handleSubmit(e){
        e.preventDefault();
        console.log(word);
       
       //will need the axios call to check if the word is ok
       /* axios
        .post("http://localhost:4000/checkword", word)
        .then((res)=>{
            
         })
        .catch((err) =>{
            console.log("Error, couldn't check the word entry");
            console.log(err.message);
        });
        */
        //here we will need to set the textbox to blank if the word is correct
        
        
    }
    
    return(
        
        <div className='center background'>
                <div>
                    <h1>Boggle</h1>

                </div>
                <div >
                   
                    <table className='center'>
                        <tbody>
                            <tr>
                                <td>{gameArray[0]}</td>
                                <td>{gameArray[1]}</td>
                                <td>{gameArray[2]}</td>
                                <td>{gameArray[3]}</td>
                            </tr>
                            <tr>
                                <td>{gameArray[4]}</td>
                                <td>{gameArray[5]}</td>
                                <td>{gameArray[6]}</td>
                                <td>{gameArray[7]}</td>
                                
                            </tr>
                            <tr>
                                <td>{gameArray[8]}</td>
                                <td>{gameArray[9]}</td>
                                <td>{gameArray[10]}</td>
                                <td>{gameArray[11]}</td>
                            </tr>
                            <tr>
                                <td>{gameArray[12]}</td>
                                <td>{gameArray[13]}</td>
                                <td>{gameArray[14]}</td>
                                <td>{gameArray[15]}</td>
                            </tr>
                        </tbody>
                     </table>

                    {/* {gameArray.map((letter, i) =>(<div key={i} className = "flex-table"><h1>{letter}</h1> </div>))} */}


                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                    
                        <label>Enter Word: </label>
                        <input type="text"
                        name="word" 
                        id = "word"
                        value={word.word}
                        onChange = {handleChange}/>
                        <br/>
                        
                        
                        <br/>
        
                        <button type="submit" className='button_rtlobby'>
                            Submit
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default GameBoard;