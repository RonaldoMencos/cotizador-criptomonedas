import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border:none;
    width:100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: backgrund-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({ setmonedas }) => {

    const [criptos, setcriptos] = useState([])
    const [error, seterror] = useState(false)

    const monedas = [
        { id: 'USD', nombre: 'Dolar de Estados Unidos' },
        { id: 'MXN', nombre: 'Peso Mexicano' },
        { id: 'EUR', nombre: 'Euro' },
        { id: 'GBP', nombre: 'Libra Esterlina' }
    ]

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setcriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])


    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu criptomoneda', criptos)

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            seterror(true)
            return
        }

        seterror(false)
        setmonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios.</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomonedas />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario