import axios from 'axios';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
export default function FormCidade() {

    const [nome, setNome] = useState();
    const [qtdPopulacao, setQtdPopulacao] = useState();
    const [ehCapital, setEhCapital] = useState(false);
    const [dataFundacao, setDataFundacao] = useState();


    const [listaEstado, setListaEstado] = useState([]);
    const [idEstado, setIdEstado] = useState();

    const { state } = useLocation()
    const [idCidade, setIdCidade] = useState();
    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cidade/" + state.id)
                .then((response) => {
                    setIdCidade(response.data.id)
                    setNome(response.data.nome)
                    setQtdPopulacao(response.data.qtdPopulacao)
                    setEhCapital(response.data.ehCapital)
                    setDataFundacao(formatarData(response.data.dataFundacao))
                    setIdEstado(response.data.estado?.id)
                })
        }
        axios.get("http://localhost:8080/api/estado")
            .then((response) => {
                const dropDownEstados = response.data.map(c => ({ text: c.nome, value: c.id }));
                setListaEstado(dropDownEstados);
            })

    }, [state])

    function salvar() {
        let cidadeRequest = {
            idEstado: idEstado,
            nome: nome,
            qtdPopulacao: qtdPopulacao,
            ehCapital: ehCapital,
            dataFundacao: dataFundacao

        }
        if (idCidade != null) {
            axios.put("http://localhost:8080/api/cidade/" + idCidade, cidadeRequest)
                .then((response) => { console.log("Cidade atualizada com sucesso") })
                .catch((error) => { console.log("Erro ao atualizar cidade", error.response ? error.response.value : error) })
        } else {
            axios.post("http://localhost:8080/api/cidade", cidadeRequest)
                .then((response) => { console.log("Cidade cadastrada com sucesso") })
                .catch((error) => { console.log("Erro ao cadastrar cidade", error.response ? error.response.value : error) })
        }



    }
     function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    return (
        <div>
            <MenuSistema tela={"cidade"} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>

                    {idCidade === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cidade&nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCidade != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cidade&nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />
                    <div style={{ marginTop: '4%' }}>

                        <Form >
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Nome'
                                    required
                                    placeholder='Informe o nome da cidade'
                                    value={nome}
                                    onChange={e => setNome(e.target.value)} />

                                <Form.Input
                                    fluid
                                    label='População'
                                    required
                                    placeholder='Informe o número de população dessa cidade'
                                    type='number'
                                    value={qtdPopulacao}
                                    onChange={(e,{value}) => setQtdPopulacao(value)}
                                />
                                <Form.Input fluid label='Data Fundação' required>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataFundacao}
                                        onChange={e => setDataFundacao(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>
                            <Form.Select
                                required
                                fluid
                                tabIndex='3'
                                placeholder='Selecione'
                                label='Estados'
                                options={listaEstado}
                                value={idEstado}
                                onChange={(e, { value }) => {
                                    setIdEstado(value)
                                }}
                            />
                            <Form.Group>
                                <label style={{ fontWeight: 'bold' }}>Capital do Estado:</label>
                                <Form.Radio
                                    label="Sim"
                                    value={true}
                                    checked={ehCapital === true}
                                    onChange={(e, { value }) => setEhCapital(value)}
                                />
                                <Form.Radio
                                    label="Não"
                                    value={false}
                                    checked={ehCapital === false}
                                    onChange={(e, { value }) => setEhCapital(value)}
                                />
                            </Form.Group>



                        </Form>
                        <div style={{ marginTop: '4%' }}>
                            <Link to='/list-cidade'>
                                <Button
                                    type='button'
                                    inverted
                                    icon
                                    circular
                                    labelPosition='left'
                                    color='orange'

                                >
                                    <Icon name='reply' />
                                    Listar

                                </Button>
                            </Link>
                            <Button
                                type='button'
                                inverted
                                color='blue'
                                icon
                                circular
                                labelPosition='left'
                                floated='right'
                                onClick={() => salvar()}>
                                <Icon
                                    name='save'
                                />
                                Salvar

                            </Button>
                        </div>

                    </div>

                </Container>
            </div>
        </div>
    )
}