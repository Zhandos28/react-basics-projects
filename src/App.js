import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0.0);
  const [toPrice, setToPrice] = React.useState(1.0);

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeToPrice(1.0);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const result = (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(result);
  };

  const onChangeToPrice = (value) => {
    const result = (value / ratesRef.current[toCurrency]) * ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(result);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  //https://cdn.cur.su/api/latest.json
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
