import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import logoMultisearch from './logo_multisearch.png';
import data from './data.json';

function App() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(inputValue) {
    setInput(inputValue);
    if (inputValue === '') {
      setSearchResults([]);
      return;
    }

    try {
      const filteredResults = data.filter(item => {
        for (const key in item) {
          if (typeof item[key] === 'string' && item[key].toLowerCase().includes(inputValue.toLowerCase())) {
            return true;
          }
        }
        return false;
      });

      setSearchResults(filteredResults);
    } catch(error) {
      alert('Erro ao buscar dados...');
    }
  }

  return (
    <div className="container">
      <img src={logoMultisearch} alt="Logo MultiSearch" />

      <div className="containerInput">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={input}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <button className="buttonSearch" onClick={() => handleSearch(input)}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      <div className="resultContainer">
        <div className="resultList">
          {searchResults.length === 0 && input !== '' ? (
            <div className="category">
              <h3>Nenhum resultado encontrado</h3>
            </div>
          ) : (
            <>
              {searchResults.length > 0 && (
                <>
                  <div className='resultVenda'>
                    <h1>Pedidos de Venda</h1>
                    <p>({searchResults.filter(item => item.SalesOrderID && item.MaterialName).length} resultados encontrados)</p>
                    {searchResults
                      .filter(item => item.SalesOrderID && item.MaterialName)
                      .map((item, index) => (
                        <div key={index} className="category">
                          <h2>{item.MaterialName}</h2>
                          <span>#{item.MaterialID}</span>
                          <span style={{ marginLeft: '125px' }}>Qtd. {item.Quantity}</span>
                        </div>
                      ))}
                  </div>

                  <br/><br/>
                  <div className='resultCompra'>
                    <h1>Pedidos de Compra</h1>
                    <p>({searchResults.filter(item => item.PurchaseOrderID && item.MaterialName).length} resultados encontrados)</p>
                    {searchResults
                      .filter(item => item.PurchaseOrderID && item.MaterialName)
                      .map((item, index) => (
                        <div key={index} className="category">
                          <h2>{item.MaterialName}</h2>
                          <span>#{item.MaterialID} </span>
                          <span style={{ marginLeft: '165px' }}>Qtd. {item.Quantity}</span>
                        </div>
                      ))}
                  </div>

                  <br></br><br></br>
                  <div className='resultProdutos'>
                    <h1>Produtos</h1>
                    <p>({searchResults.filter(item => item.MaterialID && item.MaterialName).length} resultados encontrados)</p>
                    {searchResults
                      .filter(item => item.MaterialID && item.MaterialName)
                      .map((item, index) => (
                        <div key={index} className="category">
                          <h2>{item.MaterialName}</h2>
                          <span>#{item.MaterialID}</span>
                        </div>
                      ))}
                  </div>

                  <br></br><br></br>
                  <div className='resultEquipamentos'>
                    <h1>Equipamentos</h1>
                    <p>({searchResults.filter(item => item.EquipmentID && item.EquipmentName).length} resultados encontrados)</p>
                    {searchResults
                      .filter(item => item.EquipmentID && item.EquipmentName)
                      .map((item, index) => (
                        <div key={index} className="category">
                          <h2>{item.EquipmentName}</h2>
                          <span>#{item.EquipmentID}</span>
                        </div>
                      ))}
                  </div>

                  <br></br><br></br>
                  <div className='resultMaoDeObra'>
                    <h1>Mão de Obra</h1>
                    <p>({searchResults.filter(item => item.WorkforceID && item.Name).length} resultados encontrados)</p>
                    {searchResults
                      .filter(item => item.WorkforceID && item.Name && item.Shift)
                      .map((item, index) => (
                        <div key={index} className="category">
                          <h2>{item.Name}</h2>
                          <span>#{item.WorkforceID}</span>
                          <span style={{ marginLeft: '50px' }}>{item.Shift}</span>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
