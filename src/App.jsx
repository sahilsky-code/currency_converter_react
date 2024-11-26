import { useState } from 'react'
import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const CurrencyInfo = useCurrencyInfo(from)

  const options = CurrencyInfo ? Object.keys(CurrencyInfo) : []

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const convert = () => {
    if (CurrencyInfo && CurrencyInfo[to]) {
      setConvertedAmount(amount * CurrencyInfo[to])
    } else {
      setConvertedAmount(0)
    }
  }

  return (
    options.length > 0 && (
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-vector/money-transfer-global-currency-stock-exchange-background_115579-579.jpg)`,
          
        }}>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
              <div className="w-full mb-1">
                <InputBox
                  label='From'
                  amount={amount}
                  currencyOption={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5 ">
                <button
                  type="button"
                  className="absolute left-1/3 translate-x-1/2 translate-y-1/8  border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}>
                  SWAP
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox 
                  label='To'
                  amount={convertedAmount}
                  currencyOption={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default App
