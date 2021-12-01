import './App.css';
import axios from 'axios'
import React,{useState, useEffect} from 'react';
import Coin from './Coin';

  function App() {
    const[coins,setCoins] = useState ([]);
    const[search,setSearch] = useState('');
    
      useEffect(() => {
        axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=true')
        .then(res => {
         setCoins(res.data);
         console.log(res.data);   
         }).catch(error=>console.log(error));
      },[]);

const handleChange = e => {
setSearch(e.target.value);
};


const filteredCoins = coins.filter(coin =>
 coin.name.toUpperCase().includes(search.toUpperCase())
 );

  return (
    <div className='coin-app'>
      <div className = 'coin-search'>
        <h1 className='coin-bit'>My Bit</h1>        
        <h2 className='coin-eu'> Pedro Silva | 3AGPSI | Redes</h2>
     
        <form>
          <input 
           className = 'coin-input'
           type='text'
           placeholder='Procurar'           
           onChange={handleChange} 
           />
        </form>
      </div>
{filteredCoins.map(coin => {
return(
  <Coin 
  key={coin.id}
  name={coin.name}
  price={coin.current_price}
  symbol={coin.symbol}
  marketcap={coin.total_volume}
  volume={coin.market_cap}
  image={coin.image}
  priceChange={coin.price_change_percentage_24h}
  />
  );

})}
    </div>
  );
}

export default App;
